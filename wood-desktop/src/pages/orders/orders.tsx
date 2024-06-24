import {useEffect, useState} from "react";
import {Button, Card, Layout, Popconfirm, Table, Tag, Typography} from "antd";
import {
    CheckOutlined,
    EyeOutlined,
    TruckOutlined
} from "@ant-design/icons";
import {ModalOrders} from "./modal.orders.tsx";
import {useNotificationSystem} from "../../context/useNotificationSystem.tsx";
import {apiGetOrders, apiUpdateStatus} from "./orders.api.tsx";
import moment from "moment/moment";
import {ModalDetails} from "./modal.details.tsx";


export const OrdersPage = () => {
    const {openNotificationSuccess, openNotificationError} = useNotificationSystem();
    const [observerChanges, setObserverChanges] = useState(0);
    const [isModalOpenOrders, setIsModalOpenOrders] = useState(false);
    const [isModalOpenShowDetails, setIsModalOpenShowDetails] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const [tableOrders, setTableOrders] = useState([]);
    const [dataModalDetails, setDataModalDetails] = useState(null);

    const modalStateMap = {
        orders: setIsModalOpenOrders,
        details: setIsModalOpenShowDetails
    };

    const showModal = (modal: string) => {
        setIsModalOpenOrders(false);
        setIsModalOpenShowDetails(false);

        modalStateMap[modal](true);
    };

    const setDataDetails = (record:any) => {
        setDataModalDetails(record);
        showModal("details");
    }

    const closeModal = (modal:string) => {
        setDataModalDetails(null);
        modalStateMap[modal](false);
    };

    const handleObserverChanges = (change) => {
        setObserverChanges(observerChanges + change);
    };

    const getOrders = () => {
        setIsLoadingTable(true);
        apiGetOrders().then((response) => {
            let tempData = [];
            // @ts-ignore
            response.data.data.forEach((stock, index) => {
                tempData.push({
                    ...stock,
                    key: index
                })
            })
            setTableOrders(tempData);
            setIsLoadingTable(false);
        }).catch((error) => {
            setIsLoadingTable(false);
            openNotificationError(error.toString());
        });
    }

    const calcTotal = (record) => {

        let total = 0;

        record.details.forEach((item) => {
            total += Number(item.subTotal.toString());
        })

        return total;
    }

    const updateStatus = (status:number, orderID:any) => {
        setIsLoadingStatus(true);
        apiUpdateStatus({
            orderID: orderID,
            statusID: status,
        }).then((response) => {

            if (response.status != 200){
                setIsLoadingStatus(false);
                // @ts-ignore
                openNotificationError(response.statusText);
                return;
            }

            setIsLoadingStatus(false);
            getOrders();
            openNotificationSuccess("Estado actualizado de manera correcta")
        }).catch((error) => {
            setIsLoadingStatus(false);
            openNotificationError(error.toString());
        })
    }

    const paintStatus = (status:number) => {
        if (status == 1){
            return "red";
        }else if (status == 2){
            return "blue";
        }else {
            return "green";
        }
    }

    useEffect(() => {
        getOrders();
    }, [observerChanges])

    return (
        <Layout className={"bg-transparent"}>
            <ModalOrders isOpen={isModalOpenOrders}
                         handleClose={() => closeModal("orders")}
                         observer={observerChanges}
                         handleObserver={handleObserverChanges}/>

            <ModalDetails isOpen={isModalOpenShowDetails}
                          handleClose={() => closeModal("details")}
                          data={dataModalDetails}/>

            <Layout className={"bg-transparent flex flex-row justify-start align-middle gap-2 mb-5"}>
                <Button type={"primary"} onClick={() => showModal("orders")}>
                    Nuevo orden
                </Button>
            </Layout>
            <Layout className={"bg-transparent py-2"}>
                <Card title={"Ordenes"}>
                    <Table bordered={true} dataSource={tableOrders} pagination={{ pageSize: 15}} loading={isLoadingTable}>
                        <Table.Column title={"Fecha de solicitud"}
                                      sorter={(a, b) => a["dateSaved"].length - b["dateSaved"].length}
                                      sortDirections={['descend']}
                                      dataIndex={"dateSaved"}
                                      render={(_, record) => (
                                          <>
                                              {moment(record["dateSaved"]).format("YYYY-MM-DD HH:mm")}
                                          </>
                                      )}/>
                        <Table.Column title={"Cliente"}
                                      dataIndex={"customerName"}/>

                        <Table.Column title={"Total"}
                                      align={"right"}
                                      render={(_, record) => (
                                          <Typography.Text>
                                              ${ calcTotal(record).toFixed(2) } MXN
                                          </Typography.Text>
                                      )}/>
                        <Table.Column title={"Estado"}
                                      sorter={(a, b) => a["status"].length - b["status"].length}
                                      sortDirections={['descend']}
                                      align={"center"}
                                      render={(_, record) => (
                                          <Tag color={paintStatus(record["statusID"])}>
                                              {record["status"]}
                                          </Tag>
                                      )}/>

                        <Table.Column title={"Acciones"}
                                      dataIndex={"productID"}
                                      align={"center"}
                                      width={150}
                                      render={(_, record) => (

                                          <Layout className={"bg-transparent flex flex-row justify-center align-middle gap-2"}>
                                              <Button type={"default"}
                                                      htmlType={"button"}
                                                      loading={false}
                                                      onClick={() => {setDataDetails(record)}}>
                                                  <EyeOutlined />
                                              </Button>
                                              <Popconfirm
                                                  title="Solicitud de confirmación"
                                                  description="¿Estás seguro de confirmar esta orden?"
                                                  okText="Sí"
                                                  cancelText="No"
                                                  onConfirm={() => { updateStatus(2, record["orderID"])}}>
                                                  <Button type={"primary"}
                                                          htmlType={"button"}
                                                          disabled={(record["statusID"] === 2 ||record["statusID"] === 3)}
                                                          loading={isLoadingStatus}>
                                                      <CheckOutlined />
                                                  </Button>
                                              </Popconfirm>
                                              <Popconfirm
                                                  title="Confirmación de entrega"
                                                  description="¿Estás seguro de marcar esta orden como entregada?"
                                                  okText="Sí"
                                                  cancelText="No"
                                                  onConfirm={() => {updateStatus(3,  record["orderID"])}}>
                                                  <Button type={"dashed"}
                                                          htmlType={"button"}
                                                          disabled={record["statusID"] === 3}
                                                          loading={isLoadingStatus}>
                                                      <TruckOutlined />
                                                  </Button>
                                              </Popconfirm>
                                          </Layout>
                                      )}/>
                    </Table>
                </Card>
            </Layout>
        </Layout>
    );
};