'use server'

import { NextRequest, NextResponse } from "next/server"
import {NextApiRequest,NextApiResponse} from "next"
import { userForm } from "@/schema"
import { User } from "@/models/userSchema"
import { DbConnection } from "@/lib/db"





export const POST=async(req:NextApiRequest,res:NextApiResponse)=>{


    try{
      const body=  await req.json() 
       
      const validation=userForm.safeParse(body)

      if(!validation.success){
        return NextResponse.json({error:"invalid"})
      }

      const {name,profession,email}=validation.data
      await DbConnection()

      //user alreadt exist or no

      const existinUser=await User.findOne({email})

      if(existinUser){

        return NextResponse.json({error:"alradt existing"})
      }

      const cretaeUser=await User.create({
        name,
        email,
        profession

      })

      if(cretaeUser){
        return NextResponse.json({success:"create"})
      }
        


        return NextResponse.json({success:"ok"})




    }catch(error){
        console.log(error)
    }
}