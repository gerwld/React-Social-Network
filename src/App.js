import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ThemeProvider } from 'styled-components';
import './App.css';
import NotFound from './components/common/NotFound/NotFound';
import { MainPreloader } from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import MusicContainer from './components/Music/MusicContainer';
import Navbar from './components/Navbar/Navbar';
import SettingsContainer from './components/Settings/SettingsContainer';
import { darkTheme, lightTheme } from './components/styles/base-theme';
import { GlobalStyles } from './global';
import withSuspense from './hoc/withSuspense';
import { initializeApp, toggleTheme } from './redux/app-reducer';
import store from './redux/redux-store';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/Login'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const NewsContainer = React.lazy(() => import('./components/News/NewsContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
    if(localStorage.getItem('theme')) {
      this.props.toggleTheme(JSON.parse(localStorage.getItem('theme')));
    }
  }

  render() {
    if (!this.props.initialized) {
      return <MainPreloader />
    }

    return (
    <>
    <ThemeProvider theme={this.props.isDark ? darkTheme : lightTheme}>
    <GlobalStyles />
    <HeaderContainer />
    <div className="app-wrapper">
      {!this.props.location.pathname.match('/login') && !this.props.location.pathname.match('/error-404') && <Navbar />}
      <div className="app-content">
        <Switch>
          <Route path="/users/filter=:flags" render={withSuspense(UsersContainer)} />
          <Route path="/users" exact render={withSuspense(UsersContainer)} />

          <Route path="/dialogs/id:userId?" render={withSuspense(DialogsContainer)} />
          <Route path="/dialogs" exact render={withSuspense(DialogsContainer)} />
          <Route path="/feed" render={withSuspense(NewsContainer)} />

          <Route path="/profile/id:userId?/filter=:flags?" render={withSuspense(ProfileContainer)} />
          <Route path="/profile/id:userId?" render={withSuspense(ProfileContainer)} />
          <Route path="/profile/status=:status" render={withSuspense(ProfileContainer)} />
          <Route path="/profile/filter=:flags" render={withSuspense(ProfileContainer)} />
          <Route path="/profile" exact render={withSuspense(ProfileContainer)} />

          <Route path="/settings" render={() => <SettingsContainer />} />
          <Route path="/music" render={() => <MusicContainer />} />

          <Route path="/login" render={this.props.isAuth ? () => <Redirect to="/profile" /> : withSuspense(LoginContainer)} />
          <Route path="/" exact render={() => { return this.props.isAuth === true ? <Redirect to="/profile" /> : <Redirect to="/login" />; }} />

          <Redirect from='*' to='/error-404' />
        </Switch>
      </div>
    </div>
    <Route path='/error-404' render={() => <NotFound />} />
    </ThemeProvider>
    </>);
  }
}


let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    initialized: state.app.initialized,
    isDark: state.app.darkTheme
  }
}

const AppContainer = compose(
  connect(mapStateToProps, { initializeApp, toggleTheme }),
  withRouter
)(App);


let SocialNetworkAppJawo = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default SocialNetworkAppJawo;