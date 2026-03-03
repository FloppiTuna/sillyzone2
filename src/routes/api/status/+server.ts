import { execAsync } from "$lib/server/exec";

export async function GET() {
    const status = {
        foobar: "greetings!",
        services: {
            applications: {
                flimflam: "running",
            },
            games: {
                container_service: await execAsync("docker info --format '{{json .}}'").then(info => {
                    return JSON.parse(info.stdout).ServerVersion ? "running" : "not running";
                }).catch(() => "not running"),
            }
        }
    }

    return new Response(JSON.stringify(status), {
        headers: { 'Content-Type': 'application/json' }
    });
}
