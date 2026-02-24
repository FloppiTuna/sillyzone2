import { execAsync } from "$lib/server/exec";

export async function POST({ params }) {
    const { game } = params;

    const user = "arsenic"; // TODO: get this from the session or something instead of hardcoding it!!

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
            console.log(`User ${user} already has a container running for game ${game}`);
            return new Response(JSON.stringify({ success: false, error: "You already have a container running for this game." }), { status: 409 });
        }
    } catch (e) {
        console.error(`Error checking existing containers: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "An error was encountered while checking existing containers." }), { status: 500 });
    }





    try {
        const { stdout } = await execAsync(`docker run -p 10000:10000 -e SILLYZONE_USERNAME="arsenic" --name ${user}-${game}-instance --platform linux/amd64 --rm -d ttr-runner:latest`);
        const containerId = stdout.trim();
        console.log(`Container launched successfully! ID: ${containerId}`);
        return new Response(JSON.stringify({ success: true, containerId }), { status: 200 });
    } catch (e) {
        console.error(`Error launching container: ${e}`);
        return new Response(JSON.stringify({ success: false, error: "An error was encountered while launching the game container." }), { status: 500 });
    }
}