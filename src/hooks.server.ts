import type { Handle } from '@sveltejs/kit';
import redis from '$lib/server/redis';

export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get('session');

    if (sessionToken) {
        const sessionData = await redis.get(`session:${sessionToken}`);
        if (sessionData) {
            const { username } = JSON.parse(sessionData);
            event.locals.session = { userId: username, username };
        } else {
            // session expired or invalid — clear the stale cookie
            event.cookies.delete('session', { path: '/' });
            event.locals.session = null;
        }
    } else {
        event.locals.session = null;
    }

    return resolve(event);
};
