import {useState} from "react";

export const useLocalStorage = (key, initValue) => {

    const [store, setStore] = useState(() => {
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initValue;
        }catch (error){
            return initValue;
        }
    });

    const setValue = (value) => {
        try{
            setStore(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        }catch (error){
            console.log(error);
        }
    };

    return [store, setValue];
};