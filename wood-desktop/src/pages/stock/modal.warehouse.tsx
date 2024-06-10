import {Button, Form, Layout, Modal} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
import {apiAddWarehouse} from "./stock.api.tsx";
import {useNotificationSystem} from "../../context/useNotificationSystem.tsx";
import {useState} from "react";

export const ModalWarehouse = ({ isOpen, handleClose, handleObserver }) => {
    const {openNotificationSuccess, openNotificationError} = useNotificationSystem();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onClose = () => {
        handleClose();
    };

    const onCancel = () => {
        handleClose();
    };

    const resetForm = () => {
        form.resetFields();
    }

    const saveWarehouse = (values) => {
        setIsLoading(true);
        apiAddWarehouse({
            warehouse: values.warehouse.toString(),
            address: values.address.toString(),
            phone: values.phone.toString(),
        }).then((response) => {
            if (response.status !== 200){
                openNotificationError(response.statusText);
                setIsLoading(false);
                return;
            }

            handleObserver(1);
            resetForm();
            openNotificationSuccess("La bodega se agrego a la lista. Ya puedes utilizarla");
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            openNotificationError(error.toString());
        })
    };

    return (
        <Modal title={"Bodegas"}
               open={isOpen}
               onClose={onClose}
               onCancel={onCancel}
               footer={null}>
            <Layout className={"bg-transparent"}>
                <Form onFinish={saveWarehouse} form={form}>
                    <WoodInput InputField={{
                        name: "warehouse",
                        label: "Nombre de la bodega",
                        rules: [{
                            required:true,
                            message:"El campo es obligatorio"
                        }]}
                    }/>
                    <WoodInput InputField={{name: "address", label: "Dirección"}}/>
                    <WoodInput InputField={{name: "phone", label: "Teléfono"}}/>

                    <Layout className={"bg-transparent w-full flex flex-row justify-end align-middle gap-2 mt-5"}>
                        <Button type={"default"} onClick={() => onClose()}>
                            Cancelar
                        </Button>
                        <Button type={"primary"} htmlType={"submit"} loading={isLoading}>
                            Guardar
                        </Button>
                    </Layout>
                </Form>
            </Layout>
        </Modal>
    );
}