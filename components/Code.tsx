import { useCallback, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';
import InputBox from '../components/InputBox';
import { useModal } from '../components/Modal';

interface CodeProps {
  code: string;
  ext?: string;
  setSelectedLine?: any;
  linesToHighLight: number[];
  setLinesToHighLight: any;
}

const Code: React.FC<CodeProps> = ({
  ext,
  code = 'txt',
  setSelectedLine,
  linesToHighLight,
  setLinesToHighLight,
}) => {
  const handleLineClicked = useCallback(
    (i: number) => {
      console.log('line number clicked: ', i);
      // setLineToHighLight((p) => {
      //   if (p.includes(i)) return p.filter((e) => e !== i);
      //   else return [...p, i];
      // });

      setSelectedLine(i);
    },
    [setSelectedLine],
  );

  useEffect(() => {
    var spans = document.getElementsByTagName('span');
    var spanArray = Array.from(spans);

    const spanRows = spanArray.filter((ele) => ele.classList.contains('linenumber'));

    spanRows.forEach((spanRow, index) => {
      spanRow.onclick = () => {
        handleLineClicked(index + 1);
      };
    });
  }, [handleLineClicked]);

  return (
    <div className="">
      <SyntaxHighlighter
        style={theme}
        language={ext}
        showLineNumbers={true}
        useInlineStyles={true}
        lineNumberStyle={(line: number) => {
          let style: any = { cursor: 'pointer' };
          if (linesToHighLight.indexOf(line) !== -1) {
            style.backgroundColor = '#1F618D ';
          }

          return style;
        }}
        className="no-scrollbar"
      >
        {code}
      </SyntaxHighlighter>
      <style jsx global>{`
        .linenumber {
          margin-right: 6px;
          border-radius: 5px;
          padding-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default Code;
