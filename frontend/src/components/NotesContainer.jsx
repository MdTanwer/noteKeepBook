import { useState, useEffect } from "react";
import { useNotes } from "../contexts/NoteContext";
import Modal from "./Modal";

const NotesContainer = ({ onBackClick }) => {
  const {
    notes,
    loading,
    currentGroup,
    groups,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  // State for notes display
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    color: "#4F46E5",
    groupId: "",
  });
  const [newNoteText, setNewNoteText] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check for mobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenEditNoteModal = (note) => {
    setSelectedNote(note);
    setNoteForm({
      title: note.title,
      content: note.content,
      color: note.color,
      groupId: note.groupId,
    });
    setIsEditNoteModalOpen(true);
  };

  const colorOptions = [
    "#4F46E5", // Indigo
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#3B82F6", // Blue
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#6366F1", // Indigo
  ];

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (noteForm.title.trim() && noteForm.content.trim() && selectedNote) {
      await updateNote(selectedNote._id, noteForm);
      setIsEditNoteModalOpen(false);
    }
  };

  const handleSubmitNewNote = async () => {
    if (newNoteText.trim() && currentGroup) {
      await createNote({
        title: getCurrentGroupName(),
        content: newNoteText.trim(),
        color: "#4F46E5",
        groupId: currentGroup,
      });
      setNewNoteText("");
    }
  };

  const getCurrentGroupName = () => {
    if (!currentGroup) return "All Notes";
    const group = groups.find((g) => g._id === currentGroup);
    return group ? group.name : "All Notes";
  };

  // Format date for display
  const formatNoteDate = (date) => {
    if (!date) return "";
    const noteDate = new Date(date);

    // Format: "8 Mar 2023"
    const day = noteDate.getDate();
    const month = noteDate.toLocaleString("default", { month: "short" });
    const year = noteDate.getFullYear();

    // Format: "10:15 AM"
    const timeString = noteDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${day} ${month} ${year}  •  ${timeString}`;
  };

  // If no group is selected, show the welcome screen
  if (!currentGroup) {
    return (
      <div className="main-content welcome-screen">
        <div className="welcome-content">
          <img
            src="https://res.cloudinary.com/techuniqueiit/image/upload/v1747053431/2099334_-_Edited_kt2psa.png"
            alt="Notes illustration"
            className="welcome-illustration"
          />
          <h1 className="welcome-title">Pocket Notes</h1>
          <p className="welcome-text">
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <div className="encryption-notice">
            <span className="lock-icon">🔒</span> end-to-end encrypted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="main-header">
        <div className="group-header">
          {isMobile && onBackClick && (
            <button
              className="back-button"
              onClick={onBackClick}
              aria-label="Back to groups"
            >
              ←
            </button>
          )}
          <div
            className="group-avatar header-avatar"
            style={{
              backgroundColor:
                groups.find((g) => g._id === currentGroup)?.color || "#3B82F6",
            }}
          >
            {getCurrentGroupName().substring(0, 2).toUpperCase()}
          </div>
          <h2 className="header-title">{getCurrentGroupName()}</h2>
        </div>
      </div>

      <div className="notes-container">
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <div key={note._id} className="note-item">
                <div className="note-content">{note.content}</div>
                <div className="note-actions">
                  <button
                    className="note-edit-btn"
                    onClick={() => handleOpenEditNoteModal(note)}
                    aria-label="Edit note"
                  >
                    ✎
                  </button>
                  <button
                    className="note-delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this note?"
                        )
                      ) {
                        deleteNote(note._id);
                      }
                    }}
                    aria-label="Delete note"
                  >
                    🗑️
                  </button>
                </div>
                <div className="note-timestamp">
                  {formatNoteDate(note.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="note-input-container">
        <div className="note-input-wrapper">
          <textarea
            rows={10}
            className="note-input"
            placeholder="Enter your text here..........."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          ></textarea>
          <button
            className={`send-button ${!newNoteText.trim() ? "disabled" : ""}`}
            onClick={handleSubmitNewNote}
            disabled={!newNoteText.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Note Modal */}
      <Modal
        isOpen={isEditNoteModalOpen}
        onClose={() => setIsEditNoteModalOpen(false)}
        title="Edit Note"
        footer={
          <>
            <button
              className="btn secondary-btn"
              onClick={() => setIsEditNoteModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn primary-btn" onClick={handleUpdateNote}>
              Update
            </button>
          </>
        }
      >
        <form onSubmit={handleUpdateNote}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={noteForm.title}
              onChange={(e) =>
                setNoteForm({ ...noteForm, title: e.target.value })
              }
              placeholder="Enter note title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-textarea"
              value={noteForm.content}
              onChange={(e) =>
                setNoteForm({ ...noteForm, content: e.target.value })
              }
              placeholder="Enter note content"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-options">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    noteForm.color === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNoteForm({ ...noteForm, color })}
                ></div>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NotesContainer;
