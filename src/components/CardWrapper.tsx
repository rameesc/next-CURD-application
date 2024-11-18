



import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
  

 interface CardWrapperProps{
    children:React.ReactNode
    headerTitle:string,
      bottomTitle:string,
    bottomLink:string
 }

export const CardWrapper = ({
    children,
    headerTitle,
    bottomTitle,
    bottomLink,
}:CardWrapperProps) => {
  return (
    <Card className='lg:w-[600px] md:w-[600px] w-[90%] sm:p-5 flex flex-col justify-center items-center'>
        <CardHeader>
            <CardTitle className='text-[30px]'>{headerTitle}</CardTitle>
        </CardHeader>
        {children}
        <CardFooter className='flex flex-col gap-4'>
            
            <Link href={bottomLink}><span className='text-blue-600 text-[15px]'>{bottomTitle}</span></Link>
        </CardFooter>

    </Card>

    
    
  )
}
