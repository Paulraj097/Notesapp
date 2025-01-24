import React, {useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes]= useState([]);
  const [newNote,setNewNote]=useState({title:'', content:''});
  const [editNote, setEditNote]= useState(null);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/notes')
    .then(response =>setNotes(response.data))
    .catch(error => console.log('There was an error!',error));
    
  },[]);

  const handleAddNote = ()=>{
    axios.post('http://localhost:5000/api/notes',newNote)
    .then(response=>{
      setNotes([...notes,response.data]);
      setNewNote({title:'', content:''});
      
    })
    .catch(error =>console.error('Error adding note!',error));
    
  };

  const handleEditNote =(note)=> {
    setEditNote(note);
    setNewNote({title:note.title, content: note.content});
  };

  const handleUpdateNote =()=>{
    axios.put(`http://localhost:5000/api/notes/${editNote._id}`, newNote)
    .then((response)=>{
      const updatedNotes = notes.map((note)=>
        note._id ===editNote._id? response.data : note);
      setNotes(updatedNotes);
      setNewNote({title:'', content:''});
      setEditNote(null);
    })
    .catch(error =>console.error('Error Updating note!',error));
 
  }
  const handleDeleteNote = (id)=>{
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    .then(()=>{
      setNotes(notes.filter(note => note._id !== id));
    })
    .catch(error =>console.error('Error deleteing note!',error));
    
  };
  return (
    <div className="App">
      <h2>Notes App</h2>
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      {editNote? (
        <button className='button2' onClick={handleUpdateNote}>
          Update Note</button>
      ) :(
      
      <button className='button2' onClick={handleAddNote}>Add Note</button>
      )}
      
      <div className='note-container'>
      <ul>
        <h1>Notes List</h1>
        {notes.map(note => (
          <li key={note._id}>
            <strong><h3>{note.title}</h3></strong>
            <p>{note.content}</p>
            <button className='button2' onClick={()=> handleEditNote(note)}>
              Edit
            </button>
            <button className='button2' onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>

      </div>
    </div>
    
  );
}
      

export default App;
