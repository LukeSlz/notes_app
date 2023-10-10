import './App.scss';
import { useEffect, useState } from 'react';
import Note from './interfaces/Note';

const App = () => {

  useEffect(() => {
    //React doesn't support async hooks, so it's necessary to make it asyn inside
    const fetchNotes = async () => {
      try {   //Handle potential errors
        const response = await fetch("http://localhost:5000/api/notes");    //API returns an array
        const notes: Note[] = await response.json();                        //Convert response in Json.

        setNotes(notes);    //Change hardcoded notes for API response (in Json)
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);   //empty dependency array to ensure that this code only runs once when the component is first mounted

  //Notes DB + hook
  const [notes, setNotes] = useState<Note[]>([]);

  //ADD (POST) New Note inputs handlers + hooks
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  const handleAddNote = async (event: React.FormEvent) => {
    //Prevent reload
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
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