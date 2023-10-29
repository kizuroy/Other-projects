"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumetsPage = () => {

    const { user }  = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create ({ title: "Untitled" });

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create note.",
        });
    };

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                 src="/empty.png"
                 width="500"
                 height="500"
                 alt="Empty"
                 className="dark:hidden"
            />
            <Image
                 src="/empty-dark.png"
                 width="500"
                 height="500"
                 alt="Empty"
                 className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome {user?.firstName} to you'r Best notes!
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-5 w-5 mr-2" />
                Create a note
            </Button>
        </div>
     );
}
 
export default DocumetsPage;