import {Button, Divider, Form, Input, Layout, Modal, Select, Space} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
import {useNotificationSystem} from "../../context/useNotificationSystem.tsx";
import {useEffect, useState} from "react";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {apiGetStock} from "../stock/stock.api.tsx";
import {apiAddOrder} from "./orders.api.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const ModalOrders = ({ isOpen, handleClose, observer, handleObserver}) => {

    const {openNotificationSuccess, openNotificationError} = useNotificationSystem();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [productSelectedList, setProductSelectedList] = useState([]);
    const [selectedProductPrices, setSelectedProductPrices] = useState([]); // Array de precios de productos seleccionados

    const onClose = () => {
        resetForm();
        handleClose();
    };

    const resetForm = () => {
        form.resetFields();
    }

    const getStock = () => {
        apiGetStock().then((response) => {

            let data = JSON.parse(response.toString()).data;

            let productList = [];
            let productSelectedList = [];
            data.forEach((stock, index) => {
                productList.push({
                    ...stock,
                    key: index
                })
            })

            productList.forEach((i) => {
                productSelectedList.push({
                    value: i.productID,
                    label: `${i.product} (${i.measurement})`,
                });
            });

            setProductList(productList);
            setProductSelectedList(productSelectedList);
        }).catch((error) => {
            openNotificationError(error.toString());
        });
    };

    const buildBodyRequest = (data:any) => {

        let listItems = [];

        data.shoppingList.forEach((item) => {

            let price = Number(productList.find((i) => i.productID === item.productID)?.price);
            let quantity = Number(item.quantity.toString());

            listItems.push({
                id: item.productID,
                quantity: quantity,
                price: price,
                subTotal: price * quantity,
            });
        })

        return {
            customer: data.customer,
            phone: data.phone,
            items: listItems
        };
    }

    const saveOrder = (values) => {
        setIsLoading(true);
        apiAddOrder(buildBodyRequest(values)).then((response) => {

            if (response.status !== 200){
                openNotificationError(error.toString());
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            handleObserver(1);
            openNotificationSuccess("Orden guardada exitosamente");
        }).catch((error) => {
            setIsLoading(false);
            openNotificationError(error.toString());
        });
    };

    const handleProductSelect = (value, _option, index) => {
        const selectedProduct = productList.find((product) => product.productID === value);
        if (selectedProduct) {
            const newPrices = [...selectedProductPrices];
            newPrices[index] = selectedProduct.price;
            setSelectedProductPrices(newPrices);
        }
    };

    useEffect(() => {
        getStock();
    }, [observer])

    return (
        <Modal title={"Ordenes"}
               open={isOpen}
               onClose={onClose}
               onCancel={onClose}
               width={600}
               footer={null}>
            <Form onFinish={saveOrder} form={form}>
                <WoodInput InputField={{
                    name: "customer",
                    label: "Nombre del cliente",
                    rules: [{required:true, message:"El campo es obligatorio"}]}
                }/>
                <WoodInput InputField={{
                    name: "phone",
                    label: "Teléfono"
                }}/>
                <Divider>
                    Detalles de compra
                </Divider>
                <Form.List name="shoppingList">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({key, name, ...restField }, index) => (
                                <Space key={key} style={{ display: 'flex',  marginBottom: 8, }} align="baseline">
                                    <Form.Item {...restField}
                                               name={[name, "productID"]}
                                               rules={[{
                                                   required: true,
                                                   message: "Por favor selecciona una producto",
                                               }]}>
                                        <Select placeholder={"Selecciona un producto"}
                                                disabled={false}
                                                onChange={(value, option) =>
                                                    handleProductSelect(value, option, index)
                                                }
                                                options={productSelectedList} />
                                    </Form.Item>
                                    <Form.Item {...restField} style={{width: 100}}
                                               name={[name, 'quantity']}
                                               rules={[{
                                                   required: true,
                                                   message: 'Por favor ingresa una cantidad valida',
                                               }]}>
                                        <Input placeholder="Cantidad" type={"number"}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input
                                            value={selectedProductPrices[index]}
                                            disabled
                                            prefix="$"
                                            suffix="MXN C/U"
                                            style={{ width: 150 }}
                                        />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Añadir producto
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

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