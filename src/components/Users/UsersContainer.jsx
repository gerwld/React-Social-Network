import React from 'react';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { followUserThunkCreator, getPaginationCurrentIndexesTC, getUsersThunkCreator, loadFriendsToggle, onPageChangeThunkCreator, findUsers } from '../../redux/users-reducer';
import { getCurrentPage, getIsFetching, getIsFollowing, getPages, getPageSize, getPagLengthWithCreateSelecor, getTotalUsers, getUsers } from '../../redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

class UsersAPIComponent extends React.Component {
    state = {
        searchInput: ''
    }

    getUsers = () => {
        this.props.getUsersThunkCreator(
            this.props.currentPage,
            this.props.pageSize,
            this.props.users.length,
            this.props.loadOnlyFriends,
            this.props.searchQuery);
    }

    componentDidMount() {
        this.getUsers();
    }

    onFriendsToggle = async () => {
        await this.props.loadFriendsToggle();
        this.getUsers();
    }

    getPagCurrentIndexes = () => {
        return this.props.getPaginationCurrentIndexesTC(
            this.props.currentPage,
            this.props.allPages,
            this.props.pagLength);
    }

    onPageChanged = (pageNumber) => {
        this.props.onPageChangeThunkCreator(
            pageNumber,
            this.props.allPages,
            this.props.pageSize,
            this.props.loadOnlyFriends,
            this.props.searchQuery
        );
    }

    onSearchChange = (e) => {
        this.setState({ searchInput: e.target.value });
    }
    onSearchSubmit = () => {
        let value = this.state.searchInput;
            this.props.loadFriendsToggle(false);
            this.props.findUsers(value);
            setTimeout(this.getUsers, 250)
    }

    showTitle = () => {
        let title = this.props.loadOnlyFriends ? "Friends" : "All Users";;
        let searchInput = this.props.searchQuery;
        let isSearching = searchInput.length >= 1;
        if(isSearching) {
            title = `Search result for: ${searchInput} `;
        }
        return title;
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader />}
                {!this.props.isFetching && <Users {...this.props}
                    followUser={this.props.followUserThunkCreator}
                    onPageChanged={this.onPageChanged}
                    getPagCurrentIndexes={this.getPagCurrentIndexes}
                    onFriendsToggle={this.onFriendsToggle}
                    isOnlyFriends={this.props.loadOnlyFriends}
                    searchInput={this.state.searchInput}
                    onSearchChange={this.onSearchChange}
                    onSearchSubmit={this.onSearchSubmit}
                    title={this.showTitle}
                />}

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
        totalUsers: getTotalUsers(state),
        pageSize: getPageSize(state),
        allPages: getPages(state),
        pagLength: getPagLengthWithCreateSelecor(state),
        loadOnlyFriends: state.usersPage.loadOnlyFriends,
        searchQuery: state.usersPage.searchQuery
    }
}

const UsersContainer = connect(mapStateToProps, {
    getUsersThunkCreator, followUserThunkCreator,
    getPaginationCurrentIndexesTC, onPageChangeThunkCreator,
    loadFriendsToggle, findUsers
})(UsersAPIComponent);

export default withAuthRedirect(UsersContainer);