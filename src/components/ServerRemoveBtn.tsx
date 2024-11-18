
"use server"

import React from 'react'
import { Button } from './ui/button'
import { removeUser } from '@/actions/userActions'

export const ServerRemoveBtn = ({id}:{id:string}) => {
  return (
    <form action={
       

      (async()=>{
        "use server"

            await removeUser(id)

        })
    }>

      <Button type="submit"  className='bg-red-500'>remove</Button>

    </form>
    
  )
}
