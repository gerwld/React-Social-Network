import React from 'react';
import { NavLink } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import WhatsNew from '../../common/WhatsNewForm/WhatsNew';
import { FeedBlock } from '../../News/News';
import s from './MyPosts.module.css';


const MyPosts = (props) => {
  let userPosts = props.postData.map(post => <div key={post.id + post.postId + "_key"} className={s.feed_block}><FeedBlock postId={post.postId} addComment={props.addComment} comments={props.comments.filter(c => c.postId === post.postId)} isPopup={false} addValueToMessage={props.addValueToMessage} data={post.publishedAt} author={props.fullName} avatar={props.avatar} likesCount={post.likes} text={post.cont} img={post.urlToImage} /></div>);
  let isHasId = (props.match.params.userId && props.match.params.userId.length > 1) ? '/id' + props.match.params.userId : '';

  const currentActive = (link) => {
    if (link === "my_posts") return s.user_posts_ac_1;
    else if (link === "post_archive")return s.user_posts_ac_2;
  }
  const MyPostReduxForm = reduxForm({ form: "myPosts" })(WhatsNew);

  return (
    <>
      <MyPostReduxForm onSubmit={props.sendPost} styles={s.whatsNewPost_profile} fullWidth={90} {...props} />
      <div className={`${s.user_posts}`}>
        <div className={`${s.user_posts_navtitle} main-content-block anim-theme`}>
          <ul className={`${s.user_posts_nav} ${currentActive(props.match.params.flags)}`}>
            <li><NavLink to={`/profile${isHasId}`} exact activeClassName={s.active}>All posts</NavLink></li>
            <li><NavLink to={`/profile${isHasId}/filter=my_posts`} activeClassName={s.active}>My posts</NavLink></li>
            <li><NavLink to={`/profile${isHasId}/filter=post_archive`} activeClassName={s.active}>Post archive</NavLink></li>
          </ul>
        </div>
        <div className={s.user_posts__last}>
          {userPosts}
        </div>
      </div>
    </>
  );
}


export default MyPosts;