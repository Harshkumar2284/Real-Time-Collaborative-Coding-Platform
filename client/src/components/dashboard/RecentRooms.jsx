import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RecentRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:5000/api/projects/recent', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRooms(response.data);
            } catch (err) {
                console.error("Failed to fetch rooms", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className='mt-10 secondary-bg w-10/12 rounded-xl py-6 px-8 primary-text min-h-[400px] shadow-lg'>
            <div className='flex justify-between items-center mb-7'>
                <p className='text-2xl font-bold'>Recent Rooms</p>
                <span className='text-xs opacity-50 uppercase tracking-widest'>Last 3 sessions</span>
            </div>

            {loading ? (
                <div className="flex flex-col gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-gray-800 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            ) : rooms.length > 0 ? (
                <div className='flex flex-col gap-3'>
                    {rooms.map((room) => (
                        <div 
                            key={room.roomId}
                            onClick={() => navigate(`/room/${room.roomId}`)}
                            className='flex items-center justify-between bg-[#1e1e1e] p-5 rounded-lg border border-gray-800 hover:border-blue-500 hover:bg-[#252525] cursor-pointer transition-all'
                        >
                            <div className='flex flex-col gap-1 overflow-hidden mr-4'>
                                <div className='flex items-center gap-3'>
                                    <span className='font-mono text-lg text-blue-400 font-semibold'>
                                        #{room.roomId}
                                    </span>
                                    <span className='text-[10px] bg-gray-700 px-2 py-0.5 rounded uppercase text-gray-300'>
                                        Auto-saved
                                    </span>
                                </div>
                                <p className='text-sm opacity-50 truncate font-mono'>
                                    {room.code ? room.code.replace(/\n/g, ' ').substring(0, 80) : "No code written yet..."}
                                </p>
                            </div>

                            <div className='flex flex-col items-end min-w-[120px]'>
                                <span className='text-xs font-semibold opacity-80'>
                                    {new Date(room.savedAt).toLocaleDateString()}
                                </span>
                                <span className='text-[10px] opacity-40'>
                                    {new Date(room.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-800 rounded-xl opacity-40'>
                    <p className='text-lg'>No history found</p>
                    <p className='text-sm'>Rooms you join will appear here automatically.</p>
                </div>
            )}
        </div>
    );
}