import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login';
import { loginRequest, loginSocialRequest } from '../redux/actions';

// import './style.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = field => evt => {
    this.setState({ [field]: evt.target.value });
  };

  onSubmit = () => {
    const { email, password } = this.state;
    this.props.loginRequest({
      body: { email, password },
      success: () => {},
      failure: () => {},
    });
  };

  googleSuccessResponse = response => {
    console.log('success', response);
    const data = {
      firstName: response.w3.ofa,
      lastName: response.w3.wea,
      avatar: response.w3.Paa,
      email: response.w3.U3,
      password: ' ',
    };
    this.props.socialLogin({
      body: data,
    });
  };

  googleFailureResponse = response => {
    console.log('failure', response);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" className="page-login" verticalAlign="middle">
        <Grid.Column className="column-login" onSubmit={this.onSubmit}>
          <Header as="h2" color="blue" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Field>
                <GoogleLogin
                  clientId="437609978470-jdulo18nbgs7nv7d7f8nf0945j3f534m.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={this.googleSuccessResponse}
                  onFailure={this.googleFailureResponse}
                />
              </Form.Field>
              <Form.Input
                fluid
                value={email}
                onChange={this.onChange('email')}
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                value={password}
                onChange={this.onChange('password')}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button primary fluid size="large">
                Login
              </Button>
              <Link to="/signup" className="signup-link">
                Click here to sign up
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  loginRequest,
  socialLogin: loginSocialRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
