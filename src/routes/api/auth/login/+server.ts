import redis from '$lib/server/redis';
import { createHash } from 'crypto';

function sha256Hash(input: string): string {
  // Create a hash object using the 'sha256' algorithm
  return createHash('sha256')
    // Update the hash with the input data
    .update(input)
    // Generate the digest in hexadecimal format
    .digest('hex'); 
}


export async function POST({ request }) {
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

    if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid username or password' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }

    // get password from request body
    const inputPassword = password;

    // compare with password in redis
    if (sha256Hash(inputPassword) !== user.password) {
        console.debug('Password mismatch:', {
            inputHash: sha256Hash(inputPassword),
            storedHash: user.password
        });

        return new Response(JSON.stringify({ success: false, message: 'Invalid username or password' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }

    console.debug('User authenticated successfully:', { username });

    



    return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}