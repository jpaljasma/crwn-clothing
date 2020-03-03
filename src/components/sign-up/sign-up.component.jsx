import React from 'react';
import EmailValidator from 'email-validator';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
  auth,
  createUserProfileDocument
} from './../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password.length < 8) {
      alert('Use a strong password');
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!EmailValidator.validate(email)) {
      alert("The e-mail address you provided isn't valid");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      switch(error.code) {
        case 'auth/email-already-in-use':
          alert(error.message);
          break;
        default:
          alert('Failed to create a user');
          break;
      }
      console.error(error);
    }
  };

  handleChange = event => {
    // pull value and the name off of the event.target
    const { value, name } = event.target;
    // dynamically set the state
    this.setState({
      [name]: value
    });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your e-mail and password</span>
        <form
          name='signup-form'
          className='sign-up-form'
          onSubmit={this.handleSubmit}
        >
          <FormInput
            label='Your name'
            type='text'
            id='displayName'
            name='displayName'
            autoComplete='name'
            value={displayName}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label='Email'
            type='email'
            id='signup-email'
            name='email'
            autoComplete='username'
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label='Password'
            type='password'
            minLength={8}
            id='signup-password'
            name='password'
            autoComplete='new-password'
            value={password}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label='Confirm Password'
            type='password'
            minLength={8}
            id='confirmPassword'
            name='confirmPassword'
            autoComplete='new-password'
            value={confirmPassword}
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
