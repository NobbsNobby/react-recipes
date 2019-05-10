import { gql } from 'apollo-boost';
import { recipeFragments } from './fragments';
/* Recipes Queries */
const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            _id
            name
            category
        }
    }
`;

const GET_RECIPE = gql`
    query($_id: ID!) {
        getRecipe(_id: $_id) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

const SEARCH_RECIPES = gql`
    query($searchTerm: String) {
        searchRecipes(searchTerm: $searchTerm) {
            ...LikeRecipe
        }
    }
    ${recipeFragments.like}
`;

const GET_USER_RECIPES = gql`
    query($username: String!) {
        getUserRecipes(username: $username) {
            ...LikeRecipe
        }
    }
    ${recipeFragments.like}
`;

/* Recipes Mutations */

const ADD_RECIPE = gql`
    mutation($name: String!,
        $category: String!
        $description: String!,
        $instructions: String!,
        $username: String) {
        addRecipe(
            name: $name,
            category: $category,
            description: $description,
            instructions: $instructions,
            username: $username
        ) {
            ...CompleteRecipe
        }
    }
    ${recipeFragments.recipe}
`;

const DELETE_USER_RECIPE = gql`
    mutation($_id: ID!){
        deleteUserRecipe(_id: $_id) {
            _id
        }
    }
`;
/* User Queries */

const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            joinDate
            email
        }
    }
`;

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

export {
    GET_ALL_RECIPES,
    SIGNUP_USER,
    SIGNIN_USER,
    GET_CURRENT_USER,
    GET_RECIPE,
    ADD_RECIPE,
    SEARCH_RECIPES,
    GET_USER_RECIPES,
    DELETE_USER_RECIPE
};