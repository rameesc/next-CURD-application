
import { MdError } from "react-icons/md";
import React from 'react'

interface errorProps{
    message:string
}

export const ErrorMessage = ({message}:errorProps) => {

    if(!message){
        return null
    }
  return (
    <div className='p-1 rounded-lg bg-red-300 flex gap-2 items-center text-red-700 text-[16px] font-sans'>
        <MdError/>
        <p>{message}</p>
    </div>
  )
}
