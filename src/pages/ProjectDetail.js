import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data';
import './ProjectDetail.css';

const findProject = (id) => {
  for (const section of Object.values(projects)) {
    const project = section.find(p => p.id === id);
    if (project) return project;
  }
  return null;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = findProject(id);

  if (!project) return <div>Project not found.</div>;

  return (
    <div className="project-detail">
      <img src={project.image} alt={project.title} className="detail-image" />
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {/* Add more details here if needed */}
    </div>
  );
};

export default ProjectDetail;
