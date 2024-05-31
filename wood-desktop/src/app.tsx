import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "preline/preline";
import { IStaticMethods } from "preline/preline";

import "./assets/css/main.css";
import {AppRouter} from "./router/router.tsx";

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


    return <AppRouter/>;
}

export default App;
