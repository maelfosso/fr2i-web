import React from 'react'
import io from 'socket.io-client';

const SocketIOContext = React.createContext();

export const socket = io('http://127.0.0.1:4000');

export default SocketIOContext;
