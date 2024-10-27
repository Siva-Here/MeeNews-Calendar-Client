import { ChevronFirst, LogOut, Menu } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(window.innerWidth > 768); // Sidebar closed by default on small screens
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Track mobile view

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth <= 768;
            setIsMobileView(mobileView);
            setExpanded(!mobileView); // Expand sidebar on larger screens, collapse on mobile
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload();
    };

    const toggleSidebar = () => {
        setExpanded((prev) => !prev); // Toggle sidebar only for mobile
    };

    return (
        <>
            {/* Off-canvas toggle button for mobile view */}
            {isMobileView && !expanded && (
                <button onClick={toggleSidebar} className="p-2 fixed top-4 left-4 z-50 bg-gray-100 rounded-full shadow-lg">
                    <Menu size={24} />
                </button>
            )}

            <aside className={`fixed z-40 h-screen transition-transform duration-300 ${expanded ? 'translate-x-0' : '-translate-x-full'} ${isMobileView ? 'w-64' : 'w-64'} bg-white border-r shadow-sm md:static md:w-64`}>
                <nav className="h-screen flex flex-col">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src="/meeNews.png" className={`transition-all ${expanded ? "w-24" : "w-0"} overflow-hidden`} />
                        {isMobileView && (
                            <button onClick={toggleSidebar} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                                <ChevronFirst />
                            </button>
                        )}
                    </div>

                    <SidebarContext.Provider value={{ expanded, toggleSidebar, isMobileView }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3 mb-[800px] border-b">
                        <img src="/meeNews.png" className="w-auto h-5 rounded-md" />
                        <div className={`flex items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className="ms-auto cursor-pointer" onClick={handleLogOut}>
                                <LogOut />
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export function SidebarItem({ icon, text, active }) {
    const { expanded, toggleSidebar, isMobileView } = useContext(SidebarContext);

    const handleClick = () => {
        if (isMobileView) {
            toggleSidebar(); // Close sidebar on mobile when a link is clicked
        }
    };

    return (
        <li
            onClick={handleClick} // Close sidebar on click for mobile
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
                active && !isMobileView ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"
            }`}
        >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {/* Only show the hover popup tooltip on larger screens */}
            {!expanded && !isMobileView && (
                <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {text}
                </div>
            )}
        </li>
    );
}