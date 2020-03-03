import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      email: '',
      password: ''
    });
  };

  handleChange = event => {
    // pull value and the name off of the event.target
    const { value, name } = event.target;
    // dynamically set the state
    this.setState({
      [name]: value.trim()
    });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label='Email'
            type='email'
            id='email'
            name='email'
            autoComplete='username'
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label='Password'
            type='password'
            id='password'
            name='password'
            autoComplete='current-password'
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
              {' '}
              Sign in with Google{' '}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
