import React from 'react';

const Slogan = () => {
  return (
    <div className='flex flex-col h-20 w-full items-center justify-between font-bold mb-24'>
      <div className='up forprim w-[80%] items-center justify-center md:gap-4 gap-2 flex md:text-5xl text-3xl mx-auto'>
        <span className='forsec'>PRESERVE</span> HERITAGE,
      </div>
      <div className='down forprim w-[80%] items-center justify-center md:gap-3 gap-2 flex md:text-5xl text-3xl mx-auto'>
        EMPOWER <span className='forsec'>ARTISANS</span>
      </div>
    </div>
  );
};

export default Slogan;
