import Layout from 'components/Layout';
import { addReview, getCodeDataById, getDiscussionByID, getPostByCodeId } from 'lib/api';
import Code from '../../components/Code';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';
import InputBox from '../../components/InputBox';
import CircularLoading from 'components/CircularLoading';
import { useModal } from 'components/Modal';
import Discussion from 'components/Discussion';
import Link from 'next/link';

const DiscussionByID: React.FC<{ id: string; line: number; setLines: any }> = ({
  id,
  line,
  setLines,
}) => {
  const auth = useAuth();

  const { data } = useSWR(
    () => (id && auth.user ? `/discussion/${id}` : null),
    () => getDiscussionByID(id),
  );

  useEffect(() => {
    if (data?.review_content?.line) {
      setLines((p: number[]) => {
        if (p.includes(data?.review_content?.line ?? -1)) return p;
        else return [...p, data?.review_content?.line];
      });
    }
  }, [data, setLines]);

  if (!data) return <CircularLoading />;
  if (line > 0 && line !== data.review_content?.line) return null;

  return (
    <Link href={`/discussion/${id}`}>
      <a>
        <Discussion post={data} hasLink={true} />
      </a>
    </Link>
  );
};

const Home: FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const { pid } = router.query;

  const [lineSelected, setLineSelected] = useState<number | null>(null);
  const [linesToHighLight, setLinesToHighLight] = useState<number[]>([]);

  const [Modal, setModal] = useModal();

  const { data } = useSWR(
    () => (pid && auth.user ? `/codes/${pid}` : null),
    () => getCodeDataById(pid as string),
  );

  const { data: code } = useSWR(
    () => (pid && auth.user ? `/codes/${pid}/data` : null),
    () => getPostByCodeId(pid as string),
  );

  const onSubmit = async (data: { severity: string; text: string; type: string }) => {
    await addReview(
      pid as string,
      data.type,
      data.severity,
      data.text,
      lineSelected ?? 0,
    );
    setModal(false);

    mutate(`/codes/${pid}/data`);
  };

  return (
    <Layout
      header={
        <>
          <div>{data?.name}</div>
        </>
      }
      side={
        <>
          <div className="flex w-full justify-end">
            <button
              className="bg-gray-500 text-gray-50 text-sm px-4 py-2 rounded-xl my-2"
              onClick={() => setModal(true)}
            >
              Add Review
            </button>
          </div>

          {lineSelected && (
            <div className="text-gray-700  border-b border-gray-400 pb-1 mb-4">
              Reviews: Line {lineSelected}
            </div>
          )}

          {code ? (
            <div>
              {code.replies?.map((e) => (
                <div key={e}>
                  <DiscussionByID
                    id={e}
                    line={lineSelected ?? 0}
                    setLines={setLinesToHighLight}
                  />
                </div>
              ))}
            </div>
          ) : (
            <CircularLoading />
          )}
        </>
      }
    >
      {data?.data ? (
        <div className="min-h-full">
          <Code
            linesToHighLight={linesToHighLight}
            setLinesToHighLight={setLinesToHighLight}
            setSelectedLine={setLineSelected}
            code={
              typeof data.data === 'object'
                ? JSON.stringify(data.data, null, 2)
                : data?.data
            }
            ext={data.ext}
          />
        </div>
      ) : (
        <CircularLoading />
      )}

      <Modal>
        <div className="" style={{ width: '600px' }}>
          <InputBox onSubmit={onSubmit} />
        </div>
      </Modal>
    </Layout>
  );
};

export default Home;
