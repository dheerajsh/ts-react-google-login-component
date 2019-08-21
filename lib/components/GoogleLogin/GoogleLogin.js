"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function getScript(source, callback) {
    var el = document.createElement('script');
    el.onload = callback;
    el.src = source;
    document.body.appendChild(el);
}
var GoogleLoginButton = /** @class */ (function (_super) {
    __extends(GoogleLoginButton, _super);
    function GoogleLoginButton(props) {
        var _this = _super.call(this, props) || this;
        _this.clickHandler = function () {
            var _a = _this.props, preLogin = _a.preLogin, responseHandler = _a.responseHandler, singInOptions = _a.singInOptions, onFailure = _a.onFailure;
            // if there is pre login task
            preLogin && preLogin();
            var googleAuth = gapi.auth2.getAuthInstance();
            if (googleAuth) {
                googleAuth.signIn(singInOptions)
                    .then(function (googleUser) {
                    responseHandler(googleUser);
                })
                    .catch(function (reason) {
                    onFailure && onFailure(reason.error);
                });
            }
        };
        // Loading google plateform api, if it's not loaded
        if (typeof gapi === 'undefined') {
            _this.setState({ disabled: true });
            getScript('https://apis.google.com/js/platform.js', function () {
                gapi.load('auth2', function () {
                    gapi.auth2.init(props.clientConfig);
                    _this.setState({ disabled: false });
                });
            });
        }
        else {
            _this.setState({ disabled: false });
        }
        return _this;
    }
    GoogleLoginButton.prototype.render = function () {
        var _a = this.props, classNames = _a.classNames, buttonText = _a.buttonText;
        return (React.createElement("button", { className: "" + (classNames ? classNames : ''), onClick: this.clickHandler, disabled: this.state.disabled },
            React.Children,
            buttonText));
    };
    return GoogleLoginButton;
}(React.Component));
exports.GoogleLoginButton = GoogleLoginButton;
//# sourceMappingURL=GoogleLogin.js.map