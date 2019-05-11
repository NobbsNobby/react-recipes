import gql from 'graphql-tag';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        cartItems: [ID!]!
    }
`;

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

export const resolvers = {
    Mutation: {
        changeLoginStatus: (root, args, { cache }) => {
            const { isLoggedIn } = cache.readQuery({ 
                query: IS_LOGGED_IN});

            cache.writeData({ data: { isLoggedIn: !isLoggedIn } });
            console.log('resolver data', isLoggedIn);
            return isLoggedIn
        },
    },
};