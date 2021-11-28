import React, { Component } from 'react';
import NotificationButton from './NotificationButton';
import NotificationForm from './NotificationForm';
import DirectionButton from './DirectionButton';
import DirectionForm from './DirectionForm';

class Header extends Component {

    render() {
        return (
            <div class="row">
                <div class="col-md-12">
                    <div class="float-right mb-4 mx-3">

                        <NotificationButton />
                        <NotificationForm />

                        <DirectionButton />
                        <DirectionForm />

                        <img class="avatar" src="./images/user.png" alt="Loich Logo" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;