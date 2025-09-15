import React from 'react'
import { Button } from "@/components/ui/button";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from '@/components/theme-toggle';

const NavBar = () => {
    return (
        <nav className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4'>
            <div className='bg-white/10 dark:bg-black/10 backdrop-blur-md border border-amber-500 rounded-full shadow-md shadow-[#f7c46cb6]  dark:shadow-amber-500 transition-all duration-300 hover:bg-white/25 dark:hover:bg-black hover:scale-[1.02]'>
                <div className='px-6 py-4 flex justify-between items-center'>
                    <Link href={"/"} className='flex items-center gap-1'>
                        <Image src={"/logo2.png"} alt='LinkCluster' width={42} height={42} />
                        <span className='font-bold text-2xl tracking-widest text-amber-500 text-shadow-2xs text-shadow-black/10 dark:text-white dark:text-shadow-amber-500'
                        >LinkCluster</span>
                    </Link>
                    <div className='flex items-center gap-4'>
                        <ModeToggle />
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>

                        <SignedOut>
                            <div className="flex items-center gap-2">
                                <SignInButton>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10"
                                    >
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button
                                        size="sm"
                                        className="text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white"
                                    >
                                        Sign Up
                                    </Button>
                                </SignUpButton>
                            </div>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default NavBar