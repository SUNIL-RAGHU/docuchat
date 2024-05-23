import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isDummyProjectsVisible, setDummyProjectsVisible] = useState(false);

  useEffect(() => {
    // Fetch projects from API
    async function fetchProjects() {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    fetchProjects();
  }, []);

  const toggleDummyProjects = () => {
    setDummyProjectsVisible(!isDummyProjectsVisible);
  };

  // Function to add dummy projects
  const addDummyProjects = () => {
    toggleDummyProjects();
    // Create an array of dummy projects
    const dummyProjects = [
      { id: 1, title: 'Dummy Project 1', description: 'This is a dummy project.', status: 'created' },
      { id: 2, title: 'Dummy Project 2', description: 'Another dummy project.', status: 'failed' },
      { id: 3, title: 'Dummy Project 3', description: 'Yet another dummy project.', status: 'in progress' }
    ];
    // Update the projects state with the dummy projects
    setProjects(dummyProjects);
  };

  // Render the Dashboard component
  return (
    <div className="max-w-4xl mx-auto p-8 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects <span role="img" aria-label="Emoji">📋</span></h1>
        <Link to="/create" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">+ Add Project</Link>
      </div>
      <button onClick={addDummyProjects} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400">{isDummyProjectsVisible ? 'Hide Projects' : 'View Projects'}</button>
      {isDummyProjectsVisible && (
        <div className="flex flex-wrap -mx-4 mt-4">
          {projects.map((project) => (
            <div key={project.id} className="w-1/3 px-4 mb-4">
              <div className="bg-gray-300 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-black ">{project.title}</h2>
                <p>{project.description}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                    project.status === 'created'
                      ? 'bg-green-200 text-green-800'
                      : project.status === 'failed'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {project.status}
                </span>
                <div className="mt-4">
                  <Link to={`/chat/${project.id}`} className="text-blue-500 hover:underline">Chat</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
