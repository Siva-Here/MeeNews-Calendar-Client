import React, { useState } from 'react';
import axios from 'axios';
import { setAuthenticated, setJwtToken } from '../../store/slices/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handlePhoneNumberChange = (e) => {
        const sanitizedNumber = e.target.value.replace(/\D/g, '');
        setPhoneNumber(sanitizedNumber);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        // Input validation
        if (!phoneNumber || phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }
    
        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
    
        const formData = {
            mobile_num: parseInt(phoneNumber, 10),
            password,
        };
    
        try {
            const response = await axios.post('https://api.meebuddy.com/news/dashboard/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.data.code === 200) {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                dispatch(setJwtToken(token));
                dispatch(setAuthenticated(true));    
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to log in. Please try again.');
        }
    };
    
    

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white my-[50px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="/meeNews.png"
                    className="mx-auto h-[60px] w-auto"
                />
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
                    Sign in to your account
                </h2>
            </div>
            <div className="h-full w-full bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-[#9b59b6] px-5 pb-6 md:w-2/5 md:mx-auto md:pb-10">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    maxLength="10"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9b59b6] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9b59b6] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#9b59b6] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#431259] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#622a78]"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
