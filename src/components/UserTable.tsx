
'use client'

import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from './ui/button'
import { allUser, removeUser } from '@/actions/userActions'
import Link from 'next/link'
import { ServerRemoveBtn } from './ServerRemoveBtn'

  



export const UserTable = () => {

  const [userItem,setUser]=useState<any| ''>([])

  const [remove,setRemove]=useState<string|''>('')

   
  

    const removeUserItem=async(id:string)=>{
           const data=await  removeUser(id)
           setRemove(data?.success as string)
      
    }

    const getUser=async()=>{
      const {user}=await allUser()
      setUser(JSON.parse(user))
    }

    useEffect(()=>{
      getUser()

    },[remove])

    
    
  return (
    <div>
       {!userItem.length>0 ?(
      <div >
        <Button className='w-[150px]'>
        <Link href='/pages/create-user'>Create New User</Link>
       </Button>
      </div>
      
    ):(
    <Table className='border w-[90%] rounded-lg border-black'>
  
   <TableHeader className='bg-black'>
    <TableRow className='text-[15px] bg-black '>
      <TableHead  className='text-white'>#</TableHead>
      <TableHead  className='text-white' >Name</TableHead>
      <TableHead  className='text-white'>Email</TableHead>
      <TableHead  className='text-white'>Profession</TableHead>
      <TableHead  className='text-white'>Create At</TableHead>
      <TableHead  className='text-white' >Update</TableHead>
      <TableHead  className='text-white'>Remove</TableHead>
     
    </TableRow>
  </TableHeader>
   <TableBody>
   
   {userItem.map((item:any,index:number)=>(
    <TableRow key={index}>
        <TableCell>{index+1}</TableCell>
        <TableCell>{item.name}</TableCell>
       
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.profession}</TableCell>
        <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
        <TableCell>
            <Button className='bg-gray-600'>
            <Link href={`/pages/update/${item._id}`}>Update</Link>
            </Button>
        </TableCell>
        <TableCell>
        <Button type="submit" onClick={()=>removeUserItem(item._id)}  className='bg-red-500 hover:bg-red-500'>remove</Button>
        </TableCell>
        
    </TableRow>
   ))}
   
   </TableBody>
  </Table>
  )}
       
    </div>
  )
}
