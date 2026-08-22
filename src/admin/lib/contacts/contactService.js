const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/contacts`

export const getContacts = async () => {
  const response = await fetch(API_BASE, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to fetch contacts')
  }
  return data.contacts || []
}

export const deleteContact = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Unable to delete contact')
  }
  return data
}