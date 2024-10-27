import { ChevronFirst, ChevronLast, MoreVertical, LogOut } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(window.innerWidth > 768); // Expanded based on initial screen size

    useEffect(() => {
        const handleResize = () => {
            setExpanded(window.innerWidth > 768); // Collapse on mobile
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <aside className={`h-screen transition-width duration-300 ${expanded ? 'w-64' : 'w-16'} bg-white border-r shadow-sm md:w-64 sm:w-48`}>
                <nav className="h-screen flex flex-col">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src="/meeNews.png" className={`transition-all ${expanded ? "w-24" : "w-0"} overflow-hidden`} />
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3 mb-[800px] border-b">
                        <img src="/meeNews.png" className="w-auto h-5 rounded-md" />
                        {/* <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className="ms-auto cursor-pointer"  onClick={handleLogOut}> 
                                <LogOut />
                            </div>
                        </div> */}
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

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
            )}
            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    );
}
