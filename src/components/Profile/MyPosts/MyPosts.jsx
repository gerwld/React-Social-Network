import s from './MyPosts.module.css';
import UserPost from './Post/Post';
import React from 'react';

const MyPosts = (props) => {
  let postsData = props.profilePage;
  let userPosts = postsData.postData.map(post => <UserPost likes={post.likes} value={post.cont} />);
  let currentPost = React.createRef();
  let addPost = (e) => {
    e.preventDefault();
    props.dispatch({type: 'ADD-POST'});
  }
  let onPostChange = ()=> {
    props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: currentPost.current.value});
    console.log("I re-render dat stuff rn bruh");
  }

  return (
    <div className={s.user_posts}>
      <span className={s.title}>My Posts</span>
      <form className={s.new_post_input}>
        <textarea ref={currentPost} value={postsData.newPostText} 
                  onChange={onPostChange}></textarea>
        <input onClick={addPost} type="submit" value="Send"></input>
      </form>
      <div className={s.user_posts__last}>

        {userPosts}

      </div>
    </div>
  );

}

export default MyPosts;