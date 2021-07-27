import { useCallback, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';
import InputBox from '../components/InputBox';
import { useModal } from '../components/Modal';

interface CodeProps {
  code: string;
  ext?: string;
  setSelectedLine?: any;
}

const Code: React.FC<CodeProps> = ({ ext, code = 'txt', setSelectedLine }) => {
  const [lineToHighLight, setLineToHighLight] = useState<number[]>([]);
  const [CodeInputModal, setCodeInputModalVisibility] = useModal();

  const handleLineClicked = useCallback(
    (i: number) => {
      console.log('line number clicke: ', i);
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

  useEffect(() => {
    if (lineToHighLight.length > 0) setCodeInputModalVisibility(true);
  }, [setCodeInputModalVisibility, lineToHighLight.length]);

  return (
    <div className="">
      <SyntaxHighlighter
        style={theme}
        language={ext}
        showLineNumbers={true}
        useInlineStyles={true}
        lineNumberStyle={(line: number) => {
          let style: any = { cursor: 'pointer' };
          if (lineToHighLight.indexOf(line) !== -1) {
            style.backgroundColor = 'blue';
          }

          return style;
        }}
        className="no-scrollbar"
      >
        {code}
      </SyntaxHighlighter>
      {/*       
      <CodeInputModal>
        <div className="" style={{ width: '600px' }}>
          <InputBox />
        </div>
      </CodeInputModal> */}
      {/* {lineToHighLight.length > 0 && (
        <div className="w-full max-w-xl">
          <InputBox />
        </div>
      )} */}
    </div>
  );
};

export default Code;
