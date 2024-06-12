import {Button, Card, Layout, Typography} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
// @ts-ignore
import logo from "../../assets/images/logo.svg";
import {useNavigate} from "react-router-dom";
import {useSession} from "../../context/useSession.tsx";

export const AuthPage = () => {

    // @ts-ignore
    const {changeSession} = useSession();
    const navigate = useNavigate();

    return (
        <Layout className={"w-full flex flex-col justify-center align-middle"} style={{height: "100vh"}}>
            <Card className={"m-auto relative animate__animated animate__fadeInLeft"} style={{width: 450}}>
                <Layout className={"w-full bg-transparent py-2 flex flex-row justify-center align-middle mb-3"}>
                    <div className="px-8 pt-4">
                        <a className="flex flex-row align-middle justify-center">
                            <img src={logo} alt={""} width={120} height={60}/>
                        </a>
                    </div>
                </Layout>
                <Layout className={"w-full bg-transparent py-2 flex flex-row justify-center align-middle mb-3"}>
                    <Typography.Title level={4}>
                        Inicio de Sesión
                    </Typography.Title>
                </Layout>
                <Layout className={"w-full bg-transparent bg-red flex justify-start align-middle"} style={{width: "100%"}}>
                    <WoodInput InputField={{
                        name: "username",
                        label: "Correo electrónico",
                        placeholder: "ej: jhon@gmail.com",
                    }}/>
                    <WoodInput InputField={{
                        name: "password",
                        label: "Contraseña:",
                        type: "password",
                        placeholder: "*******"
                    }}/>
                </Layout>

                <Layout className={"w-full bg-transparent flex flex-row justify-between align-middle mb-5"}>
                    <Typography.Text>

                    </Typography.Text>
                    <Typography.Link onClick={() => navigate("/auth/register")}>
                        Registrar usuario
                    </Typography.Link>
                </Layout>

                <Button type={"primary"}
                        size={"large"}
                        block={true}
                        onClick={() => {
                            changeSession({status: "Authenticated"})
                        }}>
                    Ingresar
                </Button>
            </Card>
        </Layout>
    );
}