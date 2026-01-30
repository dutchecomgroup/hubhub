"use client";

import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, Server, Activity, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    name: string;
    url: string;
    status: "up" | "down" | "checking";
    uptime: string;
    serverIp: string;
    cpu: number;
    ram: number;
}

export function ProjectCard({ name, url, status, uptime, serverIp, cpu, ram }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 flex flex-col gap-6"
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <Server className="w-5 h-5 text-white/50" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{name}</h3>
                        <a href={url} target="_blank" className="text-sm text-white/30 hover:text-blue-400 flex items-center gap-1 transition-colors">
                            {url.replace("https://", "")} <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <div className={status === "up" ? "status-online" : "status-offline"} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                        {status === "up" ? "Stable" : status === "down" ? "Down" : "Checking"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs text-white/30 block mb-1">CPU Usage</span>
                    <div className="flex items-end justify-between gap-2">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${cpu}%` }}
                                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            />
                        </div>
                        <span className="text-xs font-mono">{cpu}%</span>
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs text-white/30 block mb-1">RAM Usage</span>
                    <div className="flex items-end justify-between gap-2">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${ram}%` }}
                                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            />
                        </div>
                        <span className="text-xs font-mono">{ram}%</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium flex items-center justify-center gap-2">
                    Admin Panel <ArrowRight className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                    <RefreshCw className="w-4 h-4 text-white/40 group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>
        </motion.div>
    );
}
