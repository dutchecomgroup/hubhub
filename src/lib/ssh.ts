import { Client } from "ssh2";
import fs from "fs";

interface SSHConfig {
    host: string;
    port?: number;
    username: string;
    privateKeyPath: string;
}

export async function executeCommand(config: SSHConfig, command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const conn = new Client();

        conn.on("ready", () => {
            conn.exec(command, (err, stream) => {
                if (err) {
                    conn.end();
                    return reject(err);
                }

                let output = "";
                stream.on("close", (code: number, signal: string) => {
                    conn.end();
                    resolve(output);
                }).on("data", (data: Buffer) => {
                    output += data;
                }).stderr.on("data", (data: Buffer) => {
                    output += data;
                });
            });
        }).on("error", (err) => {
            reject(err);
        }).connect({
            host: config.host,
            port: config.port || 22,
            username: config.username,
            privateKey: fs.readFileSync(config.privateKeyPath),
        });
    });
}

/**
 * Fetches basic system metrics from a Linux server
 */
export async function getServerMetrics(config: SSHConfig) {
    const cmd = `
    uptime -p; 
    free -m | awk 'NR==2{printf "%.2f", $3*100/$2}'; 
    echo; 
    top -bn1 | grep "Cpu(s)" | sed "s/.*, *\\([0-9.]*\\)%* id.*/\\1/" | awk '{print 100 - $1}'
  `;

    try {
        const rawOutput = await executeCommand(config, cmd);
        const lines = rawOutput.trim().split("\n");

        return {
            uptime: lines[0] || "Unknown",
            ramUsage: parseFloat(lines[1]) || 0,
            cpuUsage: parseFloat(lines[2]) || 0,
        };
    } catch (error) {
        console.error(`Failed to fetch metrics for ${config.host}:`, error);
        return { uptime: "Offline", ramUsage: 0, cpuUsage: 0 };
    }
}
