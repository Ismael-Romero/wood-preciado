import {Button, Card, Form, Layout, Typography} from "antd";
import {WoodInput} from "../../components/WoodInput/WoodInput.tsx";
import {useNavigate} from "react-router-dom";
import {apiAuthRegister} from "./auth.api.tsx";
import {useState} from "react";

export const AuthRegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const register = async (values) => {

        setLoading(true);

        if (values.password != values.passwordConfirm) {
            alert("Las contraseñas son diferentes, vuelve a intentarlo")
            setLoading(false);
            return;
        }

        await apiAuthRegister({
            name: values.name.toString(),
            username: values.username.toString(),
            password: values.password.toString(),
        }).then((response) => {
            console.log(response)

            // @ts-ignore
            if(response.data.type != 1){
                setLoading(false);
                alert("Ocurrio un un problema de conexión, por favor vuelve a intentarlo")
                return;
            }

            form.resetFields();
            alert("Usuario registrado")
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            alert("Ocurrio un un problema de conexión, por favor vuelve a intentarlo")
        });
    }


    return (
        <Layout className={"w-full flex flex-col justify-center align-middle"} style={{height: "100vh"}}>
            <Card className={"m-auto relative animate__animated animate__fadeInLeft"} style={{width: 450}}>
                <Layout className={"w-full bg-transparent py-2 flex flex-row justify-center align-middle mb-3"}>
                    <Typography.Title level={4}>
                        Registro de usuario
                    </Typography.Title>
                </Layout>

                <Layout className={"w-full bg-transparent bg-red flex justify-start align-middle"} style={{width: "100%"}}>

                    <Form onFinish={register} form={form}>
                        <WoodInput InputField={{
                            name: "name",
                            label: "Nombre",
                            placeholder: "ej: Kevin Preciado",
                            rules: [{
                                required: true,
                                message: "El campo es obligatorio"
                            }]
                        }}/>

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

                        <WoodInput InputField={{
                            name: "passwordConfirm",
                            label: "Confirmar contraseña:",
                            type: "password",
                            placeholder: "*******",
                            rules: [{
                                required: true,
                                message: "El campo es obligatorio"
                            }]
                        }}/>

                        <Layout className={'w-full flex flex-row justify-between gap-4'}>
                            <Button type={"default"} htmlType={'button'} size={"large"} block={true} onClick={() => navigate("/auth/login")}>
                                Cancelar
                            </Button>
                            <Button type={"primary"} htmlType={'submit'} size={"large"} block={true} disabled={loading} loading={loading}>
                                Registrar
                            </Button>
                        </Layout>
                    </Form>

                </Layout>
            </Card>
        </Layout>
    );
}