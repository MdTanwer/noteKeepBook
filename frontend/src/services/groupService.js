import api from "./api";

const groupService = {
  // Get all groups
  getAllGroups: async () => {
    try {
      const response = await api.get("/groups");
      return response.data;
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  },

  // Get a single group
  getGroup: async (id) => {
    try {
      const response = await api.get(`/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching group ${id}:`, error);
      throw error;
    }
  },

  // Create a new group
  createGroup: async (groupData) => {
    try {
      const response = await api.post("/groups", groupData);
      return response.data;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  },

  // Update a group
  updateGroup: async (id, groupData) => {
    try {
      const response = await api.patch(`/groups/${id}`, groupData);
      return response.data;
    } catch (error) {
      console.error(`Error updating group ${id}:`, error);
      throw error;
    }
  },

  // Delete a group
  deleteGroup: async (id) => {
    try {
      const response = await api.delete(`/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting group ${id}:`, error);
      throw error;
    }
  },
};

export default groupService;
