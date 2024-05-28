import React from 'react';

const ResponseMessage = ({ message }) => {
  return (
    <div className={`flex flex-col p-6 bg-gray-200 rounded-lg`}>
      <div className="flex flex-row ">
        <span className="text-black">Answer: {message}</span>
      </div>
    </div>
  );
};

export default ResponseMessage;
