import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import EmailValidator from 'email-validator';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    if (0 === password.trim().length || 0 === email.trim().length) {
      alert('Please enter an e-mail address and a passsword');
      return;
    }
    if (!EmailValidator.validate(email)) {
      alert("The e-mail address you provided isn't valid");
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);  

      this.setState({
        email: '',
        password: ''
      });
  
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
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
            <CustomButton type='button' isGoogleSignIn onClick={signInWithGoogle}>
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
