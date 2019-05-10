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
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile';
import RecipePage from './components/Recipe/RecipePage';
import Search from './components/Recipe/Search';
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
        });
    },
    onError: ({ networkError }) => {
        if (networkError) {
            console.log('Network Error', networkError);
        }
    }
});

const Root = ({ refetch, session }) => {
    return (
        <Router>
            <>
                <Navbar session={session}/>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/search" component={Search}/>
                    <Route
                        path="/signin"
                        render={() => <Signin refetch={refetch}/>}/>
                    <Route
                        path="/signup"
                        render={() => <Signup refetch={refetch}/>}/>
                    <Route
                        path="/recipe/add"
                        render={() => <AddRecipe session={session}/>}/>
                    <Route
                        path="/recipes/:_id"
                        component={RecipePage}/>
                    <Route
                        path="/profile"
                        render={() => <Profile session={session}/>}
                    />
                    <Redirect to="/"/>
                </Switch>
            </>
        </Router>
    );
};


const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession/>
    </ApolloProvider>
    , document.getElementById('root'));
