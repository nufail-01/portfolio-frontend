const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/contacts`

export const submitContactForm = async ({ name, email, message }) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit contact form')
  }

  return data
}