# ts-react-google-login-component
> Typescript based React Google Component to login users through google

ts-react-google-login-component is a module that easily let you plug google login/signup in your application. It's a plug and
play component that'll fit in your workflow if your using standalone React or
React with Redux. It's originally created in Typescript so best for typescript applications and also can be used in any javascript applications.

It initializes Google platform api js automatically only once if it is not initialized yet.


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
                    responseHandler={this.responseGoogle}
                    clientConfig={clientConfig}
                    preLogin={this.preLoginTracking}
                    failureHandler={this.errorHandler}
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
                    responseHandler={this.responseGoogle}
                    clientConfig={clientConfig}
                    singInOptions={signInOptions}
                />
        </div>
        )
    }
```

Totally customizable. You can customize the component as per your requirements. You can provide Child elements. you need to provide custom classes in classNames props.

Note: If you do not provide any custom class, it will render with default [Google design](https://developers.google.com/identity/sign-in/web/build-button) you can update render options through renderOptions props. An example of customize button.

```js
render(): JSX.Element {
        const clientConfig = { client_id: 'googleclientid'}
        const signInOptions = { scope: 'profile' }

        return (
        <div>
                <GoogleLogin
                    classNames='custom_class center-block'
                    responseHandler={this.responseGoogle}
                    clientConfig={clientConfig}
                    preLogin={this.preLoginTracking}
                    failureHandler={this.errorHandler}
                    singInOptions={signInOptions}
                >
                    <div className='google-logo'/>
                    <div className='text'>Continue with Google</div>
                </GoogleLogin>

        </div>
        )
    }
```

## Props
|    params    |   value  |     required        |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    clientConfig |  object  |  Required |  Google Client config. Details below|
|    singInOptions    |  object  |  Optional  |  Google SignIn option|
| classNames |  string  | Optional | comma separated classes to change the style of component |
| responseHandler |  function  |  Required | callback function which will be called in case of successfull login and GoogleUser object will be passed |
| preLogin |  function  |  Optional | callback function which will be called just befor authenticating from Google, usefull for tracking stuff|
| failureHandler |  function  |  Optional | callback function which will be called in case of authentication failed from google with reason as string

## Client Config props
```js

  interface ClientConfig {
    /**
     * Required
     * The app's client ID, found and created in the Google Developers Console.
     */
    client_id: string;

    /**
     * The domains for which to create sign-in cookies. Either a URI, single_host_origin, or none.
     * Defaults to single_host_origin if unspecified.
     */
    cookie_policy?: string;

    /**
     * The scopes to request, as a space-delimited string. Optional if fetch_basic_profile is not set to false.
     */
    scope?: string;

    /**
     * Fetch users' basic profile information when they sign in. Adds 'profile' and 'email' to the requested scopes. True if unspecified.
     */
    fetch_basic_profile?: boolean;

    /**
     * The Google Apps domain to which users must belong to sign in. This is susceptible to modification by clients,
     * so be sure to verify the hosted domain property of the returned user. Use GoogleUser.getHostedDomain() on the client,
     * and the hd claim in the ID Token on the server to verify the domain is what you expected.
     */
    hosted_domain?: string;

    /**
     * Used only for OpenID 2.0 client migration. Set to the value of the realm that you are currently using for OpenID 2.0,
     * as described in <a href="https://developers.google.com/accounts/docs/OpenID#openid-connect">OpenID 2.0 (Migration)</a>.
     */
    openid_realm?: string;

    /**
     * The UX mode to use for the sign-in flow.
     * By default, it will open the consent flow in a popup.
     */
    ux_mode?: "popup" | "redirect";

    /**
     * If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow.
     * The default redirect_uri is the current URL stripped of query parameters and hash fragment.
     */
    redirect_uri?: string;
  }
  ```

  ## SignIn props (Optional)
  ```js
 interface SigninOptions {
    /**
     * The package name of the Android app to install over the air.
     * See Android app installs from your web site:
     * https://developers.google.com/identity/sign-in/web/android-app-installs
     */
    app_package_name?: string;
    /**
     * 	Fetch users' basic profile information when they sign in.
     * 	Adds 'profile', 'email' and 'openid' to the requested scopes.
     * 	True if unspecified.
     */
    fetch_basic_profile?: boolean;
    /**
     * Specifies whether to prompt the user for re-authentication.
     * See OpenID Connect Request Parameters:
     * https://openid.net/specs/openid-connect-basic-1_0.html#RequestParameters
     */
    prompt?: string;
    /**
     * The scopes to request, as a space-delimited string.
     * Optional if fetch_basic_profile is not set to false.
     */
    scope?: string;
    /**
     * The UX mode to use for the sign-in flow.
     * By default, it will open the consent flow in a popup.
     */
    ux_mode?: "popup" | "redirect";
    /**
     * If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow.
     * The default redirect_uri is the current URL stripped of query parameters and hash fragment.
     */
    redirect_uri?: string;
  }
  ```

## Render options (If you decided to use Google default design)
```js
interface Options{

    /**
     * The width of the button in pixels (default: 120).
     */
    width?: number;

    /**
     * The height of the button in pixels (default: 36).
     */
    height?: number;

    /**
     * Display long labels such as "Sign in with Google" rather than "Sign in" (default: false).
     */
    longtitle?: boolean;

    /**
     * The color theme of the button: either light or dark (default: light).
     */
    theme?: string;
}
```