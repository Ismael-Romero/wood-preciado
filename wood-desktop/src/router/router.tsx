import {Navigate, Route, Routes} from "react-router-dom";
import {AppRoutes, AuthRoutes} from "./router.routes.jsx";
import {useSession} from "../context/useSession.tsx";

export const AppRouter = () => {

    const status = "Authenticated";
    // @ts-ignore
    const {session} = useSession();

    return (
            <Routes>
                {
                    (status === session.status)
                        ? <Route path={'/*'} element={ <AppRoutes/> }/>
                        : <Route path={'/auth/*'} element={ <AuthRoutes/> }/>
                }
                <Route path={'/*'} element={ <Navigate to={'/auth/login'}/> }/>
            </Routes>
    );
}