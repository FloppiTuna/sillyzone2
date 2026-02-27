import redis from "$lib/server/redis";

export async function GET({ locals }) {
    if (!locals.session) {
        return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }

    const user = await redis.hGetAll(`user:${locals.session.username}`);

    return new Response(JSON.stringify({ success: true, game_credentials: JSON.parse(user.game_credentials) }), {
        headers: { 'Content-Type': 'application/json' }
    });
}