import axios from "axios";

const url = "http://216.225.203.244:3000/api";

export const apiAddOrder = (payload: any) => {
    return axios.post(`${url}/sale`, payload);
}

export const apiGetOrders = () => {
    return axios.get(`${url}/sales`);
}

export const apiUpdateStatus = (payload) => {
    return axios.post(`${url}/sale/update/status`, payload);
}