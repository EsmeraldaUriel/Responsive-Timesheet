import React, { useContext, useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { UserContext } from '../context/UserContext'; // Import UserContext
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { ChevronRight, ChevronLeft } from '@mui/icons-material'; // Import the icons

function Home({ children }) {
  const { theme } = useTheme(); // Get the current theme from ThemeContext
  const { currentUserId } = useContext(UserContext); // Get currentUserId from UserContext
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

  // Define background colors based on the current theme
  const sidebarBgColor = theme === 'light' ? '#DBEDFF' : '#1F2937';
  const mainContentBgColor = theme === 'light' ? '#F0F8FF' : '#1a202c';

  return (
    <main className="flex h-screen w-full">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="w-[17%] h-full fixed" style={{ backgroundColor: sidebarBgColor }}>
          <SideBar />
          <button
            className="absolute top-2 right-[-12px] z-50 p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-700 text-white rounded-full"
            onClick={() => setIsSidebarVisible(false)}
          >
            <ChevronLeft className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl" />
          </button>
        </div>
      )}
      
      {/* Toggle Button */}
      {!isSidebarVisible && (
        <button
          className="fixed top-2 left-1 z-50 p-1 sm:p-2 md:p-3 lg:p-4 bg-gray-700 text-white rounded-full"
          onClick={() => setIsSidebarVisible(true)}
        >
          <ChevronRight className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl" />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex flex-col ${isSidebarVisible ? 'w-[83%] ml-[17%]' : 'w-full ml-0'}`}>
        <TopBar currentUserId={currentUserId} />
        <div className="p-4 h-full overflow-auto" style={{ backgroundColor: mainContentBgColor }}>
          {children}
        </div>
      </div>
    </main>
  );
}

export default Home;