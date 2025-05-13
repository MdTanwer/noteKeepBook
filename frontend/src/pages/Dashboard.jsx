import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NotesContainer from "../components/NotesContainer";
import "../styles/notes.css";
import { Helmet } from "react-helmet";
import { useNotes } from "../contexts/NoteContext";

const Dashboard = () => {
  const { loading } = useNotes();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768;
      setIsDesktop(desktop);

      // Reset views when switching between desktop and mobile
      if (desktop) {
        setShowSidebar(true);
        setShowNotes(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to handle navigation from sidebar to notes view
  const handleSelectGroup = () => {
    if (!isDesktop) {
      setShowSidebar(false);
      setShowNotes(true);
    }
  };

  // Function to handle back navigation from notes to sidebar
  const handleBackToSidebar = () => {
    if (!isDesktop) {
      setShowSidebar(true);
      setShowNotes(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div
        className={`app-container ${
          !isDesktop && showNotes ? "notes-active" : ""
        }`}
      >
        {(isDesktop || showSidebar) && (
          <Sidebar onSelectGroup={handleSelectGroup} />
        )}
        {(isDesktop || showNotes) && (
          <NotesContainer onBackClick={handleBackToSidebar} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
