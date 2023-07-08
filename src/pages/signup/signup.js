import React, { useState } from 'react';
import './signup.scss';
import { Link } from 'react-router-dom';
import axiosCilent from '../../utils/axiosClient';

const Signup = () => {

    const[name, setName]=useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState('');

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         const result = await axiosCilent.post("/auth/signup", {
             name,
            email,
            password
         });
         console.log(result);
      } catch (error) {
         console.log(error)
      }



   }

    return (
        <div className="Signup">
       <div className="Signup-box">
          <h2 className='heading'>SignUp</h2>
              <form  onSubmit={handleSubmit}>
              <label htmlFor="text">Name</label>
               <input type="text" className='name' id ="name" onChange={(e)=>setName(e.target.value)}/>
    

               <label htmlFor="email">Email</label>
               <input type="email" className='email' id ="email" onChange={(e)=>setEmail(e.target.value)}/>
    
               <label htmlFor="password">Password</label>
               <input type="password" className='password' id ="password" onChange={(e)=>setPassword(e.target.value)}/>
  
            <input type="submit" className='submit' />
  
              </form>
              <p className='subheading'>already have an account? <Link to="/login">Login</Link> </p>
          </div>
       </div>
  
       
    )
}

export default Signup