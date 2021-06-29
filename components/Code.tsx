import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

const Code: React.FC<{ code: string; ext?: string }> = ({ ext, code = 'txt' }) => {
  return (
    <div>
      <SyntaxHighlighter style={theme} language={ext} showLineNumbers={true}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
