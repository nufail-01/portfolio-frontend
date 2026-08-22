import { useState, useEffect } from 'react'

const EMPTY_FORM = {
  title: '',
  description: '',
  image: '',
  link: '',
  tags: '',
  category: 'product',
  year: '',
  display_order: 0,
}

const ProjectForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const [formData, setFormData] = useState(EMPTY_FORM)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        image: initialData.image || '',
        link: initialData.link || '',
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(',')
          : initialData.tags || '',
        category: initialData.category || 'product',
        year: initialData.year || '',
        display_order: initialData.display_order || 0,
      })
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
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Image Path
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="/projects/example.png"
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Link
        </label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="React,Node.js,MongoDB"
          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="product">Product</option>
            <option value="client">Client</option>
            <option value="ui">UI</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="2026"
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-sm font-medium text-text-muted">
            Order
          </label>
          <input
            type="number"
            name="display_order"
            value={formData.display_order}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-faint focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving...' : 'Save Project'}
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

export default ProjectForm