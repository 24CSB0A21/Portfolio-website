import styles from './About.module.css'

const education = [
  {
    id: 1,
    year: '2024 – Present',
    school: 'National Institute of Technology Warangal',
    degree: 'B.Tech · Computer Science & Engineering',
    score: 'CGPA: 8.04',
  },
  {
    id: 2,
    year: '2024',
    school: 'Sri Chaitanya Junior College',
    degree: 'Intermediate (MPC)',
    score: 'Percentage: 96%',
  },
  {
    id: 3,
    year: '2022',
    school: 'Sri Chaitanya School',
    degree: 'Secondary School Certificate (SSC)',
    score: 'Percentage: 93%',
  },
]

const skills = [
  {
    id: 1,
    category: 'Programming Languages',
    items: ['Java', 'C++', 'Python', 'JavaScript'],
  },
  {
    id: 2,
    category: 'Web Technologies',
    items: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js'],
  },
  {
    id: 3,
    category: 'Databases & Tools',
    items: ['MongoDB', 'MySQL', 'Git', 'GitHub'],
  },
  {
    id: 4,
    category: 'Core CS',
    items: ['DSA', 'OOP', 'OS', 'DBMS', 'SDLC'],
  },
]

const achievements = [
  { id: 1, title: 'AIR 5131',  subtitle: 'JEE Advanced 2024' },
  { id: 2, title: '99.77%',   subtitle: 'JEE Main 2024 Percentile' },
  { id: 3, title: 'Rank 505', subtitle: 'TS EAMCET 2024' },
  { id: 4, title: '1475',     subtitle: 'LeetCode Max Rating' },
  { id: 5, title: '1045',     subtitle: 'CodeForces Max Rating' },
]

function About() {
  return (
    <div className="page-wrapper">

      {/* Education Section */}
      <section className={styles.section}>
        <div className="section-heading">
          <h2>Education</h2>
        </div>
        <div className={styles.eduList}>
          {education.map(edu => (
            <article key={edu.id} className={styles.eduCard}>
              <span className={styles.eduYear}>{edu.year}</span>
              <div className={styles.eduContent}>
                <h3>{edu.school}</h3>
                <h4>{edu.degree}</h4>
                <p>{edu.score}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.section}>
        <div className="section-heading">
          <h2>Technical Skills</h2>
        </div>
        <div className={styles.skillsGrid}>
          {skills.map(group => (
            <div key={group.id} className={styles.skillCategory}>
              <h4>{group.category}</h4>
              <div className={styles.skillTags}>
                {group.items.map(item => (
                  <span key={item} className={styles.skillTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className={styles.section}>
        <div className="section-heading">
          <h2>Achievements</h2>
        </div>
        <div className={styles.achievementGrid}>
          {achievements.map(a => (
            <article key={a.id} className={styles.achievementCard}>
              <h3>{a.title}</h3>
              <p>{a.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}

export default About
