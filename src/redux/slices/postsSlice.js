import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosCilent from '../../utils/axiosClient';



 export const getUserProfile = createAsyncThunk('user/getuserProfile',async(body) =>{
   try{
       
       const response= await axiosCilent.post('/user/getUserProfile' , body );
      //  console.log('user profile ' , response);
       return response.result;
   }catch(error){
      return Promise.reject(error);
   }
});

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlike', async(body) =>{
  try{

  const response= await axiosCilent.post(
    "/posts/like",
    body
  );
  return response.result.post;
  }catch(e){
    return Promise.reject(e);
  }

} )




const postsSclice = createSlice({
    name:'postsSlice',
    initialState:{
       userProfile:{}
    },
  
    extraReducers:(builder)=>{
  builder.addCase(getUserProfile.fulfilled,(state,action) =>{
    state.userProfile=action.payload; 
   })
  .addCase(likeAndUnlikePost.fulfilled, (state , action) =>{
  const post = action.payload;
  const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id);
  if(index && index!== -1){
    state.userProfile.posts[index]=post;
  }
  })
    },

});

export default postsSclice.reducer;

