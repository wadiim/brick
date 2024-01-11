import './Auth.css';

import React, { useState } from "react"
import { Link, Navigate } from "react-router-dom";
import UserPool from './UserPool';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import Swal from "sweetalert2";

function Auth({ isSignIn }) {
  let [authMode, setAuthMode] = useState(isSignIn ? "signin" : "signup")
  let [email, setEmail] = useState("");
  let [fullname, setName] = useState("");
  let [password, setPassword] = useState("");
  let [clientId, setClientId] = useState("");
  let [scene, setScene] = useState("");
  let [confirmationCode, setConfirmationCode] = useState("");
  let [logged, setLogged] = useState(false);

  const ChangeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const AddUserToDatabase = async (userID, userName, email) => {
    fetch('https://fupload-b639097c0d92.herokuapp.com/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        userName: userName,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      });
  }

  const AddUserBucket = async (userID) => {
    let bucketName = userID.substring(0, 12).replace("@", "-");
    console.log("Creating user bucket: " + bucketName)
    fetch('https://fupload-b639097c0d92.herokuapp.com/file/create?bucketName=' + bucketName, {
      method: 'POST',
    }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
    });
  }

  const SignUp = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [new CognitoUserAttribute({Name: 'name', Value: fullname})], null, (err, data) => {
      if (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      } else {
        setClientId(clientId = data.user.pool.clientId);
        setScene(scene = "notVerified");
        AddUserToDatabase(email, fullname, email);
        AddUserBucket(email);
      }
    })
  }

  const ForgotPassword = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    })

    user.forgotPassword({
      onSuccess: (data) => {
        console.log(data);
        setScene(scene = "changePassword");
      },
      onFailure: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      }
    })
  }

  const ConfirmNewPassword = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    })

    user.confirmPassword(confirmationCode, password, {
      onSuccess: (success) => {
        console.log(success);
        setScene(scene = "signin")
      },
      onFailure: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      }
    })
  }

  const ConfirmSignUp = () => {
    const client = new CognitoIdentityProviderClient({region: 'us-east-1'});
    const command = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    });
  
    let send = client.send(command);
    send.then((_) => {
      setScene(scene = "verified"); 
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      });
    })
  };

  const InitiateAuth = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    })
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    })

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log(data);
        user.getUserAttributes((err, res) => {
          if (err) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            });
          } else {
            setLogged(true);
            setName(fullname = res[2].Value);
          }
        });
      },
      onFailure: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      },
      newPasswordRequired: (data) => {
        console.log('newPassword:', data);
      }
    })
  };

  if (scene === 'changePassword') {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Set new password</h3>
            <div className="form-group mt-3">
              <label>Confirmation code</label>
              <input
                type="number"
                className="form-control mt-1"
                placeholder="Enter code"
                value = {confirmationCode}
                onChange={(event) => setConfirmationCode(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>New password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter new password"
                value = {password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={ConfirmNewPassword}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (scene === 'verified') {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Account verified</h3>
            <Link to="/dashboard" state={{ email }} className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary">
                Go to dashboard
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }

  if (scene === 'notVerified') {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Verify account</h3>
            <div className="form-group mt-3">
              <label>Confirmation code</label>
              <input
                type="number"
                className="form-control mt-1"
                placeholder="Enter code"
                value = {confirmationCode}
                onChange={(event) => setConfirmationCode(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={ConfirmSignUp}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={ChangeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value = {email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value = {password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={InitiateAuth}>
                Submit
              </button>
            </div>
            { logged && ( <Navigate to="/dashboard" replace={true} state={{ email }} /> ) }
            
            <p className="text-center mt-2">
              Forgot <span className="link-primary" onClick={ForgotPassword}>password?</span>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={ChangeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value = {fullname}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value = {email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value = {password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Link to="/dashboard" state={{ email }} className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={SignUp}>
              Submit
            </button>
          </Link>
          
          <p className="text-center mt-2">
            Forgot <span className="link-primary">password?</span>
          </p>
          
        </div>
      </form>
    </div>
  )
}

export default Auth;
