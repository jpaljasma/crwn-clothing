import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import NotFound from './pages/notfound/notfound.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
// import SignIn from './components/sign-in/sign-in.component';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // de-structure setCurrentUser from the props
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          const snapshotData = snapShot.data();

          // e-mail verified flag
          /* 
          if (userAuth.emailVerified !== snapshotData.emailVerified) {
            snapshotData.emailVerified = userAuth.emailVerified;
            userRef
              .update('emailVerified', snapshotData.emailVerified)
              .then(() => {
                console.log(
                  'Email verified flag updated to ',
                  snapshotData.emailVerified
                );
              });
          }
          // set the email verifid flag
          // userRef.emailVerified = userAuth.emailVerified;

          if (userAuth.emailVerified) {
            this.setState({
              emailVerificationSent: true
            });
          } else {
            if (!this.state.emailVerificationSent) {
              this.setState({
                emailVerificationSent: true
              });
              // send verification email for once
              console.log('Sending a verification email ...');
              userAuth.sendEmailVerification().then(() => {
                console.log('Verification e-mail sent!');
              });
            }
          }
          */
          setCurrentUser({
            id: userRef.id,
            ...snapshotData // spread in the snapshot data
          });
        });
      } else {
        // reset the state
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    if (null !== this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route component={NotFound} status={404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
