"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import profilepics from "@/assets/images/profilepics.svg"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"
import { UploadButton } from "@/utils/uploadthing"
import { imageRemove } from "@/app/actions/imageRemove"
import { Toaster } from "@/components/ui/toaster"
import { profileFormSchema } from "./default"
import { User } from "@/lib/types"
import { UpdateProfilePics, updateUser } from "@/lib/user"

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
    user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const defaultValues: Partial<ProfileFormValues> = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email,
        gender: user.gender === "male" || user.gender === "female" ? user.gender : undefined,
        street: user.street || "",
        city: user.city || "",
        state: user.state || "",
        postcode: user.postcode || "",
        country: user.country || "",
        phone: user.phone || "",
    }
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const [preview, setPreview] = React.useState(user.imageUrl || profilepics);
    const [imageKey, setImageKey] = React.useState('')

    function onSubmit(data: ProfileFormValues) {
        const updatedData = {
            ...data,
            userId: user.userId,
        };
        updateUser(user.userId, updatedData);
        toast({
            title: "Profile updated",
            description: "Your profile has been updated.",
        })
    }

    const [uploading, setUploading] = React.useState(false)

    const handleRemoveImage = async (e: React.FormEvent) => {
        e.preventDefault()
        setUploading(true)
        const res = await imageRemove(imageKey)
        if (res.success) {
            UpdateProfilePics(user.userId, '')
            setPreview(profilepics)
            setUploading(false)
            toast({
                title: "Image removed",
                description: "This image has been removed from your profile.",
            })
        }
    }

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex mt-6">
                    <Avatar className="w-16 h-16 mr-1">
                        <AvatarImage src={preview} />
                        <AvatarFallback>{user.firstName ? user.firstName[0] : ""}{user.lastName ? user.lastName[0] : ""}</AvatarFallback>
                    </Avatar>

                    <div className="ml-5">
                        <h3 className="font-inter font-semibold mb-2 ">Profile Picture</h3>
                        <div className="flex gap-3">
                            <UploadButton
                                className="h-[58px] text-[12px] ut-button:bg-[#2366BC]"
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    setPreview(res[0].url);
                                    setImageKey(res[0].key)
                                    toast({
                                        title: "Image uploaded",
                                        description: "This image has been uploaded to your profile.",
                                    })
                                    UpdateProfilePics(user.userId, res[0].url)
                                }}
                                onUploadError={(error: Error) => {
                                    toast({
                                        title: "Image upload failed",
                                        description: error.message,
                                    })
                                }}
                            />

                            <button
                                className={`border h-9 py-1 ${uploading ? 'opacity-50 cursor-not-allowed' : ''} rounded-sm border-[#2366BC] text-[#2366BC] bg-[#fff] px-8 text-[12px]`}
                                onClick={handleRemoveImage}
                            >
                                <div className="flex gap-3">
                                    <span className="">Remove</span>
                                    {uploading && <span role="status">
                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </span>}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <Separator />

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mt-3 font-inter">Personal Information</h2>
                    <p className="text-sm text-gray-500">Your personal information will be displayed on your profile</p>
                </div>

                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Firstname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="firstname" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lastname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="lastname" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="email"
                            disabled
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>I Speak</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="English" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="[&>label]:text-base">
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row space-x-4"
                                >

                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" />
                                        <div className="flex flex-col mt-5">
                                            <Label htmlFor="male">Male</Label>
                                            <span className="text-gray-400 mt-[2px] text-[12px]">(over 18 years old)</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" />
                                        <div className="flex flex-col mt-5">
                                            <Label htmlFor="female">Woman</Label>
                                            <span className="text-gray-400 mt-[2px] text-[12px]">(over 18 years old)</span>
                                        </div>
                                    </div>
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />


                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mt-3 font-inter">Contact Information</h2>
                    <p className="text-sm text-gray-500">Your contact information will be displayed on your profile</p>
                </div>

                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="city" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="postcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postcode</FormLabel>
                                    <FormControl>
                                        <Input placeholder="postcode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="country"
                            disabled
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Country" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="phone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <div className="flex justify-end">
                    <Button type="submit">Update Profile</Button>
                </div>
            </form>
        </Form>
    )
}
