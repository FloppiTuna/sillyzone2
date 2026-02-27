import redis from '$lib/server/redis';
import { createHash, randomBytes } from 'crypto';

const SESSION_TTL = 60 * 60 // 1 hour

function sha256Hash(input: string): string {
  return createHash('sha256')
    .update(input)
    .digest('hex'); 
}


export async function POST({ request, cookies }) {
    const { username, password } = await request.json();

    // validate input
    if (!username || !password) {
        return new Response(JSON.stringify({ success: false, message: 'Incomplete credentials.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
        });
    }

    // check if username exists in redis
    const user = await redis.hGetAll(`user:${username}`);

    if (!user || !user.password) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid username or password' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }

    // compare with password in redis
    if (sha256Hash(password) !== user.password) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid username or password' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }

    // create session
    const sessionToken = randomBytes(32).toString('hex');
    const sessionData = JSON.stringify({ username });

    await redis.set(`session:${sessionToken}`, sessionData, { EX: SESSION_TTL });

    // set httponly cookie
    cookies.set('session', sessionToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: SESSION_TTL
    });

    return new Response(JSON.stringify({ success: true, message: 'Login successful', username }), {
        headers: { 'Content-Type': 'application/json' }
    });
}