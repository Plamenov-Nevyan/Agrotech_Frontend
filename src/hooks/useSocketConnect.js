import { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../contexts/socketContext";
import {io} from "socket.io-client"
import { constants } from "../config/constants"

export const useSocketConnect = () => {
   const [receivedData, setReceivedData] = useState({})
   const socket = io(constants.socket_url)
   const socketRef = useRef()

   useEffect(() => {
   
    socketRef.current = socket
    console.log(socketRef)

    socketRef.current.on('notification-received', 
    data => {
      console.log(data)
      setReceivedData(oldData => {return {...data}})
    })

    return () => {
      socketRef.current.disconnect();
    };
   })

   return {receivedData}
}