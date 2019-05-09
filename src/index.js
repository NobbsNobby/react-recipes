// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
//Instruments
import './index.css';


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({networkError}) => {
        if (networkError) {
            console.log('Network Error', networkError);
            // if(networkError.statusCode === 401) {
            //     localStorage.removeItem('token')
            // }
        }
    }
});

const Root = () =>
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Redirect to="/"/>
        </Switch>
    </Router>;

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root/>
    </ApolloProvider>
    , document.getElementById('root'));
