//import axios from 'axios';
const url = "http://216.225.203.244:3000/api";
import {getClient} from "@tauri-apps/api/http";

export const apiGetStock = async () => {
    const client = await  getClient();
    return await client.get(`${url}/stock/`);
}

export const apiAddStockProduct = async (payload: any) => {
    const client = await  getClient();
    return await client.post(`${url}/stock/product`, {
        payload: payload,
        type: "Json",
    });
}

export const apiUpdateStockProduct = async (payload: any) => {
    const client = await  getClient();
    //return axios.post(`${url}/stock/update/product`, payload);
    return await client.post(`${url}/stock/update/product`, {
        payload: payload,
        type: "Json",
    });
}

export const apiDeleteStockProduct = async (payload: any) => {
    //return axios.post(`${url}/stock/delete/product`, payload);
    const client = await  getClient();
    return await client.post(`${url}/stock/delete/product`, {
        payload: payload,
        type: "Json",
    });
}

export const apiAddUnit = async (payload: any) => {
    //return axios.post(`${url}/stock/unit`, payload);
    const client = await  getClient();
    return await client.post(`${url}/stock/unit`, {
        payload: payload,
        type: "Json",
    });
}

export const apiGetUnits = async () => {
    //return await axios.get(`${url}/stock/units`);
    const client = await  getClient();
    return await client.get(`${url}/stock/units`);
}

export const apiGetWarehouses = async () => {
    //return axios.get(`${url}/stock/warehouse`);
    const client = await  getClient();
    return await client.get(`${url}/stock/warehouse`);
}

export const apiAddWarehouse = async (payload: any) => {
    //return axios.post(`${url}/stock/warehouse`, payload);
    const client = await  getClient();
    return await client.post(`${url}/stock/warehouse`, {
        payload: payload,
        type: "Json",
    });
}