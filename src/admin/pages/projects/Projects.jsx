import { useEffect, useState } from 'react'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../lib/projects/projectService'
import Modal from '../../components/ui/Modal'
import ProjectForm from '../../components/projects/ProjectForm'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      setError(error.message || 'Unable to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmed) return

    try {
      await deleteProject(id)

      setProjects((current) =>
        current.filter((project) => project._id !== id)
      )
    } catch (error) {
      alert(error.message || 'Unable to delete project')
    }
  }

  const openAddModal = () => {
    setEditingProject(null)
    setModalOpen(true)
  }

  const openEditModal = (project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingProject(null)
  }

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitting(true)

      if (editingProject) {
        await updateProject(editingProject._id, formData)
      } else {
        await createProject(formData)
      }

      closeModal()
      await loadProjects()
    } catch (error) {
      alert(error.message || 'Unable to save project')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Portfolio
          </p>

          <h1 className="font-display text-3xl font-bold text-text-primary">
            Projects
          </h1>

          <p className="mt-2 font-mono text-sm text-text-muted">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
        >
          + Add Project
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-border bg-bg/50">
              <tr>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Project
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Category
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Year
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Status
                </th>
                <th className="px-6 py-4 text-right font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center font-mono text-sm text-text-muted">
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center font-mono text-sm text-text-muted">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project._id}
                    className="transition-colors duration-200 hover:bg-bg/50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 overflow-hidden rounded-xl bg-border">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center font-mono text-xs text-text-muted/70">
                              No image
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-text-primary">
                            {project.title}
                          </p>
                          <p className="mt-1 max-w-sm truncate font-mono text-xs text-text-muted/70">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-text-muted">
                      {project.category || '—'}
                    </td>

                    <td className="px-6 py-5 text-sm text-text-muted">
                      {project.year || '—'}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === 'published'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        {project.status || 'published'}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="rounded-xl px-3 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(project._id)}
                          className="rounded-xl px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal
          title={editingProject ? 'Edit Project' : 'Add Project'}
          onClose={closeModal}
        >
          <ProjectForm
            initialData={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            submitting={submitting}
          />
        </Modal>
      )}
    </div>
  )
}

export default Projects