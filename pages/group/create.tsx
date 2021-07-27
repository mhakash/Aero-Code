import Layout from 'components/Layout';
import React, { ChangeEvent, useState } from 'react';
import { createNewGroup } from 'lib/api';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from 'lib/hooks/useAuth';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline';

const CreateGroupPage: React.FC = () => {
  const auth = useAuth();
  const alert = useAlert();
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [reviewers, setReviewers] = useState<
    { _id: string; name: string; role: number }[]
  >([]);
  const [groupname, setGroupName] = useState('');

  const CreateGroup = async () => {
    const data = await createNewGroup(groupname, reviewers);
    router.push('/group');
  };

  return (
    <Layout header={<>Add New Group</>} side={<>
      <div className="m-2">
          <div className="my-4">Add Members</div>
          {auth.user?.friends?.map((e) => (
            <div key={e._id} className="my-2">
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  reviewers.find((x) => x._id === e._id)
                    ? setReviewers(reviewers.filter((x) => x._id !== e._id))
                    : setReviewers([...reviewers, { _id: e._id, name: e.name, role: 0 }]);
                }}
              >
                {reviewers.find((x) => x._id === e._id) ? (
                  <MinusCircleIcon className="w-5 h-5 mr-2" />
                ) : (
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                )}
                <div className="font-semibold text-sm text-gray-700">{e.name}</div>
              </div>
            </div>
          ))}
        </div>
    </>}>
      <div className="min-h-full flex flex-row">
        <div className="flex flex-col justify-center m-auto">
          <label htmlFor="file-upload" className="flex mb-4">
            <input
              type="text"
              value={groupname}
              onChange={(e) => setGroupName(e.target.value)}
              className="py-2 px-4 m-2 rounded-3xl w-full max-w-3xl border-gray-500 border-2 outline-none"
            />
          </label>

          <button
            className="m-2 mx-auto border-2 bg-gray-700 text-gray-50 py-2 px-4 rounded-lg text-sm"
            onClick={CreateGroup}
          >
            Create Group
          </button>
        </div>

        
      </div>
    </Layout>
  );
};

export default CreateGroupPage;
