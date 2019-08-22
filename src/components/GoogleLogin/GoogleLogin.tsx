import React, { Component } from 'react'

export interface IGoogleLoginButtonProps {

    readonly clientConfig: gapi.auth2.ClientConfig,
    readonly singInOptions?: gapi.auth2.SigninOptions | gapi.auth2.SigninOptionsBuilder,
    readonly buttonText: string,
    readonly classNames?: string, // comma separated classes
    readonly preLogin?: () => void,
    readonly responseHandler: (response: gapi.auth2.GoogleUser) => void
    readonly onFailure?: (error: string) => void
}

export interface IGoogleLoginButtonState {
    readonly disabled: boolean
}

export function getScript(source: string, callback: () => void): void {
    const el = document.createElement('script')
    el.addEventListener('load', callback)
    el.setAttribute('src', source)

    document.body.appendChild(el)
}

export class GoogleLoginButton extends Component<IGoogleLoginButtonProps, IGoogleLoginButtonState> {

    constructor(props: IGoogleLoginButtonProps) {
        super(props)
        // Loading google plateform api, if it's not loaded
        if (typeof gapi === 'undefined') {
            this.setState({ disabled: true })
            getScript('https://apis.google.com/js/platform.js', () => {
                gapi.load('auth2', () => {
                    gapi.auth2.init(props.clientConfig)
                    this.setState({ disabled: false })
                })
            })
        } else {
            this.setState({ disabled: false })
        }
    }

    readonly clickHandler = () => {
        const { preLogin, responseHandler, singInOptions, onFailure } = this.props

        // if there is pre login task
        preLogin && preLogin()

        const googleAuth = gapi.auth2.getAuthInstance()
        if (googleAuth) {
            googleAuth.signIn(singInOptions)
                .then(googleUser => {
                    responseHandler(googleUser)
                })
                .catch(reason => {
                    onFailure && onFailure(reason.error)
                })
        }

    }

    render(): JSX.Element {
        const { classNames, buttonText } = this.props

        return (
            <button
                className={`${classNames ? classNames : ''}`}
                onClick={this.clickHandler}
                disabled={this.state.disabled}
            >
                {React.Children}
                {buttonText}
            </button>
        )
    }
}
