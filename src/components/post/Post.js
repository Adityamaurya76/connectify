import React from 'react'
import Avator from '../avator/Avator';
import './post.scss';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { likeAndUnlikePost } from '../../redux/slices/postsSlice';
import {useNavigate} from 'react-router'
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';

function Post({post}) {
const dispatch=useDispatch();
const navigate=useNavigate();
  async function handlePostLiked(){
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:'Liked or Unliked'
    }))
    dispatch(likeAndUnlikePost({
      postId:post._id
    }))
  }

  return (
    <div className='post'>
     <div className="heading" onClick={()=> navigate(`/profile/${post.owner._id}`)}>
        <Avator src={post?.owner?.avatar?.rul}/>
        <h4>{post?.owner?.name}</h4>
     </div>
     <div className="content">
        <img src={post?.image?.url} alt="" />
     </div>
     <div className="footer">
        <div className="like" onClick={handlePostLiked}>
        {post?.isliked ? <AiFillHeart  className='icon' style={{color:'red'}}/> : <AiOutlineHeart className='icon'/>}      
          <h4>{`${post?.likeCount} likes`}</h4>
        </div>
        <p className='caption'>{post?.caption}</p>
        <h6 className='time-ago'>{post?.timeAgo}</h6>
     </div>
    </div>
  )
}

export default Post;