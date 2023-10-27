import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Smokum } from "next/font/google";

export const Footer = () => {
    return ( 
        <div className="flex items-centre w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size='sm'>
                    Privacy policy
                </Button>
                <Button variant='ghost' size='sm'>
                    Terms and conditions!
                </Button>
            </div>
        </div>
     );
}
 
export default Footer;