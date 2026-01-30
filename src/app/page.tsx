import { ProjectCard } from "@/components/ProjectCard";
import { Plus } from "lucide-react";
import { fetchAllHubMetrics } from "@/server/actions/hubActions";

export default async function Home() {
  const metrics = await fetchAllHubMetrics();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Hubs</h1>
          <p className="text-white/40">Manage your digital ecosystem and infrastructure.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          name="DutchThrift Hub"
          url="https://hub.dutchthrift.com"
          status={metrics.dutchthrift.status as "up" | "down"}
          uptime={metrics.dutchthrift.uptime}
          serverIp="85.215.181.179"
          cpu={metrics.dutchthrift.cpuUsage}
          ram={metrics.dutchthrift.ramUsage}
        />
        <ProjectCard
          name="TCGDeckMaster"
          url="https://tcgdeckmaster.com"
          status={metrics.tcg.status as "up" | "down"}
          uptime={metrics.tcg.uptime}
          serverIp="85.215.182.227"
          cpu={metrics.tcg.cpuUsage}
          ram={metrics.tcg.ramUsage}
        />

        {/* Placeholder for adding new projects */}
        <div className="border-2 border-dashed border-white/5 rounded-[1.5rem] flex flex-col items-center justify-center p-8 text-white/20 hover:text-white/40 hover:border-white/10 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium">Connect New Hub</span>
        </div>
      </div>
    </div>
  );
}
