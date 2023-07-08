import React from 'react';
import userImg from '../../Assests/user.png';
import './Avator.scss';


function Avator({src}) {
  return (
    <div className='avator'>
    <img src={src ? src: userImg} alt="user image" />
    </div>
  )
}

export default Avator;