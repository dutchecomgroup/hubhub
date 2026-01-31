"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Zap, Shield, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navItems = [
    { name: "Hubs", href: "/", icon: LayoutDashboard },
    { name: "Pulse", href: "/infrastructure", icon: Zap },
    { name: "Vault", href: "/vault", icon: Shield },
    { name: "Life", href: "/life", icon: User },
];

export function MainNav() {
    const pathname = usePathname();

    return (
        <nav className="max-w-fit mx-auto glass rounded-2xl p-1.5 flex items-center gap-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2",
                            isActive ? "text-white" : "text-white/40 hover:text-white/70"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.name}</span>
                        {isActive && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {isActive && (
                            <motion.div
                                layoutId="active-tab-glow"
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full blur-[2px]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </Link>
                );
            })}

            <div className="w-px h-6 bg-white/10 mx-2" />

            <button className="p-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <Settings className="w-4 h-4" />
            </button>

            <button
                onClick={() => signOut()}
                className="p-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="Uitloggen"
            >
                <LogOut className="w-4 h-4" />
            </button>
        </nav>
    );
}
