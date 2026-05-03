'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, UserCircle, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer"

import { useAuth } from "@/context/AuthContext"
import { LoginModal } from "@/components/auth/LoginModal"

const publicRoutes = [
    {
        name: "Application",
        path: "/",
        icon: ClipboardList,
    }
]

const restrictedRoutes = [
    {
        name: "dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Companies",
        path: "/Topics",
        icon: LayoutDashboard,
    },
    {
        name: "Archive: Applicants",
        path: "/Archive/Applicants",
        icon: ClipboardList,
    },
    {
        name: "Archive: Companies",
        path: "/Archive/Companies",
        icon: LayoutDashboard,
    }
]

export default function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false)
    const { isAuthenticated, logout } = useAuth()

    const routes = isAuthenticated
        ? [...publicRoutes, ...restrictedRoutes]
        : publicRoutes

    return (
        <nav className="fixed top-5 left-0 right-0 z-50 bg-transparent print:hidden pointer-events-none">
            <div className="w-full relative h-28">
                {/* Logo wrapper (Absolute positioned for free movement) */}
                <div className="absolute left-4 sm:left-8 lg:left-12 top-0 h-full flex items-center pointer-events-auto">
                    <Link href="/" className="flex items-center">
                        <img src="https://theyoko.com/wp-content/uploads/2021/07/The-YoKo-BLK-NO-BG1.png" alt="The Yoko Logo"
                        className="w-[120px] h-auto object-contain" />
                    </Link>
                </div>

                {/* Admin Actions & Hamburger - Extreme Right */}
                <div className="absolute right-4 sm:right-8 lg:right-12 top-0 h-full flex items-center gap-2 pointer-events-auto">
                    {/* Navigation Toggle - Always visible */}
                    <div>
                        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-primary-text w-10 h-10 rounded-full hover:bg-gray-100/50">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="h-full w-[280px] sm:w-[320px] rounded-l-[20px] rounded-r-none border-y-0 border-r-0 fixed right-0 top-0 bottom-0 left-auto pointer-events-auto">
                                <DrawerHeader className="border-b pb-6 mb-4">
                                    <div className="flex items-center justify-between">
                                        <DrawerTitle className="text-left flex items-center gap-3">
                                            {/* 
                                             */}
                                            <div className="flex flex-col">
                                                {/* <span className="font-bold text-lg leading-none">Kaizen UI</span>
                                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">Navigation Menu</span> */}

                                            </div>
                                        </DrawerTitle>
                                        <DrawerClose asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-9 w-9">
                                                <X className="h-5 w-5" />
                                            </Button>
                                        </DrawerClose>
                                    </div>
                                </DrawerHeader>
                                <div className="flex flex-col gap-2 px-4 py-2">
                                    <div className="flex flex-col gap-2 mb-4 pb-4 border-b">
                                        {isAuthenticated ? (
                                            <Button
                                                variant="ghost"
                                                onClick={logout}
                                                className="w-full justify-start text-gray-500 hover:text-kaizen-red text-base font-semibold"
                                            >
                                                Logout
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                onClick={() => setIsLoginModalOpen(true)}
                                                className="w-full justify-start text-gray-500 hover:text-kaizen-red text-base font-semibold"
                                            >
                                                Login
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
                                        Available Routes
                                    </div>
                                    {routes.map((route) => (
                                        <Link
                                            key={route.path}
                                            href={route.path}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold transition-all duration-300 group",
                                                pathname === route.path
                                                    ? "bg-kaizen-red text-white shadow-lg shadow-kaizen-red/20"
                                                    : "text-gray-600 hover:bg-gray-100 hover:text-primary-text"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2 rounded-lg transition-all duration-300 group-hover:scale-110",
                                                pathname === route.path ? "bg-white/20" : "bg-gray-50"
                                            )}>
                                                <route.icon className={cn(
                                                    "h-5 w-5",
                                                    pathname === route.path ? "text-white" : "text-gray-500"
                                                )} />
                                            </div>
                                            {route.name}
                                        </Link>
                                    ))}
                                </div>
                                {/* <div className="mt-auto p-8 border-t bg-gray-50/30">
                                    <p className="text-[11px] text-gray-400 text-center font-medium leading-relaxed">
                                        Modern UI System v1.0<br />
                                        Handcrafted by Antigravity
                                    </p>
                                </div> */}
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
        </nav>
    )
}
