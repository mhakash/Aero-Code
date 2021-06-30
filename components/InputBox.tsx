import React from 'react';
import { useForm } from 'react-hook-form';
import sendImage from '../public/images/send-button.svg';
import Image from 'next/image';

const problemOptions = ['bug', 'memory leak', 'unsafe'];
const severityOptions = ['low', 'high'];
const colorOptions = ['red', 'green', 'blue'];

const InputBox = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="my-4 border-gray-700 border-2 rounded-xl overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="bg-gray-200 text-gray-800 border-gray-700 border-b-2 py-2 px-4 flex justify-between">
          <div className="border-gray-700 border-r-2 flex-1 flex justify-center">
            <label htmlFor="type">Problem Type: </label>
            <select
              {...register('type')}
              className="ml-2 rounded px-2 bg-gray-700 text-gray-50"
            >
              <option value="">select</option>
              {problemOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="border-gray-700 border-r-2 flex-1  flex justify-center">
            <label htmlFor="type">Severity: </label>
            <select
              {...register('severity')}
              className="ml-2 rounded px-2 bg-gray-700 text-gray-50"
            >
              <option value="">select</option>
              {severityOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1  flex justify-center">
            <label htmlFor="type">Color: </label>
            <select
              {...register('color')}
              className="ml-2 rounded px-2 bg-gray-700 text-gray-50"
            >
              <option value="">select</option>
              {colorOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          {...register('text')}
          placeholder="Problem details..."
          className="p-4 bg-gray-200 outline-none"
        />

        <div className="flex bg-gray-700 px-4 py-1">
          <div className="flex-1"></div>
          <button type="submit" className="">
            <div className="mt-1">
              <Image src={sendImage} alt="send button" className="" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
