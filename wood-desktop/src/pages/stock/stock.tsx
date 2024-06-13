import {Button, Card, Layout, Popconfirm, Table, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {apiDeleteStockProduct, apiGetStock} from "./stock.api.tsx";
import {useNotificationSystem} from "../../context/useNotificationSystem.tsx";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

import {ModalProducts} from "./modal.products.tsx";
import {ModalStock} from "./modal.stock.tsx";
import {ModalUnits} from "./modal.units.tsx";
import {ModalWarehouse} from "./modal.warehouse.tsx";

export const StockPage = () => {
    const {openNotificationSuccess, openNotificationError} = useNotificationSystem();
    const [tableStock, setTableStock] = useState([]);

    const [observerChanges, setObserverChanges] = useState(0);
    const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
    const [isModalOpenWarehouse, setIsModalOpenWarehouse] = useState(false);
    const [isModalOpenUnit, setIsModalOpenUnit] = useState(false);
    const [isModalOpenStock, setIsModalOpenStock] = useState(false);

    const [payloadUpdate, setPayloadUpdate] = useState(null);

    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const modalStateMap = {
        product: setIsModalOpenProduct,
        stock: setIsModalOpenStock,
        unit: setIsModalOpenUnit,
        warehouse: setIsModalOpenWarehouse,
    };

    const showModal = (modal: string) => {
        setPayloadUpdate(null);
        setIsModalOpenProduct(false);
        setIsModalOpenStock(false);
        setIsModalOpenUnit(false);
        setIsModalOpenWarehouse(false);
        modalStateMap[modal](true);
    };

    const closeModal = (modal:string) => {
        modalStateMap[modal](false);
    };

    const handleObserverChanges = (change) => {
        setObserverChanges(observerChanges + change);
    };

    const deleteProduct = (id) => {
        setIsDeleting(true);
        apiDeleteStockProduct({
            id: id.toString()
        }).then(response => {

            if (response.status !== 200) {
                setIsDeleting(false);
                openNotificationError(response.statusText);
                return;
            }

            getStock();
            setIsDeleting(false);
            openNotificationSuccess("Product eliminado exitosamente");
        }).catch((error) => {
            setIsDeleting(false);
            openNotificationError(error.toString());
        });
    };

    const setDataModal = (modal, data) => {
        showModal(modal);

        const payload = {
            productID: data.productID,
            product: data.product,
            unit: data.measurementID,
            warehouse: data.warehouseID,
            min: data.min,
            current: data.current,
            max: data.max,
            price: data.price,
        }

        setPayloadUpdate(payload);
    };

    const getStock = () => {
        setIsLoadingTable(true);
        apiGetStock().then((response) => {
            let tempData = [];
            response.data.data.forEach((stock, index) => {
                tempData.push({
                    ...stock,
                    key: index
                })
            })
            setTableStock(tempData);
            setIsLoadingTable(false);
        }).catch((error) => {
            setIsLoadingTable(false);
            openNotificationError(error.toString());
        });
    };

    const isLimitStock = (min, current) => {
        const _min = Number(min.toString());
        const _current = Number(current.toString());
        return _current < _min;
    }

    useEffect(() => {
        getStock();
    }, [observerChanges]);

    return (
        <Layout className={"bg-transparent"}>
                <ModalProducts isOpen={isModalOpenProduct}
                               handleClose={() => closeModal("product")}
                               observer={observerChanges}
                               handleObserver={handleObserverChanges} payloadUpdate={payloadUpdate}/>

                <ModalWarehouse isOpen={isModalOpenWarehouse}
                                handleClose={() => closeModal("warehouse")}
                                handleObserver={handleObserverChanges}/>

                <ModalUnits isOpen={isModalOpenUnit}
                            handleClose={() => closeModal("unit")}
                            handleObserver={handleObserverChanges}/>

                <ModalStock isOpen={isModalOpenStock}
                            handleClose={() => closeModal("stock")}/>

            <Layout className={"bg-transparent flex flex-row justify-start align-middle gap-2 mb-5"}>
                <Button type={"primary"} onClick={() => showModal("product")}>
                    Nuevo producto
                </Button>
                <Button type={"primary"} onClick={() => showModal("warehouse")}>
                    Crear bodega
                </Button>
                <Button type={"primary"} onClick={() => showModal("unit")}>
                    Nueva medida
                </Button>
            </Layout>

            <Layout className={"bg-transparent py-2"}>
                <Card title={"Detalles del inventario"}>
                    <Table bordered={true} dataSource={tableStock} pagination={{ pageSize: 15}} loading={isLoadingTable}>
                        <Table.Column title={"Producto"}
                                      dataIndex={"product"}
                                      align={"left"}
                                      sorter={(a, b) => a["product"].length - b["product"].length}
                                      sortDirections={['descend']}
                                      render={(_, record) => (
                                          <Typography.Text>
                                              {record["product"]} ({record["measurement"]})
                                          </Typography.Text>
                                      )}/>

                        <Table.Column title={"Precio"}
                                      dataIndex={"price"}
                                      align={"left"}/>

                        <Table.Column title={"Bodega"}
                                      dataIndex={"warehouse"}
                                      sorter={(a, b) => a["warehouse"].length - b["warehouse"].length}
                                      sortDirections={['descend']}
                                      align={"left"}/>

                        <Table.Column title={"Min"}
                                      dataIndex={"min"}
                                      align={"center"}
                                      render={(_, record) => (
                                          <Tag color={"blue"}>
                                              {record["min"]}
                                          </Tag>
                                      )}/>

                        <Table.Column title={"Actual"}
                                      dataIndex={"current"}
                                      align={"center"}
                                      render={(_, record) => (
                                          <Tag color={ isLimitStock(record["min"], record["current"])? "red" : "green" }>
                                              {record["current"]}
                                          </Tag>
                                      )}/>

                        <Table.Column title={"Max"}
                                      dataIndex={"max"}
                                      align={"center"}
                                      render={(_, record) => (
                                          <Tag color={"blue"}>
                                              {record["max"]}
                                          </Tag>
                                      )}/>

                        <Table.Column title={"Acciones"}
                                      dataIndex={"productID"}
                                      align={"left"}
                                      render={(_, record) => (
                                          <Layout className={"bg-transparent flex flex-row justify-center align-middle gap-2"}>
                                              <Popconfirm
                                                  title="Eliminación detectada"
                                                  description="¿Estás seguro de borrar este producto?"
                                                  okText="Sí"
                                                  cancelText="No"
                                                  onConfirm={() => deleteProduct(record["productID"])}>
                                                  <Button type={"primary"}
                                                          htmlType={"button"}
                                                          danger={true}
                                                          loading={isDeleting}>
                                                      <DeleteOutlined />
                                                  </Button>
                                              </Popconfirm>
                                              <Button type={"primary"}
                                                      htmlType={"button"}
                                                      onClick={() => setDataModal("product", record)} >
                                                  <EditOutlined />
                                              </Button>
                                          </Layout>
                                      )}/>
                    </Table>
                </Card>
            </Layout>
        </Layout>
    );
};
