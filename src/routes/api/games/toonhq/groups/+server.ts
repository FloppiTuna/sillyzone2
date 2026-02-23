import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
    const response = await fetch('https://toonhq.org/api/groups/list/1/');
    if (!response.ok) {
        return json({ error: 'Failed to fetch from ToonHQ' }, { status: response.status });
    }
    const data = await response.json();
    return json(data);
};
