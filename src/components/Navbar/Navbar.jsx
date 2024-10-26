import React from 'react';
import { LayoutDashboard, Home, Calendar } from 'lucide-react';
import Sidebar, { SidebarItem } from './Sidebar';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex">
      <Sidebar>
        <NavLink to="/" activeClassName="active">
          <SidebarItem icon={<Home size={20} />} text="Home" />
        </NavLink>
        
        <NavLink to="/dashboard" activeClassName="active">
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        </NavLink>

        <NavLink to="/preview" activeClassName="active">
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
        </NavLink>
      </Sidebar>
    </div>
  );
};

export default Navbar;
