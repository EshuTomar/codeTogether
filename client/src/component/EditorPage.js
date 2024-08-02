import React, { useEffect, useRef, useState } from 'react'
import Client from './Client';
import Editor from './Editor';
import { initSocket } from '../socket';
import {useNavigate,useLocation, useParams, Navigate} from 'react-router-dom';
import toast from 'react-hot-toast';

function EditorPage() {

  // const [clients, setClients] = useState([
  //   {socketId: 1, username:"John Doe"},
  //   {socketId: 2, username:"Elon musk"},
  // ])
  const [clients, setClients] = useState([])


  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const navigate = useNavigate()

  useEffect(()=>{

    const handleError = (e)=>{
      console.log('socket error =>', e);
      toast.error("Socket connection failed");
      navigate('/');
    }


    const init = async()=>{
      // creating connection with backend
      socketRef.current = await initSocket();

      // handling errors if there comes
      socketRef.current.on('connect_error', (err)=> handleError(err));
      socketRef.current.on('connect_failed', (err)=> handleError(err));

     

      // sending some values to our backend 
      socketRef.current.emit('join',{
        roomId,
        username:location.state?.username,
      })

      // getting it from server side
      socketRef.current.on('joined',
        ({clients,username,socketId})=>{
          if(username !== location.state?.username){
            toast.success(`${username} joined the room`);
            
          }
          setClients(clients); 
          socketRef.current.emit('sync-code',{
            code: codeRef.current,
            socketId          
          });
        }
      );

      // disconnected
      socketRef.current.on('disconnected', ({socketId, username})=>{
        toast.success(`${username} leave the room`);
        setClients((prev)=>{
          return prev.filter(
            (client)=> client.socketId != socketId
          )
        })
      })

    }
    init();

    return()=>{
      socketRef.current.disconnect();
      socketRef.current.off('joined');
      socketRef.current.off('dissconnected');
    }

  },[])

  


  if(!location.state){
    return <Navigate to='/' />
  }


  const copyRoomId = async()=>{
    try{;
      await navigator.clipboard.writeText(roomId);
      toast.success("Room id is copied")
    }catch(error){
      toast.error("Unable to copy room id");
    }
  };

  const leaveRoom =() =>{
    navigate('/');
  }

  return (
    <div className='container-fluid vh-100'>
      <div className='row h-100'>
        <div className='col-md-2 bg-dark text-light d-flex flex-column h-100 ' style={{boxShadow: "2px 0px 4px rgba(0,0,0,0.5)"}}>
          
          <img src='/images/logo.png'
          className='img-fluid mx-auto'
          alt='codeTOgether'
          style={{maxWidth: "150px", marginTop:"-10px"}}/>

          <hr style={{marginTop:"-8px"}}/>

          {/* client-list container */}
          <div className='d-flex flex-column overflow-auto'> 
            {/* clients... */}
            {clients.map((client)=>(
              <Client key={client.socketId} username={client.username}/>
            ))}
          </div>

         
          <div className='mt-auto'>
          <hr/>
            <button onClick={copyRoomId} className='btn btn-success'>Copy Room Id</button>
            <button onClick={leaveRoom} className='btn btn-danger mt-2 mb-2 px-3 btn-block'>Leave Room</button>
          </div>
          
        </div>


{/* Editor part */}
        <div className='col-md-10 text-light d-flex flex-column h-100'>
          <Editor socketRef={socketRef} roomId = {roomId} onCodeChange ={(code) => codeRef.current = code}/>
        </div>
      </div>
      
    </div>
  )
}

export default EditorPage
