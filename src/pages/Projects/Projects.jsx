import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { projects } from '../../data/projects'
import styles from './Projects.module.css'

// Projects page - maps over projects array and passes data to ProjectCard via props
function Projects() {
  return (
    <div className="page-wrapper">
      <div className="section-heading">
        <h2>Projects</h2>
      </div>

      <div className={styles.list}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            shortDesc={project.shortDesc}
            tech={project.tech}
            link={project.link}
            github={project.github}
            year={project.year}
            status={project.status}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
