import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/cb';
import InputBox from '../components/InputBox';
import { useModal } from '../components/Modal';

const Code: React.FC<{ code: string; ext?: string }> = ({ ext, code = 'txt' }) => {
  const [lineToHighLight, setLineToHighLight] = useState<number[]>([]);
  const [CodeInputModal, setCodeInputModalVisibility] = useModal();

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

  useEffect(() => {
    if (lineToHighLight.length > 0) setCodeInputModalVisibility(true);
  }, [setCodeInputModalVisibility, lineToHighLight.length]);

  return (
    <div className="flex">
      <div className=" max-w-screen-md">
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
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <CodeInputModal>
        <div className="">
          <InputBox />
        </div>
      </CodeInputModal>
      {/* {lineToHighLight.length > 0 && (
        <div className="w-full max-w-xl">
          <InputBox />
        </div>
      )} */}
    </div>
  );
};

export default Code;
