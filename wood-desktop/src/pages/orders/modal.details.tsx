import {Input, Layout, Modal, Space, Table, Tag, Typography} from "antd";
import moment from "moment/moment";

export const ModalDetails = ({ isOpen, handleClose, data}) => {

    const onClose = () => {
        handleClose();
    };

    const calcTotal = (details:any = []) => {
        let total = 0;

        details.forEach((item) => {
            total += Number(item.subTotal.toString());
        })

        return total;
    }

    return (
        <Modal title={"Detalles de compra"}
               onClose={onClose}
               onCancel={onClose}
               footer={null}
               width={800}
               open={isOpen}>

            <Space.Compact className={"w-full mb-4"}>
                <Input addonBefore="Cliente: " value={data?.customerName} disabled={true}/>
            </Space.Compact>
            <Space.Compact className={"w-full mb-4"}>
                <Input addonBefore="Teléfono: " value={data?.phone} disabled={true}/>
            </Space.Compact>

            <Layout className={"w-full my-4 flex flex-row justify-between align-middle bg-transparent"}>
                <Typography.Text className={"font-bold"}>
                    Fecha de solicitud:
                    <Tag color={"blue"} className={"mx-2.5"}>
                        {moment(data?.dateSaved).format("YYYY-MM-DD HH:mm")}
                    </Tag>
                </Typography.Text>
                <Typography.Text className={"font-bold"}>
                    Status:
                    <Tag color={"orange"} className={"mx-2.5"}>
                        {data?.status}
                    </Tag>
                </Typography.Text>
            </Layout>

            <Layout className={"bg-transparent"}>
                <Table dataSource={data?.details} bordered={true} pagination={{ pageSize: 5}}>
                    <Table.Column title={"Producto"}
                                  render={(_, record) => (
                                      <Typography.Text>
                                          {record["product"]} ({record["measurement"]})
                                      </Typography.Text>
                                  )}/>

                    <Table.Column title={"Cantidad"}
                                  dataIndex={"quantity"}
                                  align={"right"}/>

                    <Table.Column title={"Precio (Unidad)"}
                                  align={"right"}
                                  render={(_, record) => (
                                      <Typography.Text>
                                          ${record["price"]} MXN
                                      </Typography.Text>
                                  )}/>

                    <Table.Column title={"SubTotal"}
                                  align={"right"}
                                  render={(_, record) => (
                                      <Typography.Text>
                                          ${record["subTotal"]} MXN
                                      </Typography.Text>
                                  )}/>
                </Table>
            </Layout>

            <Layout className={"w-full my-4 flex flex-row justify-end align-middle bg-transparent"}>
                <Typography.Text className={"font-bold"}>
                    Total:
                    <Tag color={"green"} className={"mx-2.5 text-2xl"}>
                        ${calcTotal(data?.details).toFixed(2)} MXN
                    </Tag>
                </Typography.Text>
            </Layout>

        </Modal>
    );
}