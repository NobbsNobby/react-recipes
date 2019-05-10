import React from 'react';
import { NavLink } from 'react-router-dom';
import Signout from '../Auth/Signout';

const Navbar = ({ session }) => (
    <nav>
        {session && session.getCurrentUser ? <NavbarAuth session={session}/> : <NavbarUnAuth/>}
    </nav>
);


const NavbarAuth = ({ session }) => (
    <>
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <NavLink exact to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink exact to="/recipe/add">Add Recipe</NavLink>
            </li>
            <li>
                <NavLink exact to="/profile">Profile</NavLink>
            </li>
            <li>
                <Signout/>
            </li>
        </ul>
        <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
    </>
);

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink exact to="/">Home</NavLink>
        </li>
        <li>
            <NavLink exact to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink exact to="/signin">Signin</NavLink>
        </li>
        <li>
            <NavLink exact to="/signup">Signup</NavLink>
        </li>
    </ul>
);

export default Navbar;