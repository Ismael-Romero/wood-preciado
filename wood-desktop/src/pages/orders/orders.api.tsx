import {getClient} from "@tauri-apps/api/http";

const url = "http://216.225.203.244:3000/api";

export const apiAddOrder = async (payload: any) => {
    //return axios.post(`${url}/sale`, payload);
    const client = await  getClient();
    return await client.post(`${url}/sale`, {
        payload: payload,
        type: 'Json'
    });
}

export const apiGetOrders = async () => {
    //return axios.get(`${url}/sales`);
    const client = await  getClient();
    return await client.get(`${url}/sales`);
}

export const apiUpdateStatus = async (payload) => {
//    return axios.post(`${url}/sale/update/status`, payload);
    const client = await  getClient();
    return await client.post(`${url}/sale/update/status`, {
        payload: payload,
        type: "Json",
    });
}