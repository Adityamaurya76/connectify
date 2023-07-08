import React, { useEffect, useState } from 'react'
import './Profile.scss';
import Post from '../post/Post';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';

import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/postsSlice';
function Profile() {

  const navigate= useNavigate();
const params=useParams();
const userProfile =useSelector(state => state.postsReducer.userProfile);
const myProfile =useSelector(state => state.appConfigReducer.myProfile);
const feedData = useSelector(state=>state.feedDataReducer.feedData);
const dispatch= useDispatch();
const [ismyProfile, setMyProfile] =useState(false);
const [isFollowing, setIsFollowing]= useState(false);

useEffect(()=>{
 dispatch(getUserProfile({
  userId:params.userId
 }))


 setMyProfile(myProfile?._id=== params.userId);
 
 setIsFollowing(
  feedData?.followings?.find((item)=>item._id === params.userId)
  );

},[myProfile,params.userId,feedData]);

function handleUserFollow() {
  dispatch(followAndUnfollowUser({
    userIdToFollow:params.userId
  }))
}

  return (
    <div className="Profile">
     <div className="container">
      <div className="left-part">
       {ismyProfile && <CreatePost />}
      {userProfile?.posts?.map(post => <Post key={post._id} post={post} />)}
      </div>
      <div className="rigth-part">
      <div className="profile-card">
        <img src={userProfile?.avatar?.url} alt=""className='user-img' />
        <h3 className='user-name'>{userProfile?.name}</h3>
        <p className='bio'>{userProfile?.bio}</p>
        <div className="follower-info">
          <h4>{`${userProfile?.followers?.length} followers`}</h4>
          <h4>{`${userProfile?.followings?.length} followings`}</h4>
        </div>
        {!ismyProfile &&
           <h5 style={{marginTop:'10px'}} 
            onClick={handleUserFollow}
           className={isFollowing ? 
            'hover-link follow-link':
            'btn-primary'}>{isFollowing ?
               'unfollow':'follow'}</h5>
      
        }
       {ismyProfile &&
        <button className='update-profile btn-secondary'
        onClick={()=>{navigate('/updateProfile')}}>Update Profile</button>
       }
       
      </div>
      </div>
     </div>
    </div>
  )
}

export default Profile;