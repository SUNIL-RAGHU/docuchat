import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  // State to track mouse position during dragging
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Function to handle mouse down event
  const handleMouseDown = (e) => {
    setDragging(true);
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Function to handle mouse move event
  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      setPos({ x: e.clientX, y: e.clientY });
      // Adjust form position based on mouse movement
      document.getElementById('form-container').style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', pdfFile);

    try {
      await axios.post('/api/projects', formData);
      alert('Project created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create project');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black-800 to-indigo-900"
         onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div id="form-container" className="bg-gray-300 p-8 rounded-lg shadow-lg"
           onMouseDown={handleMouseDown}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Project 🏆</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent h-32 resize-none bg-white"
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
            >
            Create Project
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline">Back</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
