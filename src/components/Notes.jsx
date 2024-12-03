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
<div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 relative">
  <button
    onClick={() => logout()}
    className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
  >
    Logout
  </button>
  <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Task</h1>
    <div className="flex items-center space-x-2 mb-6">
      <input
        type="text"
        placeholder="Add a note"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => addNote()}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add
      </button>
    </div>
    <ul className="space-y-4">
      {notes.map((note) => (
        <li
          key={note._id}
          className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg shadow-sm"
        >
          <span className="text-gray-700">{note.note}</span>
          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            x
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>


  )
}