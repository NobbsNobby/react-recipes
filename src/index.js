// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

// Apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';


const client = new ApolloClient({
    link: ApolloLink.from([
        setContext(() => {
            const token =  localStorage.getItem('token');
            return {
                headers: {
                    authorization: token
                }
            }
        }),
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'same-origin'
        })
    ]),
    cache: new InMemoryCache()
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
