import { useState, useEffect } from "react";
import { useNotes } from "../contexts/NoteContext";
import Modal from "./Modal";

const Sidebar = ({ onSelectGroup }) => {
  const { groups, currentGroup, fetchNotes, createGroup } = useNotes();

  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [groupForm, setGroupForm] = useState({ name: "", color: "#3B82F6" });
  const [formError, setFormError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("show");
  };

  const colorOptions = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#06B6D4", // Cyan
  ];

  const handleSelectGroup = (groupId) => {
    fetchNotes(groupId);
    // Call the parent component's onSelectGroup if it exists
    if (onSelectGroup && typeof onSelectGroup === "function") {
      onSelectGroup();
    }
  };

  const openAddGroupModal = () => {
    setGroupForm({ name: "", color: "#3B82F6" });
    setFormError("");
    setIsAddGroupModalOpen(true);
  };

  const validateGroupName = (name) => {
    if (!name.trim()) {
      return "Group name cannot be empty";
    }
    if (name.length < 3) {
      return "Group name must be at least 3 characters";
    }
    if (name.length > 30) {
      return "Group name cannot exceed 30 characters";
    }
    return "";
  };

  const handleSubmitGroup = async (e) => {
    e.preventDefault();
    const error = validateGroupName(groupForm.name);
    if (error) {
      setFormError(error);
      return;
    }

    try {
      await createGroup(groupForm);
      setIsAddGroupModalOpen(false);
      setFormError("");
    } catch (error) {
      setFormError("Failed to create group");
      console.error("Create group error:", error);
    }
  };

  // Get initials for group avatars
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="app-title">Pocket Notes</h1>
        {isMobile && (
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            ✕
          </button>
        )}
      </div>

      <div className="groups-list">
        {groups.map((group) => (
          <div
            key={group._id}
            className={`group-item ${
              currentGroup === group._id ? "active" : ""
            }`}
            onClick={() => handleSelectGroup(group._id)}
          >
            <div
              className="group-avatar"
              style={{ backgroundColor: group.color }}
            >
              {getInitials(group.name)}
            </div>
            <div className="group-name">{group.name}</div>
          </div>
        ))}
      </div>

      <div className="add-btn-container">
        <button className="add-btn" onClick={openAddGroupModal}>
          +
        </button>
      </div>

      {/* Add Group Modal */}
      <Modal
        isOpen={isAddGroupModalOpen}
        onClose={() => {
          setIsAddGroupModalOpen(false);
          setFormError("");
        }}
        title="Create New Group"
        footer={
          <>
            <button
              className="btn secondary-btn"
              onClick={() => {
                setIsAddGroupModalOpen(false);
                setFormError("");
              }}
            >
              Cancel
            </button>
            <button className="btn primary-btn" onClick={handleSubmitGroup}>
              Create
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmitGroup}>
          <div className="form-group">
            <label className="form-label">Group Name</label>
            <input
              type="text"
              className="form-input group-input"
              value={groupForm.name}
              onChange={(e) => {
                setGroupForm({ ...groupForm, name: e.target.value });
                if (formError) setFormError(""); // Clear error on typing
              }}
              placeholder="Enter group name"
              required
            />
            {formError && <div className="form-error">{formError}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Choose colour</label>
            <div className="color-options">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    groupForm.color === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setGroupForm({ ...groupForm, color })}
                ></div>
              ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;
