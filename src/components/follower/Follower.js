import React, { useEffect, useState } from 'react'
import Avator from '../avator/Avator';
import './Follower.scss';
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import {useNavigate} from 'react-router'


function Follower({user}) {

const dispatch=useDispatch();
const navigate=useNavigate();
const feedData= useSelector(state => state.feedDataReducer.feedData )
const [isFollowing, setIsFollwoing]=useState();

useEffect(()=>{

 setIsFollwoing(feedData.followings.find((item)=>item._id === user._id))
},[feedData]);

function handleUserFollow(){
  dispatch(followAndUnfollowUser({
    userIdToFollow:user._id
  }))
}
  return (
    <div className='Follower'>
        <div className="user-info" onClick={()=> navigate(`/profile/${user._id}`)}>
        <Avator src={user?.avatar?.url}/>
    <h4 className='name'>{user.name}</h4>
        </div>

    <h5 onClick={handleUserFollow}
     className={isFollowing ? 'hover-link follow-link':'btn-primary'}>{isFollowing ? 'unfollow':'follow'}</h5>

    </div>
  )
}

export default Follower