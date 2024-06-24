import {useEffect, useState} from "react";
import {Button, Form, Layout, Modal} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
import {WoodSelect} from "../../components/WoodSelect/WoodSelect.tsx";
import {apiAddStockProduct, apiGetUnits, apiGetWarehouses, apiUpdateStockProduct} from "./stock.api.tsx";
import {useNotificationSystem} from "../../context/useNotificationSystem.tsx";
import moment from "moment/moment";


export const ModalProducts = ({ isOpen, handleClose, observer, handleObserver, payloadUpdate }) => {
    const {openNotificationSuccess, openNotificationError} = useNotificationSystem();
    const [units, setUnits] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [productID, setProductID] = useState("");


    const onClose = () => {
        resetForm();
        handleClose();
    };

    const onCancel = () => {
        resetForm();
        handleClose();
    };

    const resetForm = () => {
        form.resetFields();
    }

    const getWarehouses = () => {
        apiGetWarehouses().then((response) => {
            // @ts-ignore
            setWarehouses(response.data.data);
        }).catch((error) => {
            openNotificationError(error.toString());
        });
    };

    const getUnits = () => {
        apiGetUnits().then((response) => {
            // @ts-ignore
            setUnits(response.data.data);
        }).catch((error) => {
            openNotificationError(error.toString());
        });
    };

    const buildBodyRequest = (values) => {
        const min     = values.min === undefined ? 0 : values.min;
        const current = values.current === undefined ? 0 : values.current;
        const entry   = values.entry === undefined ? 0 : values.entry;
        const max     = values.max === undefined ? 0 : values.max;
        const price   = values.price === undefined ? 0 : values.price;
        const dateSaved = moment().format("YYYY-MM-DD");

        return {
            productID: productID,
            productName: values.product,
            warehouseID: values.warehouse,
            unitID: values.unit,
            min: min,
            current: current,
            entry: entry,
            max: max,
            price: price,
            dateSaved: dateSaved,
        }
    };

    const saveProduct = (values) => {
        setIsLoading(true);
        apiAddStockProduct(buildBodyRequest(values)).then((response) => {
            if(response.status !== 200){
                setIsLoading(false);
                // @ts-ignore
                openNotificationSuccess(response.statusText);
                return;
            }

            resetForm();
            handleObserver(1);
            setIsLoading(false);
            openNotificationSuccess("El producto se ha agregado a la lista correctamente. Ya puedes utilizarlo.");
        }).catch((error) => {
            setIsLoading(false);
            openNotificationError(error.toString());
        });
    }

    const updateProduct = (values) => {
        setIsLoading(true);
        apiUpdateStockProduct(buildBodyRequest(values)).then((response) => {
            if(response.status !== 200){
                setIsLoading(false);
                // @ts-ignore
                openNotificationSuccess(response.statusText);
                return;
            }

            setPayload(null);
            handleObserver(1);
            setIsLoading(false);
            onClose();
            openNotificationSuccess("El producto se ha actualizado. Ya puedes utilizarlo.");
        }).catch((error) => {
            setIsLoading(false);
            openNotificationError(error.toString());
        })
    }

    const setPayload = (payload) => {
        if (payload === null){
            resetForm();
            return;
        }
        setProductID(payload.productID);
        form.setFieldsValue(payload);
    }

    useEffect(() => {
        getWarehouses();
        getUnits();
        setPayload(payloadUpdate);
    }, [observer, payloadUpdate]);

    return (
        <Modal title={"Productos"}
               open={isOpen}
               onClose={onClose}
               onCancel={onCancel}
               footer={null}>
            <Layout className={"bg-transparent"}>
                <Form form={form} onFinish={ payloadUpdate === null ? saveProduct : updateProduct}>
                    <WoodInput InputField={{
                        name: "product",
                        label: "Nombre del producto",
                        placeholder: "EJ: Madera de pino",
                        rules: [{required:true, message:"El campo es obligatorio"}]}}/>

                    <WoodSelect InputField={{
                        name: "warehouse",
                        label: "Bodega",
                        options: warehouses,
                        placeholder: "Selecciona una bodega",
                        onChange: () => {},
                        rules: [{required:true, message:"El campo es obligatorio"}]}}/>

                    <WoodSelect InputField={{
                        name: "unit",
                        label: "Medida",
                        options: units,
                        placeholder: "Selecciona una medida",
                        onChange: () => {},
                        rules: [{required:true, message:"El campo es obligatorio"}]}}/>

                    <WoodInput InputField={{
                        name: "min",
                        label: "Inventario minimo",
                        placeholder: "EJ: 10",
                        type:"number"}}/>

                    <WoodInput InputField={{
                        name: "current",
                        label: "Inventario actual",
                        placeholder: "EJ: 20",
                        disabled: (payloadUpdate !== null),
                        type:"number"}}/>

                    {
                        (payloadUpdate !== null)?(
                            <WoodInput InputField={{
                                name: "entry",
                                label: "Entrada:",
                                placeholder: "EJ: 20",
                                type:"number"}}/>
                        ):(<></>)
                    }


                    <WoodInput InputField={{
                        name: "max",
                        label: "Inventario máximo",
                        placeholder: "EJ: 30",
                        type:"number"}}/>

                    <WoodInput InputField={{
                        name: "price",
                        label: "Precio",
                        placeholder: "EJ: 95.49",
                        type:"number"}}/>

                    <Layout className={"bg-transparent w-full flex flex-row justify-end align-middle gap-2 mt-5"}>
                        <Button type={"default"} onClick={() => onClose()}>
                            Cancelar
                        </Button>

                        {(payloadUpdate === null)?(
                            <Button type={"primary"} htmlType={"submit"} loading={isLoading}>
                                Guardar
                            </Button>
                        ):(
                            <Button type={"primary"} htmlType={"submit"} loading={isLoading}>
                                Actualizar
                            </Button>
                        )}
                    </Layout>
                </Form>
            </Layout>
        </Modal>
    );
}