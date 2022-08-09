import { createContext } from "react"
import {io} from "socket.io-client"
import { constants } from "../config/constants"

export const socket = io(constants.socket_url)
export const SocketContext = createContext()