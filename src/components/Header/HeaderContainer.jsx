import React from 'react';
import Header from './Header';
import { setUserData } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { logoutUserTC } from '../../api/api';

class HeaderContainer extends React.Component {



    render() {
        return (
            <Header {...this.props} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        state: state,
        data: state.auth,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {setUserData, logoutUserTC})(HeaderContainer);