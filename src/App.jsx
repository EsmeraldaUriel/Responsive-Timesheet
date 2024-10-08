import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TimeSheet from './pages/TimeSheet'
import Announcement from './pages/Announcement'
import Profile from './pages/Profile'
import TeamTask from './pages/TeamTask'
import TaskDeliverables from './pages/TaskDeliverables'
import Files from './pages/Files'
import 'tailwindcss/tailwind.css'
import Weekly from './components/Weekly'
import Login from './pages/Login'
import { TimesheetProvider } from './context/TimesheetContext'
import { NotificationProvider } from './context/NotificationContext'
import { ProjectProvider } from './context/ProjectContext'
import Settings from './components/Settings'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'



const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <TimesheetProvider>
          <ProjectProvider>
           <UserProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/announcement' element={<Announcement />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/teamtask' element={<TeamTask />} />
                  <Route path='/timesheet' element={<TimeSheet />} />
                  <Route path='/taskdeliverables' element={<TaskDeliverables />} />
                  <Route path='/files' element={<Files />} />
                  <Route path='/weekly' element={<Weekly />} />
                  <Route path='/settings' element={<Settings />} />
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </ProjectProvider>
        </TimesheetProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
