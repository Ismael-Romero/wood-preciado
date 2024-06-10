// @ts-ignore
import logo from "../../../assets/images/logo.svg";
import {useNavigate} from "react-router-dom";

export const SidebarLayout = () => {

    const navigate = useNavigate();

    const NavItem = ({label, route}) => {
        return (
            <li>
               <a onClick={() => navigate(route)} className={'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 hover:cursor-pointer dark:bg-neutral-700 dark:text-white'}>
                   { label }
               </a>
            </li>
        );
    }

    return (
        <div id="application-sidebar" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-[260px] hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700">
            <div className="px-8 pt-4">
                <a className="flex flex-row align-middle justify-center">
                    <img src={logo} alt={""} width={120} height={60}/>
                </a>
            </div>

            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open="">
                <ul className="space-y-1.5">
                    <NavItem label={'Dashboard'} route={'/'}/>
                    <NavItem label={'Inventario'} route={'/stock'}/>
                    <NavItem label={'Ordenes'} route={'/orders'}/>
                </ul>
            </nav>
        </div>
    );
};