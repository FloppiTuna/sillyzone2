import { execAsync } from '$lib/server/exec';

export async function GET({ params }) {
    const { id } = params;

    try {
        const status = await execAsync(`docker exec ${id} cat /tmp/game_progress.txt`);
        return new Response(JSON.stringify({ success: true, status: status.stdout.trim() }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}