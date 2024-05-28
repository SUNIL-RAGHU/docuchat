import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdfFile', pdfFile);

    try {
      const response = await axios.post('http://localhost:8000/api/create-project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response data:', response.data); // Log the response data

      alert('Project created!');
      setTitle('');
      setDescription('');
      setPdfFile(null);
      navigate('/'); // Redirect to the dashboard page
    } catch (err) {
      console.error(err);
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black-800 to-indigo-900">
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Project 🏆</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-black p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent h-32 resize-none bg-white"
            required
          />
          <input
            type="file"
            onChange={(e) => setPdfFile(e.target.files[0])}
            accept="application/pdf"
            className="p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
