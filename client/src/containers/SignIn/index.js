import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Form, Segment, Button } from "semantic-ui-react";
import { email, required } from "redux-form-validators";
import axios from "axios";
import { AUTH_USER, AUTH_USER_ERROR } from "../../actions/types";
// Create the 'onSubmit' function for Signin to call to the signin route in our backend
// This should be very similar to how we did signup in the SignUp container
// Remember how Redux form wants us to submit the form!
//  The onsubmit function should
//  1.  dispatch an action to set the authenticated state equal to the token from the database
//  2.  set the token to localStorage
//  3.  Redirect the user to either /counter, /usertodos, or /alltodos
//  4. The catch will be different. You can use a console.log(e) for now.
// ** BONUS!!!!!!! Look up Submission Errors in Redux form documentation
// Throw a nice Submition Error in the catch statement instead
class SignIn extends Component {
  onSubmit = async (formValues, dispatch) => {
    try {
      const { data } = await axios.post("/api/auth/signin", formValues);
      localStorage.setItem("token", data.token);
      dispatch({ type: AUTH_USER, payload: data.token });
      this.props.history.push("/counter");
    } catch (e) {
      throw new SubmissionError({
        email: "Please try again",
        password: "You entered an incorrect password",
        _error: "Login Failed",
      });
    }
  };
  renderEmail = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        error={meta.touched && meta.error}
        fluid
        icon='user'
        iconPosition='left'
        autoComplete='off'
        placeholder='Email Address'
      />
    );
  };
  renderPassword = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        error={meta.touched && meta.error}
        fluid
        type='password'
        icon='lock'
        placeholder='password'
        autoComplete='off'
        iconPosition='left'
      />
    );
  };
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
        <Segment stacked>
          <Field
            name='email'
            iscool='mannyiscool'
            component={this.renderEmail}
            validate={[
              required({ msg: "Email is required" }),
              email({ msg: "You must provide a valid email address" }),
            ]}
          />
          <Field
            name='password'
            component={this.renderPassword}
            validate={[required({ msg: "You must provide a password" })]}
          />
          <Button
            content='Sign In'
            color='teal'
            fluid
            size='large'
            type='submit'
            disabled={submitting}
          />
        </Segment>
      </Form>
    );
  }
}

export default reduxForm({
  form: "signin",
})(SignIn);
