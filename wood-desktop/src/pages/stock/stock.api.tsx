import axios from 'axios';
import {invoke} from "@tauri-apps/api";
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
const client = axios.create({ adapter: axiosTauriApiAdapter });

const url = "http://216.225.203.244:3000/api";

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    common: {
        Referrer: null
    }
};

export const apiGetStock = async () => {
    //return axios.get(`${url}/stock/`, config);
    return await invoke("get_stock");
}

export const apiAddStockProduct = (payload: any) => {
    return client.post(`${url}/stock/product`, payload, config);
}

export const apiUpdateStockProduct = (payload: any) => {
    return client.post(`${url}/stock/update/product`, payload, config);
}

export const apiDeleteStockProduct = (payload: any) => {
    return client.post(`${url}/stock/delete/product`, payload, config);
}

export const apiAddUnit = (payload: any) => {
    return client.post(`${url}/stock/unit`, payload, config);
}

export const apiGetUnits = async () => {
    return await client.get(`${url}/stock/units`, config);
}

export const apiGetWarehouses = () => {
    return client.get(`${url}/stock/warehouse`, config);
}

export const apiAddWarehouse = (payload: any) => {
    return client.post(`${url}/stock/warehouse`, payload, config);
}