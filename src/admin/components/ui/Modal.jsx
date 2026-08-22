const Modal = ({ title, onClose, children }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-text-primary">
              {title}
            </h2>
  
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-text-muted hover:bg-bg hover:text-text-primary"
            >
              ✕
            </button>
          </div>
  
          {children}
        </div>
      </div>
    )
  }
  
  export default Modal