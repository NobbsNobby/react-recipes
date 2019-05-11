import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

const GET_CART_ITEMS = gql`
    query getCartItems {
        cartItems @client
    }
`;

const TOGGLE_STATUS = gql`
    mutation changeLoginStatus {
        changeLoginStatus @client
    }
`;

const LogoutButton = () => {
    return (
        <Query query={IS_LOGGED_IN}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;
                console.log('q data', data);
                return (
                    <Mutation mutation={TOGGLE_STATUS}>
                        {(mutationFunc) => {
                            return (
                                <button onClick={mutationFunc}>
                                    {data.isLoggedIn ? 'logout' : 'login'}
                                </button>
                            )
                                ;
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

const Cart = () => {
    return (
        <Query query={GET_CART_ITEMS}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;
                return (
                    <>
                        <header>My Cart</header>
                        {!data.cartItems || !data.cartItems.length ? (
                            <p data-testid="empty-message">No items in your cart</p>
                        ) : (
                            <ul>
                                {data.cartItems.map(launchId => (
                                    <li key={launchId}>{launchId}</li>
                                ))}
                            </ul>
                        )}
                    </>
                );
            }}
        </Query>
    );
};

const LocalData = () => {
    return (
        <Query query={IS_LOGGED_IN}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;

                return (
                    <>
                        {data.isLoggedIn ? <p>logged</p> : <p>no login</p>}
                        <LogoutButton/>
                        <Cart/>
                    </>
                );
            }}
        </Query>
    );
};

export default LocalData;