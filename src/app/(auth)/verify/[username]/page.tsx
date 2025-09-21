'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema } from '@/schemas/signUpSchema'
import { verifySchema } from '@/schemas/verifySchema'
import { apiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@react-email/components'
import axios, { AxiosError } from 'axios'
import { Code } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{ username: string }>()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),


    })


    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, { username: params?.username, code: data.code })
            toast.success("Successfully signed up", {
                description: response.data.message
            })
            router.replace('sign-in')
        } catch (error) {
            console.error('Error in signUp of user', error);
            const axiosError = error as AxiosError<apiResponse>;

            // toast.error("Something went wrong!")
            toast.error("Sign up failed", {
                description: axiosError.response?.data.message
            })

        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Verify your account</h1>
                    <p className="mb-4">Enter the verification code sent to your mail</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="code" {...field} />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerifyAccount