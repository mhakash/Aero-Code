import React from 'react';
import {
  CheckIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';

export const Alert: React.FC<{
  style: any;
  options: any;
  message: any;
}> = ({ style, options, message }) => (
  <div
    style={{ ...style }}
    className=" bg-green-700 p-3 text-gray-50 rounded-md flex flex-wrap border-2"
  >
    <span className="mr-2 ">
      {options.type === 'info' && <InformationCircleIcon className="w-5 h-6" />}
      {options.type === 'success' && <CheckIcon className="w-5 h-6" />}
      {options.type === 'error' && <ExclamationIcon className="w-5 h-6" />}
    </span>
    {message}
  </div>
);
