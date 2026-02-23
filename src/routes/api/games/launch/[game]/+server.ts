import { execAsync } from "$lib/server/exec";

export async function POST({ params }) {
    const { game } = params;

    // before we begin let's check that the image is valid and exists
    try {
        await execAsync("docker image inspect ttr-runner");
        console.log(`Image valid!`);
    } catch (e) {
        console.error(`Error inspecting image: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "This sillyzone is missing the components necessary to run ToonTown. The ttr-runner image is not available." }), { status: 404 });
    }

    // if it is, we can proceed to launch the container
    try {
        const { stdout } = await execAsync(`docker run -p 10000:10000 -e SILLYZONE_USERNAME="arsenic" --name ${game}-instance --platform linux/amd64 --rm -d ttr-runner:latest`);
        const containerId = stdout.trim();
        console.log(`Container launched successfully! ID: ${containerId}`);
        return new Response(JSON.stringify({ success: true, containerId }), { status: 200 });
    } catch (e) {
        console.error(`Error launching container: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "An error was encountered while launching the game container." }), { status: 500 });
    }
}