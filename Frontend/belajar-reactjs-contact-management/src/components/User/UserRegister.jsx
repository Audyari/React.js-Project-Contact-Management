import React from 'react'
import { alerterror, alertsukses } from '../../lib/alert'
import { userRegister } from '../../lib/api/UserApi'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function UserRegister() {

    const [username, setUsername] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
       e.preventDefault()
       
       // Validasi input kosong
       if (!username || !name || !password || !confirmPassword) {
           alerterror({
               title: 'Error',
               message: 'All fields are required'
           });
           return;
       }
   
       // Validasi panjang password
       if (password.length < 6) {
           alerterror({
               title: 'Error',
               message: 'Password must be at least 6 characters'
           });
           return;
       }
   
       if (password !== confirmPassword) {
           alerterror({
               title: 'Error',
               message: 'Password does not match'
           });
           return;
       }
   
       try {
           // Tampilkan loading state jika diperlukan
           // setLoading(true);
           
           const response = await userRegister(username, password, name);
           
           // Parse response JSON
           let data;
           try {
               data = await response.json();
           } catch (parseError) {
               console.error('Error parsing response:', parseError);
               throw new Error('Invalid response from server');
           }
   
           if (response.ok) {
               alertsukses({
                   title: 'Success',
                   message: 'User registered successfully'
               });
               // Reset form
               setUsername('');
               setName('');
               setPassword('');
               setConfirmPassword('');
               // Redirect ke halaman login
               setTimeout(() => navigate('/login'), 1500);
           } else {
               // Handle error dari server
               const errorMessage = data?.errors || 
                                  data?.message || 
                                  `Registration failed (${response.status})`;
               throw new Error(errorMessage);
           }
       } catch (error) {
           console.error('Registration error:', error);
           alerterror({
               title: 'Error',
               message: error.message || 'Failed to register. Please try again.'
           });
       } finally {
           // Matikan loading state
           // setLoading(false);
       }
    }

  
    return <>
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-user-plus text-3xl text-white"></i>
                </div>
                <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                <p className="text-gray-300 mt-2">Create a new account</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user text-gray-500"></i>
                        </div>
                        <input type="text" id="username" name="username" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                            placeholder="Choose a username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-id-card text-gray-500"></i>
                        </div>
                        <input type="text" id="name" name="name" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                            placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-lock text-gray-500"></i>
                        </div>
                        <input type="password" id="password" name="password" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                            placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-check-double text-gray-500"></i>
                        </div>
                        <input type="password" id="confirm_password" name="confirm_password" 
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                            placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-6">
                    <button type="submit" 
                        className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-user-plus mr-2"></i> Register
                    </button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Already have an account? 
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign in</Link>
                </div>
            </form>
        </div>
    </>
    
}