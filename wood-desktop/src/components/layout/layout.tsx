import {ContentLayout} from "./content/content.layout.tsx";
import {HeaderLayout} from "./header/header.layout.tsx";
import {SidebarLayout} from "./sidebar/sidebar.layout.tsx";
import {BreadcrumbLayout} from "./breadcrumb/breadcrumb.layout.tsx";

export const MainLayout = ({children}) => {
    return (
        <div>
            <HeaderLayout/>
            <BreadcrumbLayout/>
            <SidebarLayout/>
            <ContentLayout>
                {children}
            </ContentLayout>
        </div>
    );
}