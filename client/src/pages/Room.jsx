import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/room/Header'
import IDE from '../components/room/IDE'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client';
const socket = io("http://localhost:5000");

export default function Room() {
    const { roomId } = useParams()
    const hasJoined = useRef(false)
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        if (!hasJoined.current) {
            const name = prompt("Enter your name:");
            const userName = name || "Anonymous";
            socket.emit("join-project", { roomId, userName });
            hasJoined.current = true;
        }

        // Listen for the user list update from the server
        socket.on("update-user-list", (users) => {
            setOnlineUsers(users);
            console.log(users)
        });

        // Cleanup listener on unmount
        return () => {
            socket.off("update-user-list");
        };
    }, [roomId]);
    return (
        <div>
            <Header />
            <div className='w-full flex'>
                <div className='w-9/12'>
                    <IDE socket={socket} roomId={roomId} />
                </div>
                <div className='w-3/12 py-5 px-5'>
                    <h1 className='text-3xl mb-5 font-semibold text-white'>Members</h1>
                    {onlineUsers.map((user) => (
                        <div key={user.socketId} className="flex items-center gap-3">
                            {/* Avatar Circle */}
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            {/* Username */}
                            <span className="text-gray-300 text-sm">
                                {user.username} {user.socketId === socket.id ? "(You)" : ""}
                            </span>
                            {/* Online Indicator */}
                            <div className="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
