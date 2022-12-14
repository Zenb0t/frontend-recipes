import { Outlet } from "react-router-dom";
import { SidebarWithHeader } from "./sidebar";


export function DashboardLayout() {
    return (
        <SidebarWithHeader>
        <Outlet />
      </SidebarWithHeader>
    )
}