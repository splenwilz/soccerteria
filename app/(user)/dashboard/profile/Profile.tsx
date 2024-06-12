"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import profilepics from "@/assets/images/profilepics.svg"
import {
    Form,
    FormControl,
    FormDescription,
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { User } from "@clerk/nextjs/server"


const profileFormSchema = z.object({
    firstname: z
        .string()
        .min(2, {
            message: "Firstname must be at least 2 characters.",
        })
        .max(30, {
            message: "Firstname must not be longer than 30 characters.",
        }),
    lastname: z
        .string()
        .min(2, {
            message: "Lastname must be at least 2 characters.",
        })
        .max(30, {
            message: "Lastname must not be longer than 30 characters.",
        }),
    language: z
        .string()
        .refine((value) => value === "en", "Please select an option"),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    gender: z.string().optional(),
    street: z.string().min(1, { message: "Street name is required." }),
    city: z.string().min(1, { message: "City name is required." }),
    state: z.string().min(1, { message: "State name is required." }),
    postcode: z
        .string()
        .min(1, { message: "Postcode is required." }),
    country: z.string().min(1, { message: "Country name is required." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: "Please enter a valid URL." }),
            })
        )
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: "I own a computer.",
    urls: [
        { value: "https://shadcn.com" },
        { value: "http://twitter.com/shadcn" },
    ],
}

export default function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex mt-6">
                    {/* <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>{user?.firstName?.[0] ?? ''}{user?.lastName?.[0] ?? ''}</AvatarFallback>
                    </Avatar> */}
                    <div className="">
                        <Image src={profilepics} alt="signup_wing1" className="" width={60} height={60} />
                    </div>
                    <div className="ml-5">
                        <h3 className="font-inter font-semibold  ">Profile Picture</h3>
                        <div className="flex gap-5 mt-2 mb-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="sm"
                                className="px-2 text-[12px]">Upload Image</Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="px-4 text-[12px]"
                            >
                                Remove
                            </Button>
                        </div>
                        <span className="text-sm text-gray-500 mt-10">We support PNGs, JPGs and GIFs under 10MB</span>
                    </div>
                </div>
                <Separator />
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mt-3">Personal Information</h2>
                    <p className="text-sm text-gray-500 mt-2 mb-10">
                        Enter your personal information, including your first name, last name, and a brief bio.
                    </p>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="firstname"
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
                            name="lastname"
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

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>I am</FormLabel>
                            <RadioGroup className="flex gap-10 -mt-10" defaultValue="male">
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

                <Separator />

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mt-3">Contact Information</h2>
                    <p className="text-sm text-gray-500 mt-2 mb-10">
                        Enter your contact information, including your email address and phone number.
                    </p>
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

                <div className="flex gap-5">
                    <Button
                        type="submit"
                        variant="primary"
                        size="default"
                        className="px-16">Save</Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="default"
                        className="px-16"
                        onClick={() => append({ value: "" })}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}