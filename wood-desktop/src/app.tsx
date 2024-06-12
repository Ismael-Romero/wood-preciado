import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import 'animate.css';
import "./assets/css/main.css";
import {AppRouter} from "./router/router.tsx";
import {SessionContextProvider} from "./context/useSession.tsx";

declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

function App() {
    const location = useLocation();

    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [location.pathname]);


    return (
        <SessionContextProvider>
            <AppRouter/>
        </SessionContextProvider>
    );
}

export default App;
