import { writable } from "svelte/store";

export interface SessionStore {
    token: string | null;
    user: {
        username: string;
        profilePictureUrl: string;
    }
}

export const sessionStore = writable<SessionStore>({
    token: null,
    user: {
        username: "",
        profilePictureUrl: ""
    }
});

export function setSession(token: string, username: string, profilePictureUrl: string) {
    sessionStore.set({
        token,
        user: {
            username,
            profilePictureUrl
        }
    });
}

export function getSession() {
    let session: SessionStore;
    sessionStore.subscribe(value => {
        session = value;
    })();
    return session!;
}