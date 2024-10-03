import React, { useState } from 'react';
import { useProjects, formatDate } from '../context/ProjectContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon from Material Icons

const ProjectCard = ({ id, logo, project_title, project_created, assigned_to, progress, link, color }) => {
  const { theme } = useTheme();
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode

  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const bgColor = theme === 'light' ? 'bg-gray-100' : 'bg-gray-800';
  const progressBarColor = theme === 'light' ? 'bg-slate-700' : 'bg-slate-400';

  const cardBgColor = theme === 'dark' ? 'bg-gray-800' : color;

  const handleProgressChange = async (newProgress) => {
    setCurrentProgress(newProgress);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}project/${id}`,
        { acf: { progress: newProgress } },
        {
          headers: {
            'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_AUTH_USERNAME}:${import.meta.env.VITE_AUTH_PASSWORD}`),
          },
        }
      );
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={`relative flex flex-col md:flex-row items-center rounded-lg p-4 shadow-md ${bgColor}`} style={{ backgroundColor: cardBgColor }}>
      <button 
        onClick={toggleEditMode} 
        className="absolute top-2 right-2 p-2 text-blue rounded hover:bg-blue-200 flex items-center"
      >
        <EditIcon />
      </button>
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full mr-4 mb-4 md:mb-0">
        <img src={logo} alt="Project Icon" className="w-20 h-20 sm:w-28 sm:h-28 md:w-30 md:h-30" />
      </div>

      <div className="flex-grow">
        <h3 className={`text-[14px] sm:text-[16px] md:text-[18px] font-semibold ${textColor}`}>{project_title}</h3>
        <p className={`text-[12px] sm:text-[14px] md:text-[16px] ${textColor}`}>{formatDate(project_created)}</p>
        <p className={`text-[10px] sm:text-[12px] md:text-[14px] ${textColor}`}>Assigned: {Array.isArray(assigned_to) ? assigned_to.join(', ') : assigned_to}</p>
        <a href={link} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Project</a>
        <div className="flex flex-col sm:flex-row items-center mt-4">
          <div className={`w-full bg-gray-300 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} flex items-center mb-2 sm:mb-0`}>
            <div
              className={`text-xs font-medium text-white ${progressBarColor} text-left p-1.5 leading-none rounded-full`}
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
          <div className={`font-bold ${textColor} sm:ml-4 md:ml-6`}>{currentProgress}%</div>
        </div>
        {isEditing && (
          <input
            type="range"
            min="0"
            max="100"
            value={currentProgress}
            onChange={(e) => handleProgressChange(e.target.value)}
            className="mt-4 w-full md:w-3/4"
          />
        )}
      </div>
    </div>
  );
};

const ProjectList = () => {
  const { projects, userTeams } = useProjects();

  const filteredProjects = projects.filter((project) => {
    if (Array.isArray(project.assigned_to)) {
      return project.assigned_to.some((team) => userTeams.includes(team));
    } else {
      return userTeams.includes(project.assigned_to);
    }
  });

  return (
    <div className="space-y-4">
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          logo={project.logo}
          project_title={project.project_title}
          project_created={project.project_created}
          assigned_to={project.assigned_to}
          progress={project.progress}
          link={project.link}
          color={project.color}
        />
      ))}
    </div>
  );
};

export default ProjectList;