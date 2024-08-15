"use client"

import { ReactNode, useState } from 'react'
import './globals.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Sidebar from './Sidebar/page';
import Header from './Header/page';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className="background-theme ">
          <div className="flex">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className={`flex-1 flex flex-col ${isSidebarOpen && "lg:ml-64"}`}>
              <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
              <main className="">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html >
    </QueryClientProvider>
  )
}
