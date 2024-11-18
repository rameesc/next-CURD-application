

import React from 'react'
import { FaThumbsUp } from "react-icons/fa";
interface successProps{
    message:string
}

export const SuccessMessage = ({message}:successProps) => {
    if(!message){
        return null
    }
  return (
    <div className='p-1 rounded-lg bg-green-300 flex gap-2 items-center text-green-700 text-[16px] font-sans'>
        <FaThumbsUp/>
        <p>{message}</p>
    </div>
  )
}
