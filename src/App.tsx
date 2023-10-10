import './App.scss';
import { useState } from 'react';
import Note from './interfaces/Note';

const App = () => {

  //Notes DB + hook
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ])

  //Add New Note inputs handlers + hooks
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  const handleAddNote = (event: React.FormEvent) => {
    //Prevent page reload
    event.preventDefault();

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }

  //Update Note handlers + hooks
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  //Select the note to be updated
  const handleNoteclick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);

  }
  //Updat note
  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    };

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

    setNotes(updatedNotesList);
    
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  //Handle to avoid changes
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  //Delete notes
  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();    //This prevents the parent handler from being executed.

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  }

  return (
    <div className="app-container">
      <form className="note-form"
        onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))} >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          className="note-title"
          placeholder="Title"
          required />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          name="content"
          id="content"
          rows={10}
          required />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" key={note.id} onClick={() => handleNoteclick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;