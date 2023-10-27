"use client";
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';


export const Heading = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();


    return ( 
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your best friend for notes and tools <span className="underline">Best notes</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Created
                 for students.
            </h3>
            {!isAuthenticated && !isLoading &&(
                <SignInButton mode='modal'>
                    <Button>
                        Sign in free <ArrowRight className='h-4 w-4 ml-2'/>
                    </Button>
                </SignInButton>
            )}
            {isAuthenticated && !isLoading &&(
                <Button asChild>
                    <Link href='/documents'>
                        E N T E R <ArrowRight className='h-5 w-5 ml-2'/>
                    </Link>
                </Button>
            )}
        </div>
     );
}
 
export default Heading;