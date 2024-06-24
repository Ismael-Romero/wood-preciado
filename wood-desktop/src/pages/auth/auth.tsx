import {Button, Card, Form, Layout, Typography} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
// @ts-ignore
import logo from "../../assets/images/logo.svg";
import {useNavigate} from "react-router-dom";
import {useSession} from "../../context/useSession.tsx";
import {apiAuthLogin} from "./auth.api.tsx";
import {useState} from "react";

export const AuthPage = () => {

    // @ts-ignore
    const {changeSession} = useSession();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const login = async (values) => {

        setLoading(true);
        apiAuthLogin({
            username: values.username,
            password: values.password,
        }).then((response) => {


            // @ts-ignore
            if (response.data.type != 1){
                setLoading(false);
                alert("Ocurrio un un problema de conexión, por favor vuelve a intentarlo");
                return;
            }

            // @ts-ignore
            if(response.data.login[0].login === 0){
                setLoading(false);
                alert("Usuario o contraseña incorrectos");
                return;
            }

            setLoading(false);
            changeSession({status: "Authenticated"})
        }).catch(() => {
            setLoading(false);
            alert("Ocurrio un un problema de conexión, por favor vuelve a intentarlo")
        })
    }

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
                <Form onFinish={login} form={form}>
                    <Layout className={"w-full bg-transparent bg-red flex justify-start align-middle"} style={{width: "100%"}}>
                        <WoodInput InputField={{
                            name: "username",
                            label: "Correo electrónico",
                            placeholder: "ej: jhon@gmail.com",
                            rules: [{
                                required: true,
                                message: "El campo es obligatorio"
                            }]
                        }}/>
                        <WoodInput InputField={{
                            name: "password",
                            label: "Contraseña:",
                            type: "password",
                            placeholder: "*******",
                            rules: [{
                                required: true,
                                message: "El campo es obligatorio"
                            }]
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
                            loading={loading}
                            disabled={loading}
                            htmlType={"submit"}>
                        Ingresar
                    </Button>
                </Form>
            </Card>
        </Layout>
    );
}