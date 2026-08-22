const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/skills`

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Engineering', 'Tools']

export const fetchSkills = async () => {
  const response = await fetch(API_BASE)
  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error('Failed to fetch skills')
  }

  const grouped = {}
  data.skills.forEach((skill) => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = []
    }
    grouped[skill.category].push(skill.name)
  })

  const categories = Object.entries(grouped).map(([title, skills]) => ({ title, skills }))

  categories.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a.title)
    const indexB = CATEGORY_ORDER.indexOf(b.title)

    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title)
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })

  return categories
}