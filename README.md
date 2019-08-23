# ts-react-google-login-component
> Typescript based React Google Component to login users through google

ts-react-google-login-component is a module that easily lets you drop it into
your existing project and get the benefits of Google Login. It's a plug and
play component that'll fit in your workflow if your using standalone React or
React with Redux.


##### Up to date with the latest API Version

## Usage
```bash
npm install --save ts-react-google-login-component
```
```js
import React from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';

export class Login extends React.Component {

    preLoginTracking(): void {
        console.log('Attemp to login with google');
    }

    errorHandler(error: string): void{
        // handle error if login got failed...
        console.error(error)
    }

    responseGoogle(googleUser: gapi.auth2.GoogleUser): void {
        const id_token = googleUser.getAuthResponse(true).id_token
        const googleId = googleUser.getId()

        console.log({ googleId })
        console.log({accessToken: id_token})
        // Make user login in your system
        // login success tracking...
    }

    render(): JSX.Element {
        const clientConfig = { client_id: 'youappid' }

        return (
        <div>
                <GoogleLoginButton
                    buttonText='continue with google'
                    responseHandler={this.responseGoogle}
                    clientConfig={clientConfig}
                    preLogin={this.preLoginTracking}
                    onFailure={this.errorHandler}
                />
        </div>
        )
    }

}
```

Since this component is using [gapi types](https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig), S0 you can use all config options available from google

you can also use all signIn [options](https://openid.net/specs/openid-connect-basic-1_0.html#RequestParameters) provided by Google
```js
render(): JSX.Element {
        const clientConfig = { client_id: 'youappid' }
        const signInOptions = { scope: 'profile' }

        return (
        <div>
                <GoogleLoginButton
                    buttonText='continue with google'
                    responseHandler={this.responseGoogle}
                    clientConfig={clientConfig}
                    singInOptions={signInOptions}
                />
        </div>
        )
    }
```