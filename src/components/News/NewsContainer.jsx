import React from 'react'
import News, { FeedBlock } from './News';
import { loadPostsTC, addNewPost } from '../../redux/feed-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import moment from 'moment';

class NewsContainer extends React.Component {
    
    componentDidMount(){
        this.props.loadPostsTC(this.props.nextPage, this.props.pageSize);
    }

    whatsNewSubmit = (data) => {
        this.props.addNewPost({
            "source": {
                "name": this.props.authUserName
              },
              "title": data.postData,
              "publishedAt": moment(),
              "likesCount": 0
        });
    }

    postsMap = (noAvatar) => {
       return this.props.posts.map(post => {
            return <div key={post.publishedAt}><FeedBlock text={post.title} avatar={post.avatar} nv={noAvatar}
                author={post.source.name} data={post.publishedAt} img={post.urlToImage}
                postLink={post.url} likesCount={post.likesCount} /></div>
        })
    }
   
    render() {
        if(this.props.posts.length > 2) {
        return (
            <News news={this.news} posts={this.props.posts} loadPosts={this.props.loadPostsTC}
                currentPage={this.props.currentPage} lastPostTime={this.props.lastPostDate} whatsNewSubmit={this.whatsNewSubmit}
                postsMap={this.postsMap} />
        )}
        else {
            return (
                <Preloader />
            )
        }
    }
}

var mapStateToProps = (state) => {
    return {
        posts: state.feed.posts,
        currentPage: (state.feed.nextPage - 1),
        lastPostDate: state.feed.lastPostDate,
        nextPage: state.feed.nextPage,
        pageSize: state.feed.pageSize,
        authUserName: state.auth.login
    }
}

export default connect(mapStateToProps, {loadPostsTC, addNewPost})(NewsContainer);