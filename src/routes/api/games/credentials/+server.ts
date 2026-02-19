import redis from "$lib/server/redis";

export async function GET() {
    // todo: sessions
    const user = await redis.hGetAll(`user:arsenic`);

    return new Response(JSON.stringify({ success: true, game_credentials: JSON.parse(user.game_credentials) }), {
        headers: { 'Content-Type': 'application/json' }
    });
}