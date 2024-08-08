import React from 'react'

const Chats = () => {
  return (
    <div>
      <div className='p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]'>
        <img  className="w-12 h-12 rounded-full object-cover"src="https://i.pinimg.com/736x/90/e2/b1/90e2b1c648ca5355ddb3498f021224cc.jpg" alt="" />
        <div className=''>
          <span className='text-lg font-medium'>Ali</span>
          <p  className='text-sm text-slate-400'>Merhaba</p>
        </div>
      </div>       
    </div>
  )
}

export default Chats