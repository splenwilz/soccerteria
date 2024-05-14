"use client"
import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

import signup_wing1 from "../../../assets/images/signup-wing1.png"
import signup_wing2 from "../../../assets/images/signup-wing2.png"
import signup_wing3 from "../../../assets/images/signup-wing3.png"
import locklock from "../../../assets/images/locklock.png"
import { RotateCcw } from 'lucide-react';
import Link from 'next/link';

const ForgotPasswordPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    // If the user is already signed in,
    // redirect them to the home page
    if (isSignedIn) {
        router.push('/');
    }

    // Send the password reset code to the user's email
    async function create(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then(_ => {
                setSuccessfulCreation(true);
                setError('');
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage);
                setError(err.errors[0].longMessage);
            });
    }

    // Reset the user's password. 
    // Upon successful reset, the user will be 
    // signed in and redirected to the home page
    async function reset(e: React.FormEvent) {
        e.preventDefault();
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then(result => {
                // Check if 2FA is required
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true);
                    setError('');
                } else if (result.status === 'complete') {
                    // Set the active session to 
                    // the newly created session (user is now signed in)
                    setActive({ session: result.createdSessionId });
                    setError('');
                } else {
                    console.log(result);
                }
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage)
                setError(err.errors[0].longMessage);
            });
    }

    return (
        <div

        >
            <Navigation logo="logo2" clasName="bg-white text-black" />
            <div className="bg-[url('../assets/images/signupbg.png')] bg-[#F5F9FE] bg-no-repeat relative h-screen w-full flex justify-center items-center">

                <Image src={signup_wing1} alt="logo" width={150} height={100} className="absolute -top-5" />
                <Image src={signup_wing2} alt="logo" width={260} height={200} className="absolute right-40 bottom-20" />
                <Image src={signup_wing3} alt="logo" width={260} height={200} className="absolute left-40 bottom-20" />
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                    }}
                    className='bg-white p-8 rounded-2xl h-[500px] w-[400px] shadow-lg shadow-black/30'
                    onSubmit={!successfulCreation ? create : reset}
                >
                    <h1 className='text-3xl font-inter text-center font-extrabold'>Reset Password</h1>
                    <div className="relative mx-auto">
                        <Image src={locklock} alt="locklock" width={60} height={60} className="mx-auto" />
                        <RotateCcw className="absolute bg-white rounded-full text-[#00B660] p-1 shadow-lg right-0 bottom-0" size={20} />
                    </div>
                    {!successfulCreation && (
                        <>
                            <label htmlFor='email' className='font-inter font-medium'>Email Address</label>
                            <input
                                type='email'
                                className='border border-gray-300 rounded-sm p-2'
                                placeholder='e.g john@doe.com'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <button className="bg-[#2366BC] mt-3 text-white font-inter font-semibold text-[16px] px-7 py-2 rounded-sm">Reset Password</button>
                            <Link href="/sign-in" className='underline text-center text-uppercase'>Back to Login</Link>
                            {error && <p>{error}</p>}
                        </>
                    )}

                    {successfulCreation && (
                        <>
                            <label htmlFor='password' className='font-inter font-medium'>Enter your new password</label>
                            <input
                                type='password'
                                className='border border-gray-300 rounded-sm p-2'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label htmlFor='password' className='font-inter font-medium'>Enter the password reset code that was sent to your email</label>
                            <input
                                type='text'
                                className='border border-gray-300 rounded-sm p-2'
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                            <button className="bg-[#2366BC] mt-3 text-white font-inter font-semibold text-[16px] px-7 py-2 rounded-sm">Reset</button>

                            {error && <p>{error}</p>}
                        </>
                    )}

                    {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;