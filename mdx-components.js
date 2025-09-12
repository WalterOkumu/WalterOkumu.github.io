import MDXComponents from './src/components/blog/MDXComponents'

export function useMDXComponents(components) {
  return {
    ...MDXComponents,
    ...components,
  }
}