import {NotificationSystemContextProvider} from "../../../context/useNotificationSystem.tsx";

export const ContentLayout = ({children}) => {
    return (
        <NotificationSystemContextProvider>
            <div className="relative w-full h-full lg:ps-64" style={{height: "100vh"}}>
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-100">
                    {children}
                </div>
            </div>
        </NotificationSystemContextProvider>
    );
}