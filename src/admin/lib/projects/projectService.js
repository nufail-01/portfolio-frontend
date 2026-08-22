const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/projects`

export const getProjects = async () => {
  const response = await fetch(API_BASE, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to fetch projects')
  }
  return data.projects || []
}

export const createProject = async (project) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(project),
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to create project')
  }
  return data
}

export const updateProject = async (id, project) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(project),
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to update project')
  }
  return data
}

export const deleteProject = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to delete project')
  }
  return data
}