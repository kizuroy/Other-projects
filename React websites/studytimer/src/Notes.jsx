import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Note.css'; // Import your custom CSS file

function Note() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const quillRef = useRef(null);

  const handleSaveNote = () => {
    if (activeNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[activeNote] = {
        title: noteTitle,
        content: quillRef.current.getEditor().getContents(),
      };
      setNotes(updatedNotes);
      setActiveNote(null);
      setNoteTitle('');
    } else {
      setNotes([...notes, { title: noteTitle, content: quillRef.current.getEditor().getContents() }]);
      setNoteTitle('');
    }
  };

  const handleEditNote = (index) => {
    setActiveNote(index);
    setNoteTitle(notes[index].title);
    quillRef.current.getEditor().setContents(notes[index].content);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="note-app">
      <div className="note-sidebar">
        <div className="note-list">
          {notes.map((note, index) => (
            <div key={index} className="note-item">
              <div className="note-title">{note.title}</div>
              <div className="note-actions">
                <button onClick={() => handleEditNote(index)}>Edit</button>
                <button onClick={() => handleDeleteNote(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="note-editor">
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <ReactQuill theme="snow" ref={quillRef} value={activeNote !== null ? notes[activeNote].content : ''} />
        <button onClick={handleSaveNote} className="save-button">
          {activeNote !== null ? 'Update Note' : 'Save Note'}
        </button>
      </div>
    </div>
  );
}

export default Note;
