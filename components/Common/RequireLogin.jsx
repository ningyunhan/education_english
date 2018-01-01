import React, { Component } from 'react';
import InlineLogin from './InlineLogin';
import { Components } from 'meteor/nova:core';

class RequireLogin extends Component {
    render() {
        return (
            <Components.ShowIf
                check={(currentUser, document) => !!currentUser}
                failureComponent={<InlineLogin />}
                {...this.props}
            >
                {this.props.children}
            </Components.ShowIf>
        );
    }
}

export default RequireLogin;