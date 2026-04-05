import React, {useState} from 'react'
import axios from 'axios'
import Button from '../ui/Button'

export default function Register({ setModal }) {
    const [user,setUser] = useState("")
    const [mail,setMail] = useState("")
    const [pass,setPass] = useState("")
    const [cpass,setCpass] = useState("")

    const handleRegister = async()=>{
        const url = import.meta.env.VITE_API_URL
        try {
            const response = await axios.post(`${url}/api/auth/register`,{
                username:user,
                email:mail,
                password:pass
            })
            if (response.status===201) {
                setModal("login")
            }
            alert(response.data.message)
        } catch (error) {
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className='flex items-center flex-col px-10 py-10 elevated z-20 primary-text rounded-2xl w-md'>
            <h1 className='text-3xl font-semibold'>Sign Up for SynCode</h1>
            <form onSubmit={handleSubmit} className='mt-10'>
                <label className='block mb-2 font-semibold'>Username:</label>
                <input
                    type='text'
                    required
                    name='username'
                    className='border rounded-md w-76 px-2 py-1 mb-4'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label className='block mb-2 font-semibold'>E-Mail:</label>
                <input
                    type='text'
                    required
                    name='username'
                    className='border rounded-md w-76 px-2 py-1 mb-4'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    
                />
                <label className='block mb-2 font-semibold'>Password:</label>
                <input
                    type='password'
                    required
                    name='password'
                    className='border rounded-md w-76 px-2 py-1 mb-3'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <label className='block mb-2 font-semibold'>Confirm Password:</label>
                <input
                    type='password'
                    required
                    name='Cpassword'
                    className='border rounded-md w-76 px-2 py-1 mb-3'
                    value={cpass}
                    onChange={(e) => setCpass(e.target.value)}
                />
                <p className='secondary-text mb-4 font-semibold'>
                    Already have an account?
                    <a onClick={()=>setModal("login")} className=' hover:text-red-400 hover:underline hover:cursor-pointer'>Sign In Here!!</a>
                </p>
                <Button variant='primary' className='block w-76 mt-4 py-1' onClick= {handleRegister}>Sign Up</Button>
                <Button variant='secondary' className='block w-76 mt-3 py-1' onClick={() => setModal("hidden")}>Back</Button>
            </form>
        </div>
    )
}
