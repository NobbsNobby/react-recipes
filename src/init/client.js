// Apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

// resolvers
import {typeDefs, resolvers} from './resolvers';
import gql from 'graphql-tag';


const cache = new InMemoryCache();

const client = new ApolloClient({
    link: ApolloLink.from([
        setContext(() => {
            const token = localStorage.getItem('token');
            return {
                headers: {
                    authorization: token
                }
            };
        }),
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            }
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'same-origin'
        })
    ]),
    cache,
    resolvers,
    typeDefs
});

cache.writeData({
    data: {
        isLoggedIn: true,
        cartItems: []
    },
});

export default client;