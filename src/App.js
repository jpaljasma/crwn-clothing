import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import NotFound from './pages/notfound/notfound.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      emailVerificationSent: false,
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          const snapshotData = snapShot.data();
          if(snapshotData.emailVerified) {
            this.setState({
              emailVerificationSent: true
            });
          }
          else {
            if(!this.state.emailVerificationSent) {
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
          
          this.setState({
            currentUser: {
              id: userRef.id,
              ...snapshotData // spread in the snapshot data
            }
          }, () => {
            console.log(this.state.currentUser)
          });
        });
      } else {
        // reset the state
        this.setState({
          emailVerificationSent: false,
          currentUser: null
        });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
          <Route component={NotFound} status={404} />
        </Switch>
      </div>
    );
  }
}

export default App;
