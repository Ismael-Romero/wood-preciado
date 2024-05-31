import {Navigate, Route, Routes} from "react-router-dom";
import {AppRoutes, AuthRoutes} from "./router.routes.jsx";

export const AppRouter = () => {

    const status = "Authenticated";

    return (
        <Routes>
            {
                (status === 'Authenticated')
                    ? <Route path={'/*'} element={ <AppRoutes/> }/>
                    : <Route path={'/auth/*'} element={ <AuthRoutes/> }/>
            }
            <Route path={'/*'} element={ <Navigate to={'/auth/login'}/> }/>
        </Routes>
    );
}