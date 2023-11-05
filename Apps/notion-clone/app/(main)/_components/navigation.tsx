"use client";
import { cn } from "@/lib/utils";

import { 
    ChevronsLeft, 
    MenuIcon, 
    Plus, 
    PlusCircle, 
    Search, 
    Settings,
    Trash} from "lucide-react";
 import{
    Popover,
    PopoverTrigger,
    PopoverContent
 } from "@/components/ui/popover"

import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import { useMutation,  } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";


// Define the Navigation component
export const Navigation = () => {
    // Check if the screen width is less than 768px
    const isMobile = useMediaQuery("(max-width: 768px)");
    const create = useMutation(api.documents.create);

    // Get the current pathname
    const pathname = usePathname();

    // Create a ref to track whether resizing is in progress
    const isResizingRef = useRef(false);

    // Create refs for sidebar and navbar elements
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    // Define states for resetting and collapsing the sidebar
    const [isResetting, setIsResetting] = useState(false);
    const [isColapsed, setIsColapsed] = useState(isMobile);

    useEffect (() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile])

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWith = event.clientX;

        if (newWith < 200) newWith = 200;
        if (newWith > 400) newWith = 400;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWith}px`;
            navbarRef.current.style.setProperty("left", `${newWith}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWith}px)`)
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp)
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsColapsed(false);
            setIsResetting(false);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(    
                "width", 
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300)
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsColapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() =>setIsResetting(false), 300);
        }
    }

    const handleCreate = () =>{
        const promise = create({ title: "Untitled "});

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "Note created",
            error: "Failed to create note",
        })
    };

    /* Functions */
    return (
        <>
            {/* Sidebar component */}
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secundary overflow-y-auto relative flex w-60 flex-col z-[9999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0",
                )}
            >
                {/* Button to collapse the sidebar */}
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neural-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Item 
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={() => {}}
                    />
                    <Item 
                        label="Settings"
                        icon={Settings}
                        onClick={() => {}}
                    />
                    <Item 
                        onClick={handleCreate} 
                        label="New page" 
                        icon={PlusCircle} 
                    />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label="Add a page"
                    />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item 
                                label="Trash" 
                                icon={Trash} 
                            />
                        </PopoverTrigger>
                        <PopoverContent 
                            side={isMobile ? "bottom" : "right"}
                            className="p-0 w-72"
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>

            {/* Navbar component */}
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-full ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isColapsed && <MenuIcon onClick={resetWidth} role="button" 
                    className="h-6 w-6 text-muted-foregorund" />}
                </nav>
            </div>
        </>
    );
}
