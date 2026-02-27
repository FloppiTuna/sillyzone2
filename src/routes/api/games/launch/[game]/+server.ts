import { execAsync } from "$lib/server/exec";

export async function POST({ params, locals }) {
    if (!locals.session) {
        return new Response(JSON.stringify({ success: false, error: 'Not authenticated' }), { status: 401 });
    }

    const { game } = params;
    const user = locals.session.username;

    // before we begin let's check that the image is valid and exists
    try {
        await execAsync("docker image inspect ttr-runner");
        console.log(`Image valid!`);
    } catch (e) {
        console.error(`Error inspecting image: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "This sillyzone is missing the components necessary to run ToonTown. The ttr-runner image is not available." }), { status: 404 });
    }

    // also lets check if this user already has a container running
    try {
        const { stdout } = await execAsync(`docker ps -f "name=${user}-${game}-instance" --format "{{.ID}}"`);
        if (stdout.trim() !== "") {
            const existingContainerId = stdout.trim();
            const { stdout: portOutput } = await execAsync(`docker port ${existingContainerId} 10000`);
            const hostPort = Number(portOutput.trim().split(':').pop());
            console.log(`User ${user} already has a container running for game ${game} on port ${hostPort}`);
            return new Response(JSON.stringify({ success: false, error: "You already have a container running for this game.", hostPort }), { status: 409 });
        }
    } catch (e) {
        console.error(`Error checking existing containers: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "An error was encountered while checking existing containers." }), { status: 500 });
    }





    try {
        const { stdout } = await execAsync(`docker run -p 0:10000 -e SILLYZONE_USERNAME="${user}" --name ${user}-${game}-instance --platform linux/amd64 --rm -d ttr-runner:latest`);
        const containerId = stdout.trim();

        // Read back the dynamically assigned host port
        const { stdout: portOutput } = await execAsync(`docker port ${containerId} 10000`);
        // portOutput looks like "0.0.0.0:12345\n" — extract the port number
        const hostPort = portOutput.trim().split(':').pop();

        console.log(`Container launched successfully! ID: ${containerId}, Port: ${hostPort}`);
        return new Response(JSON.stringify({ success: true, containerId, hostPort: Number(hostPort) }), { status: 200 });
    } catch (e) {
        console.error(`Error launching container: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "An error was encountered while launching the game container." }), { status: 500 });
    }
}