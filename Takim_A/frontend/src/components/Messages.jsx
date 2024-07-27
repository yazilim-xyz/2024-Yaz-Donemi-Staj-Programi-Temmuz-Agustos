import React from 'react'
import Message from './Message';
const Messages = () => {
  return (
    <div  style={{ height: 'calc(100% - 96px)' }} className='messages overflow-scroll bg-[#ddddf7] p-2.5 '>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Messages