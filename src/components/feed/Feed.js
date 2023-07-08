import React, { useEffect } from 'react'
import './feed.scss';


import Follower from '../follower/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slices/feedSlice';
import Post from '../post/Post';


function Feed() {

  const dispatch= useDispatch();
  const feedData= useSelector(state=> state.feedDataReducer.feedData);

  useEffect(()=>{
  dispatch(getFeedData());
  },[dispatch])

  return (
    <div className='Feed'>
    <div className="container">
        <div className="left-part">
         {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
        </div>
        <div className="right-part">
        <div className="followings">
            <h3 className='title'>you are following</h3>
          {feedData?.followings?.map(user => <Follower key={user._id} user={user}/> )}
        </div>
        <div className="suggestions">
            <h3 className='title'>Suggested for you</h3>
            {feedData?.suggestions?.map(user => <Follower key={user._id} user={user}/> )}
        </div>
        </div>
    </div>
    </div>
  )
}

export default Feed;
