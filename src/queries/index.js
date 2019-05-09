import { gql } from 'apollo-boost';

/* Recipes Queries */
const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            name
            description
            instructions
            category
            likes
            createdDate
        }
    }
`;

/* Recipes Mutations */

/* User Queries */

/* User Mutations */

const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signupUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;

export {GET_ALL_RECIPES, SIGNUP_USER, SIGNIN_USER}