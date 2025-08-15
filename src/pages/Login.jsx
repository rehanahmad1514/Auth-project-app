import React, { use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utility'
import { ToastContainer } from 'react-toastify';


function Login() {
  const [formInfo, setformInfo] = React.useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const changeHandlar = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...formInfo };
        copyLoginInfo[name] = value;
        setformInfo(copyLoginInfo);
  }
  // handle signup
  const handleLogin = async (event) => {
    event.preventDefault(); 
    const { email, password } = formInfo;
     if (!email || !password) {
            return handleError('email and password are required')
      }
    try{
      const url ='http://localhost:3000/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInfo),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      const { success, message, jwtToken, name, error } = data;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('name', name);
        Navigate('/home');
      }
      else if(error){
        handleError(error);
        setTimeout(() => {
          Navigate('/login');
        }, 1000);
      }
      else if(!success){
        handleError('Something went wrong');
      }

    }catch (error) {
      console.error('Error during login:', error);
      handleError('Something went wrong, please try again later');
    }
  } 
  return (
    <div className="bg-white p-8 sm:p-12 rounded-[10px] w-full max-w-[400px] shadow-[8px_8px_24px_0px_rgba(66,68,90,1)]">
        <h1 className='mb-5 text-[30px]'>Login Page</h1>
      <form onSubmit={handleLogin}
            className="flex flex-col gap-[10px]">
        <div className='flex flex-col'>
            <label className='text-[20px]' htmlFor="email">Email</label>
            <input 
             className="w-full text-[20px] p-2 outline-none border-b border-black placeholder:text-[12px] placeholder:italic"
            type="text"
            name='email'
            placeholder='Enter the Email'
            onChange={changeHandlar}
            value={formInfo.email}
             />
        </div>
        <div className='flex flex-col'>
             <label className='text-[20px]' htmlFor="password">Password</label>
            <input 
            className="w-full text-[20px] p-2 outline-none border-b border-black placeholder:text-[12px] placeholder:italic"            type="text"
            name='password'
            placeholder='Enter the Password'
            onChange={changeHandlar}
            value={formInfo.password}
             />
        </div>
        <button 
        className="bg-purple-600 border-none text-[20px] text-white rounded px-4 py-2 cursor-pointer my-2"
        type="submit"
        >Submit</button>
        <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
          </span>
      </form>
      <ToastContainer />
    </div>
  )
  
}

export default Login



