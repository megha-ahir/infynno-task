import React from 'react';

import Image from 'next/image';
import logo from '@/assets/Logo.png'
import menu from '@/assets/icons/menu.png'

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="lg:hidden flex items-center justify-between p-4 bg-black text-white fixed z-40 w-full">
            <button onClick={toggleSidebar} className="menu-button">
                <Image src={menu} alt="LOGO" height={22} width={22} />
            </button>
            <div className="logo-container flex-grow flex justify-center">
                <Image src={logo} alt="LOGO" height={32} width={140} />
            </div>
        </header>
    );
};

export default Header;

