import {Navigate, Route, Routes} from "react-router-dom";
import {MainLayout} from "../components/layout/layout.tsx";
import {DashboardPage} from "../pages/dashboard/dashboard.tsx";
import {AuthPage} from "../pages/auth/auth.tsx";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={'/login'} element={ <AuthPage/> }/>
        </Routes>
    );
}

export const AppRoutes = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path={'/'} element={ <DashboardPage/> }/>
                <Route path={'/stock'} element={ <> Inventario </> }/>
                <Route path={'/orders'} element={ <> Ordenes </> }/>
                <Route path={'/login'} element={ <AuthPage/> }/>
                <Route path={'/*'} element={ <Navigate to={'/'} /> }/>
            </Routes>
        </MainLayout>
    );
}