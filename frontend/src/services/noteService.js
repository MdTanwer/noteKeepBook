import api from "./api";

const noteService = {
  // Get all notes
  getAllNotes: async (groupId = null) => {
    try {
      const url = groupId ? `/notes?groupId=${groupId}` : "/notes";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  // Get a single note
  getNote: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching note ${id}:`, error);
      throw error;
    }
  },

  // Create a new note
  createNote: async (noteData) => {
    try {
      const response = await api.post("/notes", noteData);
      return response.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  // Update a note
  updateNote: async (id, noteData) => {
    try {
      const response = await api.patch(`/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error(`Error updating note ${id}:`, error);
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting note ${id}:`, error);
      throw error;
    }
  },
};

export default noteService;
