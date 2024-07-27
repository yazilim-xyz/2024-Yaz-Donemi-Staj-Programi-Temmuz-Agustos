import React from 'react'

const Chats = () => {
  return (
    <div className='chats'>
      <div className='userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52]'>
        <img  className="w-12 h-12 rounded-full object-cover"src="https://pbs.twimg.com/profile_images/1235250851876352002/zXuZlI2k_400x400.jpg" alt="" />
        <div className='"userChatInfo '>
          <span className='text-lg font-medium'>Busra</span>
          <p  className='text-sm text-slate-400'>Hello</p>
        </div>
      </div>       
    </div>
  )
}

export default Chats