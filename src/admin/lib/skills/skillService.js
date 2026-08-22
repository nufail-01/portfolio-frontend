const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/skills`

export const getSkills = async () => {
  const response = await fetch(API_BASE, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to fetch skills')
  }
  return data.skills || []
}

export const createSkill = async (skill) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(skill),
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to create skill')
  }
  return data
}

export const updateSkill = async (id, skill) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(skill),
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to update skill')
  }
  return data
}

export const deleteSkill = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to delete skill')
  }
  return data
}