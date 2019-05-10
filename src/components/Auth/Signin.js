import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import {withRouter} from 'react-router-dom';


const initialState = {
    username: '',
    password: ''
};

const Signin = (props) => {
    const [form, setForm] = useState(initialState);

    const _changeField = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const _handleSubmit = async (e, signinUser) => {
        e.preventDefault();
        const { data } = await signinUser();
        localStorage.setItem('token', data.signinUser.token);
        await props.refetch();
        setForm(initialState);
        props.history.push('/')
    };

    const _validateForm = () => !form.username || !form.password;

    return <div className='App'>
        <h2 className='App'>Signin</h2>
        <Mutation
            mutation={SIGNIN_USER}
            variables={{
                username: form.username,
                password: form.password
            }}
        >
            {(signinUser, { data, loading, error }) => {
                return <form
                    className='form'
                    onSubmit={e => _handleSubmit(e, signinUser)}
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={_changeField}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
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

export default withRouter(Signin);