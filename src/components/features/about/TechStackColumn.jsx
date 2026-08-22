import SkillTag from '../../ui/tags/SkillTag'

const TechStackColumn = ({ title, skills }) => {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-text-muted">
        {title.toUpperCase()}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillTag key={skill}>{skill}</SkillTag>
        ))}
      </div>
    </div>
  )
}

export default TechStackColumn