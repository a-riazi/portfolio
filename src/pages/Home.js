import React from 'react';
import AboutMe from '../components/AboutMe';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data';
import './Home.css';

const Home = () => (
  <div className="home">
    <AboutMe />
    <section>
      <h2>Academic Projects</h2>
      <div className="project-list">
        {projects.academic.map(project => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
    <section>
      <h2>Personal Projects</h2>
      <div className="project-list">
        {projects.personal.map(project => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
    <section>
      <h2>Professional Projects</h2>
      <div className="project-list">
        {projects.professional.map(project => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  </div>
);

export default Home;
