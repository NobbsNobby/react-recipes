import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import {withRouter} from 'react-router-dom';
import Error from '../Error';

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
};

const Signup = (props) => {
    const [form, setForm] = useState(initialState);

    const _changeField = (e,) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const _handleSubmit = async (e, signupUser) => {
        e.preventDefault();
        const { data } = await signupUser();
        localStorage.setItem('token', data.signupUser.token);
        await props.refetch();
        setForm(initialState);
        props.history.push('/');
    };

    const _validateForm = () =>
        !form.username ||
        !form.email ||
        !form.password ||
        !form.passwordConfirmation;

    return <div className='App'>
        <h2 className='App'>Signup</h2>
        <Mutation
            mutation={SIGNUP_USER}
            variables={{
                username: form.username,
                email: form.email,
                password: form.password
            }}
        >
            {(signupUser, { data, loading, error }) => {
                return <form
                    className='form'
                    onSubmit={e => _handleSubmit(e, signupUser)}
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={_changeField}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail Address"
                        value={form.email}
                        onChange={_changeField}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={_changeField}
                    />
                    <input
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm Password"
                        value={form.passwordConfirmation}
                        onChange={_changeField}
                    />
                    <button
                        type="submit"
                        className="button"
                        disabled={loading || _validateForm()}
                    >
                        Subscribe
                    </button>
                    {error && <Error error={error}/>}
                </form>;
            }}
        </Mutation>
    </div>;
};

export default withRouter(Signup);