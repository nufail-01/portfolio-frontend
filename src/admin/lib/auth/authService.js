const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/admin`

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Invalid email or password.')
  }

  return data.admin
}

export const logoutAdmin = async () => {
  await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export const getCurrentAdmin = async () => {
  try {
    const response = await fetch(`${API_BASE}/me`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.admin || null
  } catch (error) {
    return null
  }
}