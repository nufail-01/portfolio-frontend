import { useEffect, useState, useMemo } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../lib/skills/skillService";
import Modal from "../../components/ui/Modal";
import SkillForm from "../../components/skills/SkillForm";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      setError(error.message || "Unable to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const grouped = useMemo(() => {
    const map = {};
    skills.forEach((skill) => {
      if (!map[skill.category]) map[skill.category] = [];
      map[skill.category].push(skill);
    });
    return map;
  }, [skills]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this skill?");
    if (!confirmed) return;

    try {
      await deleteSkill(id);
      setSkills((current) => current.filter((s) => s._id !== id));
    } catch (error) {
      alert(error.message || "Unable to delete skill");
    }
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSkill(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (editingSkill) {
        await updateSkill(editingSkill._id, formData);
      } else {
        await createSkill(formData);
      }

      closeModal();
      await loadSkills();
    } catch (error) {
      alert(error.message || "Unable to save skill");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Portfolio
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-text-primary">
            Skills
          </h1>
          <p className="mt-2 font-mono text-sm text-text-muted">
            Manage the tech stack shown on your portfolio.
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
          onClick={openAddModal}
        >
          + Add Skill
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <p className="font-mono text-sm text-text-muted">Loading skills...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div
              key={category}
              className="rounded-2xl border border-border bg-surface/60 p-6"
            >
              <h2 className="font-display text-lg text-text-primary">
                {category}
              </h2>

              <div className="mt-4 space-y-2">
                {items.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between rounded-lg border border-border bg-bg px-4 py-2.5"
                  >
                    <span className="text-sm text-text-primary">
                      {skill.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(skill)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-accent hover:bg-accent/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal
          title={editingSkill ? "Edit Skill" : "Add Skill"}
          onClose={closeModal}
        >
          <SkillForm
            initialData={editingSkill}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
            submitting={submitting}
          />
        </Modal>
      )}
    </div>
  );
};

export default Skills;
