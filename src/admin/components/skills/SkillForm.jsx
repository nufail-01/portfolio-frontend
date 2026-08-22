import { useState, useEffect } from 'react'

const EMPTY_FORM = {
  category: '',
  name: '',
  display_order: 0,
}

const SkillForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const [formData, setFormData] = useState(EMPTY_FORM)

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || '',
        name: initialData.name || '',
        display_order: initialData.display_order || 0,
      })
    } else {
      setFormData(EMPTY_FORM)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Frontend, Backend, Engineering, Tools..."
          required
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Skill Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="React"
          required
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Display Order
        </label>
        <input
          type="number"
          name="display_order"
          value={formData.display_order}
          onChange={handleChange}
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving...' : 'Save Skill'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border px-5 py-3 text-sm font-mono font-medium text-text-muted transition hover:border-accent/50 hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default SkillForm