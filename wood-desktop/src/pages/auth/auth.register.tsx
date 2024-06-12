import {Button, Card, Layout, Typography} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
import {useNavigate} from "react-router-dom";


export const AuthRegisterPage = () => {

    const navigate = useNavigate();

    return (
        <Layout className={"w-full flex flex-col justify-center align-middle"} style={{height: "100vh"}}>
            <Card className={"m-auto relative animate__animated animate__fadeInLeft"} style={{width: 450}}>
                <Layout className={"w-full bg-transparent py-2 flex flex-row justify-center align-middle mb-3"}>
                    <Typography.Title level={4}>
                        Registro de usuario
                    </Typography.Title>
                </Layout>

                <Layout className={"w-full bg-transparent bg-red flex justify-start align-middle"} style={{width: "100%"}}>
                    <WoodInput InputField={{
                        name: "name",
                        label: "Nombre",
                        placeholder: "ej: Kevin Preciado",
                    }}/>

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

                    <WoodInput InputField={{
                        name: "passwordConfirm",
                        label: "Confirmar contraseña:",
                        type: "password",
                        placeholder: "*******"
                    }}/>

                </Layout>

                <Button type={"primary"} size={"large"} block={true} onClick={() => navigate("/auth/login")}>
                    Registrar
                </Button>
            </Card>
        </Layout>
    );
}