import {useState, useEffect} from "react"
import {io} from "socket.io-client"
const socket = io('http://localhost:5000')

export const useSocket = () => {
    const [emitInfo, setEmitInfo] = useState({})

    useEffect(() => {
    socket.emit(emitInfo.event, emitInfo.data)
    }, [emitInfo])

    const onEmitInfoChange = (emitInfo) => {
       setEmitInfo(oldEmitInfo => { return {...emitInfo} })
    }

    return [onEmitInfoChange]
}