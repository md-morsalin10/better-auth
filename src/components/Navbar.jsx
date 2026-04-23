"use client"
import { signOut, useSession } from "@/lib/auth-client";
import { Link, Button } from "@heroui/react";

const Navbar = () => {
    const {data, isPending} = useSession()
    if(isPending){
        return <div>Loading....</div>
    }
    console.log("session navbar", data);

    const user = data?.user;
    
    return (
        <div>
            <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
                <header className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                     
                        <p className="font-bold">ACME</p>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li><Link href="#">Features</Link></li>
                        <li><Link href="#">Pricing</Link></li>
                    </ul>
                    <div>
                        {user? <>
                        <p>Welcome {user.name}</p>
                        <Button
                        onClick={()=> signOut()}
                        >Sing Out</Button>
                        </>: <Link href="/auth/signin">SingIn</Link>}
                    </div>
                </header>
            </nav>
        </div>
    );
};

export default Navbar;