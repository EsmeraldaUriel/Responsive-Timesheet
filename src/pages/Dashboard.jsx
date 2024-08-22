import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home'; 
import ZoomCard from '../components/ZoomCard';
import ProjectCard from '../components/ProjectCard';
import Calendar from '../components/Calendar';
import NotificationCard from '../components/NotificationCard'; 


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}task`, {
          auth: {
            username: import.meta.env.VITE_AUTH_USERNAME,
            password: import.meta.env.VITE_AUTH_PASSWORD
          }
        });
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };
  
  // Generate notifications from tasks
  const notifications = tasks.map(task => ({
    message: `NEW POST: ${  task.acf.task_description}`,
    date: task.acf.date_created,
    action: 'Check'
  }));


  if (error) return <p>Error: {error}</p>;

  return (
    <Home>
      <div className="flex flex-grow mt-4 gap-10">
        {/* Left Column (Zoom and Project Cards) */}
        <div className="w-2/3 space-y-4">
          <ZoomCard />
          <div className="text-[20px] font-bold">
            <h1>Ongoing Projects</h1>
          </div>
          <ProjectCard />
        </div>

        {/* Right Column (Calendar and Notification Cards) */}
        <div className="w-1/3 space-y-4">
          <Calendar currentMonth={new Date()} />
          <NotificationCard notifications={notifications} /> {/* Pass dynamically generated notifications */}
        </div>
      </div>
    </Home>
  );
};

export default Dashboard;
