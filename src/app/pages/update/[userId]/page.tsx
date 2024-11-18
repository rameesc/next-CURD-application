'use client'

import { singleUser, upadetUserInfo } from '@/actions/userActions'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import * as z from 'zod'
import {updateUser, userForm} from '@/schema/index'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
}from "@/components/ui/form"

import axios from 'axios'
import { CardWrapper } from '@/components/CardWrapper'
import { SuccessMessage } from '@/components/SuccessMessage'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


interface updateProps{
    params:Promise<{ userId: string }>

    
}

const UpdateUser = ({params}:updateProps) => {

    const [userData,setUserData]=useState()
    const [error,setError]=useState<string |undefined>('')
    const [ispedding,transition]=useTransition()
    const route=useRouter()

   

    if(!params){
      return  route.push('/')

    }


    useEffect(()=>{

        singleUser(params.userId)
        .then((res)=>{
            setUserData(res.user)
            setError(res.error)

        })

    },[params?.userId])

    const form=useForm<z.infer <typeof updateUser>>({
        resolver:zodResolver(updateUser),
        defaultValues:({
            name:userData?.name ||undefined,
            email:userData?.email||undefined,
            profession:userData?.profession|| undefined
        })
    })


    const onSubmit=(value:z.infer<typeof updateUser>)=>{
        transition(()=>{
            upadetUserInfo(params?.userId ,value)
            .then((res)=>{
                setError(res?.error)
                if(res?.success){
                    route.push('/')
                }
            })

        })

    }
  return (
    <div className='w-[100%] flex flex-col justify-center items-center'>
        <CardWrapper
          headerTitle="Create User"
          bottomTitle='back to Home'
          bottomLink='/'
        >
           <Form {...form}>
            {JSON.stringify(userData?.name)}
             <form className=' space-y-3 w-[80%]' onSubmit={form.handleSubmit(onSubmit)}>

             <FormField 
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                     {...field}
                     value={field.value}
                     defaultValue={userData?.name}
                     placeholder='name'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
             
             />
           
             <FormField 
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                     {...field}
                     placeholder='Email@gmail.come'
                     defaultValue={userData?.email}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
             
             />
             <FormField 
              control={form.control}
              name="profession"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input
                     {...field}
                     placeholder='enginner'
                     defaultValue={userData?.profession}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
             
             />
            
              <ErrorMessage message={error}/>
             
            
            
             <Button disabled={ispedding} type="submit">submit</Button>

            


             </form>

           </Form>
        </CardWrapper>
    </div>
  )
}

export default UpdateUser