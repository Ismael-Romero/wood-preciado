import {Card, Layout, Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";


export const DashboardPage = () => {
    return (
        <Layout className={"bg-transparent"}>
            <Layout className={"w-full flex flex-row flex-wrap gap-4"}>
                <Card style={{width: "auto"}}>
                    <Statistic title="Ventas acumuladas"
                               valueStyle={{
                                   color: 'green',
                               }}
                               precision={2}
                               prefix={<ArrowUpOutlined />}
                               suffix={"MXN"}
                               value={120} />
                </Card>
                <Card style={{width: 215}}>
                    <Statistic title="Ventas pendientes"
                               valueStyle={{
                                   color: 'blue',
                               }}
                               precision={2}
                               prefix={<ArrowDownOutlined />}
                               value={5} />
                </Card>
                <Card style={{width: 215}}>
                    <Statistic title="Ventas confirmadas"
                               valueStyle={{
                                   color: 'blue',
                               }}
                               precision={2}
                               prefix={<ArrowDownOutlined />}
                               value={12} />
                </Card>
                <Card style={{width: 215}}>
                    <Statistic title="Ventas entregadas"
                               valueStyle={{
                                   color: 'blue',
                               }}
                               precision={2}
                               prefix={<ArrowDownOutlined />}
                               value={12} />
                </Card>
                <Card style={{width: 215}}>
                    <Statistic title="Salidas de inventario"
                               valueStyle={{
                                   color: 'red',
                               }}
                               precision={2}
                               prefix={<ArrowDownOutlined />}
                               value={120} />
                </Card>
            </Layout>


        </Layout>
    );
};