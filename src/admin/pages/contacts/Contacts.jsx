import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../../lib/contacts/contactService";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      setError(error.message || "Unable to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this message?");
    if (!confirmed) return;

    try {
      await deleteContact(id);
      setContacts((current) => current.filter((c) => c._id !== id));
    } catch (error) {
      alert(error.message || "Unable to delete contact");
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Communication
          </p>

          <h1 className="font-display text-3xl font-bold text-text-primary">
            Contacts
          </h1>

          <p className="mt-2 font-mono text-sm text-text-muted">
            View messages submitted through your portfolio.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-border bg-bg/50">
              <tr>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Sender
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Email
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Message
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Date
                </th>
                <th className="px-6 py-4 text-left font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Time
                </th>
                <th className="px-6 py-4 text-right font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center font-mono text-sm text-text-muted"
                  >
                    Loading messages...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center font-mono text-sm text-text-muted"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>
                      </div>

                      <div>
                        <p className="font-display text-base font-semibold text-text-primary">
                          No messages yet
                        </p>
                        <p className="mt-1 text-xs text-text-muted/70">
                          Contact submissions will show up here
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="transition-colors duration-200 hover:bg-bg/50"
                  >
                    <td className="px-6 py-5 text-sm font-medium text-text-primary">
                      {contact.name}
                    </td>

                    <td className="px-6 py-5 text-sm text-text-muted">
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-accent"
                      >
                        {contact.email}
                      </a>
                    </td>

                    <td className="px-6 py-5 max-w-sm">
                      <p className="truncate text-sm text-text-muted">
                        {contact.message}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-text-muted">
                      {formatDate(contact.createdAt)}
                    </td>

                    <td className="px-6 py-5 text-sm text-text-muted">
                      {formatTime(contact.createdAt)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="rounded-xl px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
