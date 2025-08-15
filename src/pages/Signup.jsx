import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import{ handleError, handleSuccess } from '../utility'
import { ToastContainer } from 'react-toastify';

function Signup() {
    const [formInfo, setformInfo] = useState({
        name :"",
        email:"",
        password:"",

    })
    const Navigate = useNavigate();

    const changeHandlar = (event) =>{
        const {name, value} = event.target;

        // setformInfo((prevData) =>({
        //     ...prevData,
        //     [name]:event.target.value,
        // }))

        const newData = {...formInfo}
        newData[name] = value;
        setformInfo(newData);
        console.log(formInfo);
    }

    // handle signup
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
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
            console.log('Signup successful:', data);
            const {success, message, error} = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    Navigate('/login')
                }, 1000);

            } else if(error){
                handleError(error);
                setTimeout(() => {
                    Navigate('/signup')
                }, 1000);
            }
            else if(error){
                handleError(error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            handleError('Something went wrong, please try again later', error);
        }
    }

  return (
    <div className="bg-white p-8 sm:p-12 rounded-[10px] w-full max-w-[400px] shadow-[8px_8px_24px_0px_rgba(66,68,90,1)]">
        <h1 className='mb-5 text-[30px]'>Signup Page</h1>
      <form onSubmit={handleSignup}
            className="flex flex-col gap-[10px]">
        <div className='flex flex-col'>
            <label className='text-[20px]' htmlFor="name">Name</label>
            <input 
            className="w-full text-[20px] p-2 outline-none border-b border-black placeholder:text-[12px] placeholder:italic"            type="text"
            name='name'
            placeholder='Enter your name'
            onChange={changeHandlar}
            value={formInfo.name}
                />
        </div>
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

        <span>Already have an account ?
                    <Link to="/login">Login</Link>
        </span>

      </form>
        <ToastContainer />
    </div>
  )
}

export default Signup
