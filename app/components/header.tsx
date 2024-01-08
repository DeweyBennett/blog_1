import Image from "next/image";
import Link from "next/link";


export default function Header() {

    return(
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5">
                <Link href='/'>
                    <img
                        className="w-44 object-contain space-x-5"
                        src='https://links.papareact.com/yvf'
                        alt=''
                    />
                </Link>
                <div className="hidden md:inline-flex items-center space-x-5">
                    <h3 className="cursor-pointer">About</h3>
                    <h3 className="cursor-pointer">Contact</h3>
                    <h3 className="text-white bg-[#FF6666] px-4 py-1 rounded-full cursor-pointer">Follow</h3>
                </div>
            </div>

            <div className="flex items-center space-x-5 text-[#FF6666]">
                <h3 className="cursor-pointer">Sign In</h3>
                <h3 className="border border-[#FF6666] px-4 py-1 rounded-full cursor-pointer">Get Started</h3>
            </div>
        </header>
    )
}