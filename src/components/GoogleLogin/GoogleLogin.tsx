import React, { Component } from 'react'

export interface IGoogleLoginButtonProps {

    readonly clientConfig: gapi.auth2.ClientConfig,
    readonly singInOptions?: gapi.auth2.SigninOptions | gapi.auth2.SigninOptionsBuilder,
    readonly buttonText?: string,
    readonly classNames?: string,
    readonly preLogin?: () => void,
    readonly responseHandler: (response: gapi.auth2.GoogleUser) => void
    readonly failureHandler?: (error: string) => void,
    readonly children?: ReadonlyArray<JSX.Element> | JSX.Element
    readonly renderOptions?: {
        readonly width?: number,
        readonly height?: number,
        readonly longtitle?: boolean,
        readonly theme?: 'light' | 'dark',
    }
}

export function getScript(source: string, callback: () => void): void {
    const el = document.createElement('script')
    el.addEventListener('load', callback)
    el.setAttribute('src', source)

    document.body.appendChild(el)
}

export class GoogleLoginButton extends Component<IGoogleLoginButtonProps> {

    constructor(props: IGoogleLoginButtonProps) {
        super(props)
    }

    componentDidMount(): void {
        const {classNames, children} = this.props
        // Loading google plateform api, if it's not loaded
        if (typeof gapi === 'undefined') {
            this.setState({ disabled: true })
            getScript('https://apis.google.com/js/platform.js', () => {
                gapi.load('auth2', () => {
                    gapi.auth2.init(this.props.clientConfig)
                    if (!classNames && !children) {
                        gapi.signin2.render('ts-google-react-login', {...this.props.renderOptions})
                    }
                })
            })
        } else if (!classNames && !children) {
            gapi.signin2.render('ts-google-react-login', {...this.props.renderOptions})
        }
    }
    readonly clickHandler = () => {
        const { preLogin, responseHandler, singInOptions, failureHandler } = this.props

        // if there is pre login task
        preLogin && preLogin()

        const googleAuth = gapi.auth2.getAuthInstance()
        if (googleAuth) {
            googleAuth.signIn(singInOptions)
                .then(googleUser => {
                    responseHandler(googleUser)
                })
                .catch(reason => {
                    failureHandler && failureHandler(reason.error)
                })
        }

    }

    render(): JSX.Element {
        const { classNames, buttonText, children } = this.props

        return (
            <div
                id='ts-google-react-login'
                className={`${classNames ? classNames : ''}`}
                onClick={this.clickHandler}
            >
                {children ? children : null}
                {buttonText ? buttonText : null}
            </div>
        )
    }
}
