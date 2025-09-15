#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function parseArgs(argv) {
  const args = { idle: 20 * 60 * 1000, max: 60 * 60 * 1000, cwd: process.cwd(), cmd: [], shell: false };
  const parts = [...argv];
  let i = 0;
  while (i < parts.length) {
    const a = parts[i];
    if (a === '--') { args.cmd = parts.slice(i + 1); break; }
    if (a === '--idle') { args.idle = Number(parts[i + 1]); i += 2; continue; }
    if (a === '--max') { args.max = Number(parts[i + 1]); i += 2; continue; }
    if (a === '--cwd') { args.cwd = parts[i + 1]; i += 2; continue; }
    if (a === '--shell') { args.shell = true; i += 1; continue; }
    // Unknown flag or direct command start
    if (!a.startsWith('--') && args.cmd.length === 0) { args.cmd = parts.slice(i); break; }
    i += 1;
  }
  if (args.cmd.length === 0) throw new Error('No command provided. Usage: node scripts/kill-on-idle.mjs --idle 1200000 -- <cmd> [args]');
  return args;
}

function now() { return new Date().toISOString(); }

function killTree(pid) {
  return new Promise((resolve) => {
    if (process.platform === 'win32') {
      const k = spawn('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore' });
      k.on('close', () => resolve());
      k.on('error', () => resolve());
    } else {
      try { process.kill(-pid, 'SIGKILL'); } catch {}
      try { process.kill(pid, 'SIGKILL'); } catch {}
      resolve();
    }
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [command, ...cmdArgs] = args.cmd;

  mkdirSync('logs', { recursive: true });
  const logPath = join('logs', `watchdog-${Date.now()}.log`);
  const writeLog = (msg) => writeFileSync(logPath, `[${now()}] ${msg}\n`, { flag: 'a' });

  writeLog(`Spawning: ${[command, ...cmdArgs].join(' ')} (idle=${args.idle}ms, max=${args.max}ms) in ${args.cwd}`);
  const child = spawn(command, cmdArgs, { cwd: args.cwd, shell: args.shell, detached: process.platform !== 'win32' });

  let lastActivity = Date.now();
  const onData = (chunk) => {
    lastActivity = Date.now();
    process.stdout.write(chunk);
  };
  const onErr = (chunk) => {
    lastActivity = Date.now();
    process.stderr.write(chunk);
  };
  child.stdout?.on('data', onData);
  child.stderr?.on('data', onErr);

  const idleTimer = setInterval(async () => {
    const idleFor = Date.now() - lastActivity;
    if (idleFor >= args.idle) {
      const reason = `No output for ${idleFor}ms (idle limit ${args.idle}ms). Terminating.`;
      writeLog(reason);
      console.error(`\n[watchdog] ${reason}`);
      await killTree(child.pid);
      clearInterval(idleTimer);
      clearTimeout(maxTimer);
      process.exit(124);
    }
  }, Math.min(30_000, args.idle));

  const maxTimer = setTimeout(async () => {
    const reason = `Max runtime ${args.max}ms exceeded. Terminating.`;
    writeLog(reason);
    console.error(`\n[watchdog] ${reason}`);
    await killTree(child.pid);
    clearInterval(idleTimer);
    process.exit(137);
  }, args.max);

  child.on('exit', (code, signal) => {
    clearInterval(idleTimer);
    clearTimeout(maxTimer);
    writeLog(`Process exited code=${code} signal=${signal}`);
    process.exit(code ?? 0);
  });

  child.on('error', async (err) => {
    writeLog(`Spawn error: ${err?.message}`);
    await killTree(child.pid);
    clearInterval(idleTimer);
    clearTimeout(maxTimer);
    process.exit(1);
  });
}

main().catch((e) => { console.error('[watchdog] Error:', e); process.exit(1); });

