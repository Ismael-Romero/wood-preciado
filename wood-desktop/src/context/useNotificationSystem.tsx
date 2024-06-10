
import {createContext, useContext} from "react";
import {notification} from "antd";

const NotificationSystemContext = createContext(null);

/**
 * @function useNotificationSystem
 * @description Custom hook to access the notifications context.
 * @returns {Object} Object with functions for displaying notifications.
 */
export const useNotificationSystem = () => {
    return useContext(NotificationSystemContext);
}

/**
 * @component NotificationSystemContextProvider
 * @description Context provider that wraps components needing access to notifications.
 * @param {Object} children - Child components to be wrapped by this provider.
 * @returns {JSX.Element} JSX that provides the context and notification functions to child components.
 */
export const NotificationSystemContextProvider = ({children}) => {
    const [api, contextHolder] = notification.useNotification();

    /**
     * @function openNotificationError
     * @description Opens an error notification.
     * @param {string} description - Description of the error.
     */
    const openNotificationError = (description) => {
        api["error"]({
            message: "Error de proceso",
            placement: "topRight",
            description,
        });
    };

    /**
     * @function openNotificationSuccess
     * @description Opens a success notification.
     * @param {string} description - Description of the success.
     */
    const openNotificationSuccess = (description) => {
        api["success"]({
            message: "Operación completada exitosamente",
            placement: "topRight",
            description,
        });
    };

    /**
     * @function openNotificationInformation
     * @description Opens an information notification.
     * @param {string} description - Description of the information.
     */
    const openNotificationInformation = (description) => {
        api["info"]({
            message: "Información",
            placement: "topRight",
            description,
        });
    };

    const defaultReloading = {
        openNotificationError,
        openNotificationSuccess,
        openNotificationInformation
    };

    return (
        <NotificationSystemContext.Provider value={defaultReloading}>
            {contextHolder}
            {children}
        </NotificationSystemContext.Provider>
    );
}
