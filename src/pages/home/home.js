
import "./home.scss";

import Navabar from '../../components/navbar/Navabar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMyInfo())
  },[])
  return (
   <>
 <Navabar/>
   <div className="outlet" style={{marginTop :'60px'}}>
   <Outlet />
   </div>
 
  </>
  )
}

export default Home;