import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosCilent from '../../utils/axiosClient';

import { likeAndUnlikePost } from './postsSlice';


 export const getFeedData = createAsyncThunk('user/getFeedData',async() =>{
   try{
        
       const response= await axiosCilent.get('/user/getFeedData');
       console.log('user profile ' , response);
       return response.result;
   }catch(error){
      return Promise.reject(error);
   }
});

 export const followAndUnfollowUser= createAsyncThunk('user/followAndUnfollowUser', async(body) =>{
    try{
        
      const response= await axiosCilent.post('/user/follow',body);
    
      return response.result.user;

      
  }catch(error){
     return Promise.reject(error);
  }
 })


const feedSclice = createSlice({
    name:'postsSlice',
    initialState:{
       feedData:{}
    },
  
    extraReducers:(builder)=>{
  builder.addCase(getFeedData.fulfilled,(state,action) =>{
    state.feedData=action.payload; 
   })
  .addCase(likeAndUnlikePost.fulfilled, (state , action) =>{
  const post = action.payload;

  const index = state?.feedData?.posts?.findIndex((item) => item._id === post._id);
  if( index !== undefined && index!== -1){
    state.feedData.posts[index]=post;
  }

  })
  .addCase(followAndUnfollowUser.fulfilled,(state, action) =>{
  const user= action.payload;
  const index=state?.feedData?.followings.findIndex((item )=> item._id === user._id);
  if( index !== -1){
   state?.feedData.followings.splice(index,1);
  }else{
    state?.feedData.followings.push(user);
  }
  })
    },

});

export default feedSclice.reducer;

