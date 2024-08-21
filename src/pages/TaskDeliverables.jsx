import React, { useState, useEffect } from 'react';
import Home from './Home'; // Import the Home component
import TaskCard from '../components/TaskCard'; // Import the TaskCard component
import IssuesCard from '../components/IssuesCard'; // Import the IssuesCard component
import ArchiveCard from '../components/ArchiveCard'; // Import the ArchiveCard component


const TaskDeliverables = () => {
  const [activeTab, setActiveTab] = useState('Task');


  const renderTabContent = () => {
    switch (activeTab) {
      case 'Task':
        return <TaskCard />;
      case 'Issues':
        return <IssuesCard />;
      case 'Archive':
        return <ArchiveCard />;
      default:
        return null;
    }
  };

  return (
    <Home>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Task Deliverables</h1>
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'Task' ? 'bg-white shadow-md' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setActiveTab('Task')}
          >
            Task
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'Issues' ? 'bg-white shadow-md' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setActiveTab('Issues')}
          >
            Issues
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors ${
              activeTab === 'Archive' ? 'bg-white shadow-md' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setActiveTab('Archive')}
          >
            Archive
          </button>
        </div>
        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Home>
  );
};

export default TaskDeliverables;
