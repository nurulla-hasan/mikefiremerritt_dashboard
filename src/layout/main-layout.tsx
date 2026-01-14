
import Sidebar from "@/components/common/sidebar";
import Topbar from "@/components/common/topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-sidebar">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col">
                <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <ScrollArea
                    className="flex-1 p-4 mt-20 min-h-[calc(100vh-80px)] lg:rounded-tl-xl bg-card lg:ml-64"
                    onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
                    <Outlet />
                </ScrollArea>
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
        </div>
    );
};

export default MainLayout;