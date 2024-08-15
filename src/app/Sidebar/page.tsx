import React, { useState } from 'react';
import Image from 'next/image';

import styles from './Sidebar.module.css'
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {

    const pathname = usePathname()
    const router = useRouter()
    const [activeMenu, setActiveMenu] = useState(pathname)

    const handleMenuClick = (path: string) => {
        setActiveMenu(path)
        router.push(path)
    }

    const [theme, setTheme] = useState('light');

    return (
        <aside className={`fixed lg:static lg:max-h-[97vh] top-0 left-0 w-60 background-card  text-white h-screen transform z-50 rounded-lg mt-3 lg:ms-3 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="flex justify-between items-center p-3">
                <div className="logo-container flex-grow flex justify-center py-3">
                    <Image src={require('@/assets/Logo.png')} alt="LOGO" height={107} width={150} />
                </div>
                <Button onClick={closeSidebar} className="lg:hidden bg-transperent">
                    <Image src={require('@/assets/icons/close.png')} alt="LOGO" height={24} width={24} />
                </Button>
            </div>
            <div className={styles.searchContainer}>
                <Image
                    src={require('@/assets/icons/search.png')}
                    alt="Search"
                    width={24}
                    height={24}
                    className={styles.searchIcon} />
                <Input
                    type="text"
                    placeholder="Search"
                    className={`${styles.searchInput} tab rounded-xl`} />
            </div>
            <div className="max-h-[66vh] overflow-y-scroll scrollbar-none text-sm">
                <ul className="mt-4">
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/')}
                    >
                        <Image src={require('@/assets/icons/home.svg')} alt="Home" width={20} height={20} className={styles.menuIcon} />
                        <a>Home</a>
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/leaderboard' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/leaderboard')}
                    >
                        <Image src={require('@/assets/icons/users.svg')} alt="Leader board" width={20} height={20} className={styles.menuIcon} />
                        <a>Leader board</a>
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/ground' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/ground')}
                    >
                        <Image src={require('@/assets/icons/speaker1.svg')} alt="Ground" width={20} height={20} className={styles.menuIcon} />
                        <a>Ground</a>
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/chat' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/chat')}
                    >
                        <Image src={require('@/assets/icons/message-circle.svg')} alt="Chat" width={20} height={20} className={styles.menuIcon} />
                        <a>Chat</a>
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/notifications' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/notifications')}
                    >
                        <Image src={require('@/assets/icons/bell.svg')} alt="Notification" width={20} height={20} className={styles.menuIcon} />
                        <a>Notification</a>
                    </li>
                </ul>
                <div className='px-6 py-3 '>
                    <Separator />
                </div>

                <ul className="mt-4">
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/followedTeam' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/team')}
                    >
                        <Image src={require('@/assets/icons/shield.svg')} alt="Home" width={20} height={20} className={styles.menuIcon} />
                        <a className='flex items-center justify-between w-full'>followed team <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 11L6.5 6L1.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> </a>

                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/followedPlayers' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/followedPlayers')}
                    >
                        <Image src={require('@/assets/icons/users.svg')} alt="Leader board" width={20} height={20} className={styles.menuIcon} />
                        <a className='flex items-center justify-between w-full'>followed players<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 11L6.5 6L1.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> </a>
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/followedGround' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/followedGround')}
                    >
                        <Image src={require('@/assets/icons/speaker.svg')} alt="Ground" width={20} height={20} className={styles.menuIcon} />
                        <a className='flex items-center justify-between w-full'>followed ground  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 11L6.5 6L1.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> </a>
                    </li>
                </ul>
                <div className='px-6 py-3'>
                    <Separator />
                </div>
                <ul className="mt-4">
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/settings' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/settings')}
                    >
                        <Image src={require('@/assets/icons/setting.svg')} alt="settings" width={20} height={20} className={styles.menuIcon} />
                        <a>settings</a>
                    </li>
                    <li
                        className={`${styles.menuItem} ${activeMenu === '/leaderboard' ? styles.activeMenuItem : ''}`}
                        onClick={() => handleMenuClick('/leaderboard')}
                    >
                        <Image src={require('@/assets/icons/download.svg')} alt="Leader board" width={20} height={20} className={styles.menuIcon} />
                        <a>Leader board</a>
                    </li>

                </ul>

                <div className='tab flex items-center justify-between p-2 m-3 gap-2 rounded-lg'>
                    <div className={`flex flex-1 items-center p-2 rounded-lg cursor-pointer ${theme === 'light' ? 'background-card' : ''}`} onClick={() => setTheme('light')}>
                        <Image src={require('@/assets/icons/sun.png')} alt="moon" className="me-2 rounded-lg" height={22} width={22} />light
                    </div>
                    <div className={`flex flex-1 items-center p-2 rounded-lg cursor-pointer ${theme === 'dark' ? 'background-card' : ''}`} onClick={() => setTheme('dark')}>
                        <Image src={require('@/assets/icons/moon.png')} alt="moon" className="me-2 rounded-lg" height={22} width={22} />dark</div>
                </div>
            </div>

            <div className='flex items-center justify-between w-full p-2 pb-3 gap-1 absolute bottom-0'>
                <div className='tab flex items-center justify-between rounded-lg px-2'>
                    <Image src={require('@/assets/icons/user.png')} alt="LOGO" className={`${styles.userimage} me-2 rounded-lg`} height={22} width={22} />
                    <span>
                        <h6 className='text-theme text-sm'>varun_kubal</h6>
                        <p className='text-xs'>varun_kubal@gmail.com</p>
                    </span>
                </div>
                <div className='tab rounded-lg p-2'>
                    <Image src={require('@/assets/icons/log-out.png')} alt="LOGO" height={20} width={20} />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
