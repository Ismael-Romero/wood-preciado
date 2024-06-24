import {getClient} from "@tauri-apps/api/http";

const url = "http://216.225.203.244:3000/api";


export const apiAuthLogin = async (payload: any) => {
    const client = await  getClient();
    return await client.post(`${url}/auth/login`, {
        payload: payload,
        type: 'Json'
    });
}

export const apiAuthRegister = async (payload: any) => {
    const client = await  getClient();
    return await client.post(`${url}/auth/register`, {
        payload: payload,
        type: 'Json'
    });
}
