import redis from '$lib/server/redis';

export async function POST({ cookies }) {
    const sessionToken = cookies.get('session');

    if (sessionToken) {
        await redis.del(`session:${sessionToken}`);
    }

    cookies.delete('session', { path: '/' });

    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
