import {Button, Form, Layout, Modal} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
import {apiAddUnit} from "./stock.api.tsx";
import {useNotificationSystem} from "../../context/useNotificationSystem.tsx";
import {useState} from "react";

export const ModalUnits = ({ isOpen, handleClose, handleObserver}) => {

    const {openNotificationSuccess, openNotificationError} = useNotificationSystem();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onClose = () => {
        resetForm();
        handleClose();
    };

    const resetForm = () => {
        form.resetFields();
    }

    const saveUnit = (values) => {
        setIsLoading(true);
        apiAddUnit({
            unit: values.unit.toString(),
        }).then((response) => {

            if(response.status !== 200){
                // @ts-ignore
                openNotificationError(response.statusText);
                setIsLoading(false);
                return;
            }

            openNotificationSuccess("La unidad de medida se agrego a la lista. Ya puedes utilizarla");
            resetForm();
            handleObserver(1);
            setIsLoading(false);

        }).catch((error) => {
            setIsLoading(false);
            openNotificationError(error.toString());
        })
    };

    return (
        <Modal title={"Medidas"}
               open={isOpen}
               onClose={onClose}
               onCancel={onClose}
               footer={null}>
            <Form onFinish={saveUnit} form={form}>
                <WoodInput InputField={{
                    name: "unit",
                    label: "Unidad de medida",
                    rules: [{required:true, message:"El campo es obligatorio"}]}
                }/>
                <Layout className={"bg-transparent w-full flex flex-row justify-end align-middle gap-2 mt-5"}>
                    <Button type={"default"} onClick={() => onClose()}>
                        Cancelar
                    </Button>
                    <Button type={"primary"} htmlType={"submit"} loading={isLoading}>
                        Guardar
                    </Button>
                </Layout>
            </Form>
        </Modal>
    );
}