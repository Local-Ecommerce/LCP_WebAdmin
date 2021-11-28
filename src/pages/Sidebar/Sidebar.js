import React, { Component } from 'react';
import Logo from './Logo';
import Navbar from './Navbar';

class Sidebar extends Component {

    render() {
        return (
            <nav id="sidebar">
                <Logo />
                <Navbar />
            </nav>   
        );
    }
}

export default Sidebar;