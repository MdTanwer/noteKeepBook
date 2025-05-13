import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import noteService from "../services/noteService";
import groupService from "../services/groupService";

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  // Fetch notes and groups when component mounts
  useEffect(() => {
    fetchNotes();
    fetchGroups();
  }, []);

  // Fetch notes
  const fetchNotes = async (groupId = null) => {
    try {
      setLoading(true);
      const response = await noteService.getAllNotes(groupId);
      setNotes(response.data);

      if (groupId) {
        setCurrentGroup(groupId);
      } else {
        setCurrentGroup(null);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch groups
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await groupService.getAllGroups();
      setGroups(response.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
      toast.error("Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const createNote = async (noteData) => {
    try {
      setLoading(true);
      const response = await noteService.createNote(noteData);

      setNotes((prevNotes) => [...prevNotes, response.data]);
      toast.success("Note created successfully");
      return response.data;
    } catch (err) {
      console.error("Error creating note:", err);
      toast.error("Failed to create note");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a note
  const updateNote = async (id, noteData) => {
    try {
      setLoading(true);
      const response = await noteService.updateNote(id, noteData);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? response.data : note))
      );

      toast.success("Note updated successfully");
      return response.data;
    } catch (err) {
      console.error("Error updating note:", err);
      toast.error("Failed to update note");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await noteService.deleteNote(id);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
      return true;
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Failed to delete note");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Create a new group
  const createGroup = async (groupData) => {
    try {
      setLoading(true);
      const response = await groupService.createGroup(groupData);

      setGroups((prevGroups) => [...prevGroups, response.data]);
      toast.success("Group created successfully");
      return response.data;
    } catch (err) {
      console.error("Error creating group:", err);
      toast.error("Failed to create group");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a group
  const updateGroup = async (id, groupData) => {
    try {
      setLoading(true);
      const response = await groupService.updateGroup(id, groupData);

      setGroups((prevGroups) =>
        prevGroups.map((group) => (group._id === id ? response.data : group))
      );

      toast.success("Group updated successfully");
      return response.data;
    } catch (err) {
      console.error("Error updating group:", err);
      toast.error("Failed to update group");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a group
  const deleteGroup = async (id) => {
    try {
      setLoading(true);
      await groupService.deleteGroup(id);

      setGroups((prevGroups) => prevGroups.filter((group) => group._id !== id));

      // If we deleted the current group, fetch all notes
      if (currentGroup === id) {
        setCurrentGroup(null);
        fetchNotes();
      }

      toast.success("Group deleted successfully");
      return true;
    } catch (err) {
      console.error("Error deleting group:", err);
      toast.error("Failed to delete group");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    notes,
    groups,
    loading,
    currentGroup,
    fetchNotes,
    fetchGroups,
    createNote,
    updateNote,
    deleteNote,
    createGroup,
    updateGroup,
    deleteGroup,
    setCurrentGroup,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteContext;
