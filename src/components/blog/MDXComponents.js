import Link from 'next/link'
import Image from 'next/image'

// Custom components for MDX
const MDXComponents = {
  // Override default elements
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-semibold text-gray-900 mb-5 mt-8 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-6 leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-5 leading-tight" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-gray-700 mb-4 leading-relaxed text-lg" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    const Component = isExternal ? 'a' : Link
    
    return (
      <Component
        href={href}
        className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {children}
      </Component>
    )
  },
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-6 py-4 my-6 italic text-gray-800" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className
    
    if (isInline) {
      return (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      )
    }
    
    return (
      <code className={`${className} block`} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 text-sm" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    <div className="my-8">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg shadow-lg"
        {...props}
      />
    </div>
  ),
  hr: (props) => (
    <hr className="border-gray-300 my-8" {...props} />
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props}>
      {children}
    </td>
  ),
  
  // Custom components
  Callout: ({ type = 'info', title, children }) => {
    const styles = {
      info: 'border-blue-200 bg-blue-50 text-blue-800',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      error: 'border-red-200 bg-red-50 text-red-800',
      success: 'border-green-200 bg-green-50 text-green-800',
    }
    
    const icons = {
      info: '💡',
      warning: '⚠️',
      error: '❌',
      success: '✅',
    }
    
    return (
      <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
        {title && (
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>{icons[type]}</span>
            {title}
          </h4>
        )}
        <div>{children}</div>
      </div>
    )
  },
  
  CodeBlock: ({ title, language, children }) => (
    <div className="my-6">
      {title && (
        <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono rounded-t-lg">
          {title}
        </div>
      )}
      <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${title ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code className={language ? `language-${language}` : ''}>{children}</code>
      </pre>
    </div>
  ),
}

export default MDXComponents