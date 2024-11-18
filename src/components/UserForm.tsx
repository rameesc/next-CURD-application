
"use client"

import React, { useState, useTransition } from 'react'
import { CardWrapper } from './CardWrapper'
import * as z from 'zod'
import {userForm} from '@/schema/index'
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
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createNewUser } from '@/actions/userActions'
import { ErrorMessage } from './ErrorMessage'
import { SuccessMessage } from './SuccessMessage'
import axios from 'axios'

export const UserForm = () => {

  const [ispedding,transition]=useTransition()
  const [error,setError]=useState<string | undefined>('')
  const [success,setSuccess]=useState<string | undefined>('')

    const form=useForm<z.infer <typeof userForm>>({
        resolver:zodResolver(userForm),
        defaultValues:{
            name:'',
            email:'',
            profession:''
        }
    })

    const onSubmit=async(value:z.infer<typeof userForm>)=>{

     
      transition(()=>{

        // const {data}=await  axios.post('http://localhost:3000/api/user',value)
        //  setSuccess(data?.success)
        //  setError(data?.error)

        createNewUser(value).then((data)=>{
          setSuccess(data?.success)
         setError(data?.error)
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
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
             
             />
             {success?(
              <SuccessMessage message={success}/>
             ):(
              <ErrorMessage message={error}/>
             )}
            
            
             <Button disabled={ispedding} type="submit">submit</Button>

            


             </form>

           </Form>
        </CardWrapper>
    </div>
  )
}
