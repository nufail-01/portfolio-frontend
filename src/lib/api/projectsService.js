// const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/projects`

// export const fetchProjects = async () => {
//   const response = await fetch(API_BASE)
//   const data = await response.json()

//   if (!response.ok || !data.success) {
//     throw new Error('Failed to fetch projects')
//   }

//   return data.projects || []
// }

// src/lib/api/projectsService.js
const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/projects`

export const fetchProjects = async () => {
  const response = await fetch(API_BASE)
  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error('Failed to fetch projects')
  }

  return (data.projects || []).map((project) => ({
    ...project,
    id: project.id || project._id,
  }))
}