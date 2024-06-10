import axios from 'axios';

const url = "http://216.225.203.244:3000/api";

export const apiGetStock = () => {
    return axios.get(`${url}/stock`);
}

export const apiAddStockProduct = (payload: any) => {
    return axios.post(`${url}/stock/product`, payload);
}

export const apiUpdateStockProduct = (payload: any) => {
    return axios.post(`${url}/stock/update/product`, payload);
}

export const apiDeleteStockProduct = (payload: any) => {
    return axios.post(`${url}/stock/delete/product`, payload);
}

export const apiAddUnit = (payload: any) => {
    return axios.post(`${url}/stock/unit`, payload);
}

export const apiGetUnits = async () => {
    return await axios.get(`${url}/stock/units`);
}

export const apiGetWarehouses = () => {
    return axios.get(`${url}/stock/warehouse`);
}

export const apiAddWarehouse = (payload: any) => {
    return axios.post(`${url}/stock/warehouse`, payload);
}