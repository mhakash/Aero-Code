import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import InputBox from '../components/InputBox';

const Code: React.FC<{ code: string; ext?: string }> = ({ ext, code = 'txt' }) => {
  const [lineToHighLight, setLineToHighLight] = useState<number[]>([]);

  const handleLineClicked = (i: number) => {
    console.log('line number clicke: ', i);
    setLineToHighLight((p) => {
      if (p.includes(i)) return p.filter((e) => e !== i);
      else return [...p, i];
    });
  };

  useEffect(() => {
    var spans = document.getElementsByTagName('span');
    var spanArray = Array.from(spans);

    const spanRows = spanArray.filter((ele) => ele.classList.contains('linenumber'));

    spanRows.forEach((spanRow, index) => {
      spanRow.onclick = () => {
        handleLineClicked(index + 1);
      };
    });
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 mr-2">
        <SyntaxHighlighter
          style={theme}
          language={ext}
          showLineNumbers={true}
          useInlineStyles={true}
          lineNumberStyle={(line: number) => {
            let style = { cursor: 'pointer' };
            if (lineToHighLight.indexOf(line) !== -1)
              style.backgroundColor = 'rgb(165, 17, 66)';

            return style;
          }}

          // lineProps={(lineNumber: NumberAttributeValue) => ({
          //   style: { display: 'block', cursor: 'pointer' },
          //   onClick() {
          //     // alert(`Line Number Clicked: ${lineNumber}`)
          //     console.log('hello');
          //   },
          // })}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {lineToHighLight.length > 0 && (
        <div className="w-full max-w-xl">
          <InputBox />
        </div>
      )}
    </div>
  );
};

export default Code;
