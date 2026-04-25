import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const LoginModal = ({isOpen,onClose}) => {

    const {login} = useAuth();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    if(!isOpen)return null;

    const handleLogin= async ()=>{
        await login(email,password)
        onClose()
    }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 mb-4 rounded"/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 mb-4 rounded"/>
        <button onClick={handleLogin} className='w-full bg-blue-500 text-white py-2  rounded'>Login</button>
        <button onClick={onClose} className='w-full mt-2 text-gray-500'>Cancel</button>
      </div>
    </div>
  )
}

export default LoginModal
