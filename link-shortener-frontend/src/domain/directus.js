import {Directus} from "@directus/sdk";
const directus = new Directus("http://localhost:8055")
window.directus = directus;

export const getLinks = async () => {
    const response = await directus.getItems('links', {
        fields: ['id', 'url', 'short_url', 'created_at', 'updated_at']
    });
    return response.data;
}

export const me = async () => {
    return await directus.users.me.read();
}

export const maintainLogin = (timeout) => {
    setTimeout(() => {
        directus.auth.refresh().then(res => {
            maintainLogin(res.expires);
        });
    }, timeout);
}

