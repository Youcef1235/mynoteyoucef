import { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotesContext = createContext();

// Priority levels with AZIENDA brand colors
export const PRIORITIES = {
  IMPORTANT: { label: "Important", color: "#F45B69", value: "important" },
  NORMAL: { label: "Normal", color: "#45699D", value: "normal" },
  REMINDER: { label: "Reminder", color: "#7FE4EC", value: "reminder" },
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return { ...state, notes: action.payload, loading: false };
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
    loading: true,
  });

  // Load notes from AsyncStorage on app start
  useEffect(() => {
    loadNotes();
  }, []);

  // Save notes to AsyncStorage whenever notes change
  useEffect(() => {
    if (!state.loading) {
      saveNotes(state.notes);
    }
  }, [state.notes, state.loading]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      dispatch({ type: "LOAD_NOTES", payload: notes });
    } catch (error) {
      console.error("Error loading notes:", error);
      dispatch({ type: "LOAD_NOTES", payload: [] });
    }
  };

  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const addNote = (noteData) => {
    if (!noteData || !noteData.title || !noteData.content || !noteData.priority) return;

    const newNote = {
      id: Date.now().toString(),
      title: noteData.title,
      content: noteData.content,
      priority: noteData.priority,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };

  const updateNote = (noteData) => {
    dispatch({ type: "UPDATE_NOTE", payload: noteData });
  };

  const deleteNote = (noteId) => {
    dispatch({ type: "DELETE_NOTE", payload: noteId });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        loading: state.loading,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
