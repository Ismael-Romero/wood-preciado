import {createContext, useContext, useEffect} from "react";
import {useLocalStorage} from "./useLocalStorage.jsx";

/**
 * Context object for managing session data.
 * @property {Object} session - Current session data.
 * @property {Function} changeSession - Function to update the session data.
 */
const SessionContext = createContext({});
export const useSession = () => {
    return useContext(SessionContext);
}
/**
 * Provider component for managing session data using the SessionContext.
 * @param {Object} props - Props containing children components.
 * @returns {JSX.Element} - JSX element wrapping the children components with the SessionContext.Provider.
 */
export const SessionContextProvider = ({ children }) => {

    const [session, setSession] = useLocalStorage('session',{
        status: 'NotAuthenticated',
    });

    useEffect(() => {
        window.localStorage.setItem("session", JSON.stringify(session));
    }, [session]);

    const changeSession = (newSession) => {
        setSession(newSession);
    };

    const defaultSession = {
        session,
        changeSession,
    }

    return (
        <SessionContext.Provider value={defaultSession}>
            {children}
        </SessionContext.Provider>
    );
};