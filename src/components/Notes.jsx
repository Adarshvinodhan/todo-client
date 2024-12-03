import {useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Notes(){
  const[notes,setNotes] = useState([]);
  const[input,setInput] = useState('');
  const url = 'https://todoserver-megu.onrender.com/api/notes';
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{                                     //GET all Notes
    const fetchNotes = async()=>{
      const res = await axios.get(url,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setNotes(res.data);
    }
    fetchNotes();
  },[])

  const addNote = async()=>{                         //Post Note
    try{
      const res = await axios.post(url,{note:input},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setNotes([...notes,res.data.note])
      setInput('')
  }
  catch(error){
      console.log(error);
  }
}
  const deleteNote = async(id)=>{                   //Delete Note
    try{
      const res = await axios.delete(`${url}/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setNotes(notes.filter((note)=>note._id !== id))
    }
    catch(e){
      console.log(e)
    }
  }

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/');

  }

  return(
<div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-8 px-4 relative">
  {/* Logout Button */}
  <button
    onClick={() => logout()}
    className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transform transition-transform duration-300 hover:scale-105"
  >
    Logout
  </button>

  {/* Task Manager Container */}
  <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6 mt-8 transform transition-transform hover:scale-105">
    <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
      Task Manager
    </h1>

    {/* Add Note Section */}
    <div className="flex items-center space-x-2 mb-6">
      <input
        type="text"
        placeholder="Add a note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-400"
      />
      <button
        onClick={() => addNote()}
        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition-transform duration-300 hover:scale-105"
      >
        Add
      </button>
    </div>

    {/* Notes List */}
    <ul className="space-y-4">
      {notes.map((note) => (
        <li
          key={note._id}
          className="flex justify-between items-center p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-md"
        >
          <span className="text-gray-300">{note.note}</span>
          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-500 hover:text-red-700 font-semibold transform transition-transform duration-200 hover:scale-110"
          >
            x
          </button>
        </li>
      ))}
    </ul>

    {/* Empty State */}
    {notes.length === 0 && (
      <p className="text-center text-gray-400 mt-4 animate-pulse">
        No tasks yet. Add a new task to get started!
      </p>
    )}
  </div>
</div>


  )
}