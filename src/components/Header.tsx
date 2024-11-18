


import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'


export const Header = () => {
  return (
    <div className='w-full flex flex-col bg-black justify-center items-center text-white py-5'>
         <div className='container flex justify-between'>
            <h1 className='text-[30px]'>Next-CURD Application</h1>
            
            <Button className='text-[20px] after:content-[" "] after:bg-red-400  relative after:h-screen  hover:after:w-full  after:duration-700  overflow-hidden after:absolute after:left-0 after:w-[0px] border-2 rounded-lg py-5  bg-black'>
            <Link href='/pages/create-user'><span className=' relative z-10'> Create User</span></Link>
            </Button>
           
         </div>
    </div>
  )
}
