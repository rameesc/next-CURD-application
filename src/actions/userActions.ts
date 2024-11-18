'use server'

import { DbConnection } from "@/lib/db"
import {User} from '../models/userSchema'
import { updateUser, userForm } from "@/schema"
import * as z from 'zod'



/// GET ALL USER   //READ
export const allUser=async()=>{

    try{

        await DbConnection()

        const allUsers=await User.find().sort({createdAt: -1})
        return {user:JSON.stringify(allUsers)}


    }catch(error){
        return {error:"something went wrong"}
    }
}


//CREATE NEW USER //POST

export const createNewUser=async(values:z.infer <typeof userForm>)=>{

    try{

        const validations=userForm.safeParse(values)

        if(!validations.success){

            return {error:"Invalid Field"}
        }
        console.log(values)

        const {name,email,profession}=validations.data

        //create user
         await DbConnection()

         const existing =await User.findOne({email})

         if(existing){

            return {error:'existing user'}
         }

        await User.create({
            name,
            email,
            profession

        })

        
            return {success:"Created new user"}
        


    }catch(error){

        return {error:error.message}
    }



}


//update  user information //update

export const upadetUserInfo=async(id:string,values:z.infer <typeof updateUser>)=>{

    try{

     
        const updated=await User.findByIdAndUpdate(id,{
            ...values
        })

        if(updated){
            return {success:"user updated"}
        }




    }catch(error){

        return {error:"error"}
    }

}

//delete user  //delete
export const removeUser=async(id:string)=>{

    try{

     
        const updated=await User.findByIdAndDelete(id)

        if(updated){
            return {success:"successfuly deleted"}
        }




    }catch(error){

        return {error:"error"}
    }

}


export const singleUser=async(id:string)=>{

    try{

        //existing user

        const existing=await User.findById(id)

        if(!existing){
            return {error:"user not found"}
        }

        return {user:existing}


    }catch(error){
        return {error:'error'}
    }
}