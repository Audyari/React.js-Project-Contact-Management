import React from 'react';
import { Link } from 'react-router-dom';
import { alerterror } from '../../lib/alert';
import { userLogin } from '../../lib/api/UserApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



export default function UserLogin() {

    const navigate = useNavigate()
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            navigate('/dashboard/contacts');
        }
    }, [token]);

   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           const response = await userLogin(username, password);
           const data = await response.json();  // Pindahkan parsing JSON ke sini
           
           console.log('Login response:', { 
               status: response.status,
               ok: response.ok,
               data 
           });
   
           if (response.ok) {
               // Simpan token dari respons API
               const token = data.data?.token;
               if (token) {
                   localStorage.setItem('token', token);
                   //localStorage.setItem('username', username);
                   setToken(token);
                   navigate('/dashboard/contacts');
               } else {
                   throw new Error('No token received from server');
               }
           } else {
               throw new Error(data.message || 'Login failed');
           }
       } catch (error) {
           console.error('Login error:', error);
           alerterror({
               title: 'Login Failed',
               message: error.message || 'Invalid username or password'
           });
       }
   };

    return <>
    
        <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-address-book text-3xl text-white"></i>
                </div>
                <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                <p className="text-gray-300 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user text-gray-500"></i>
                        </div>
                        <input type="text" id="username" name="username" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                            placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-lock text-gray-500"></i>
                        </div>
                        <input type="password" id="password" name="password" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                            placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-6">
                    <button type="submit" 
                        className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-sign-in-alt mr-2"></i> Sign In
                    </button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Don't have an account? 
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign up</Link>
                </div>
            </form>
        </div>

    </>
    
}
