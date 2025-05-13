import { formatDistance } from "date-fns";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formattedDate = note.updatedAt
    ? formatDistance(new Date(note.updatedAt), new Date(), { addSuffix: true })
    : "";

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(note._id);
  };

  return (
    <div
      className="note-card"
      onClick={handleEdit}
      style={{ borderTopColor: note.color || "#4f46e5" }}
    >
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
      </div>
      <div className="note-content">{note.content}</div>
      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>
      </div>
      <div className="note-actions">
        <button className="note-action-btn" onClick={handleEdit}>
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
        <button className="note-action-btn" onClick={handleDelete}>
          <span role="img" aria-label="delete">
            🗑️
          </span>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
