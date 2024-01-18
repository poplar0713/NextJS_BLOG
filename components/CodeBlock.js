import SyntaxHighlighter from 'react-syntax-highlighter'
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const CopyButton = ({ target }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target)
        alert('클립보드에 복사됨')
      } catch (e) {
        alert('오류 발생 : ' + e)
      }
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-0.5 bg-white rounded-lg font-semibold px-2 m-1 text-gray-600"
    >
      copy
    </button>
  )
}

export default function CodeBlock({ children }) {
  return (
    <div className="relative">
      <CopyButton target={children} />
      <SyntaxHighlighter showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
