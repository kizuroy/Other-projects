"use client";

import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useEffect, useState } from "react";
import * as Comand from "@/components/ui/command"
import { File } from "lucide-react";

export const SearchComand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [ isMounted, setIsMounted ] = useState(false);

    const toggle = useSearch((store) => store.togle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
        
    }, [toggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    if (!isMounted) return null;

    return (
        <Comand.CommandDialog open={isOpen} onOpenChange={onClose}>
            <Comand.CommandInput placeholder={`Search ${user?.fullName}' Best notes...`} />
            <Comand.CommandList>
                <Comand.CommandEmpty>
                    No results found.
                </Comand.CommandEmpty>
                <Comand.CommandGroup heading="Documents">
                    {documents?.map((document) => (
                        <Comand.CommandItem 
                            key={document._id} 
                            value={`${document._id}-${document.title}`}
                            title={document.title}
                            onSelect={onSelect}
                        >
                            {document.icon ? (
                                <p className=" mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ) : (
                                <File className=" mr-2 h-3 w-3"/>
                            )}
                            <span>
                                {document.title}
                            </span>
                        </Comand.CommandItem>
                    ))}
                </Comand.CommandGroup>
            </Comand.CommandList>
        </Comand.CommandDialog>
    );
}