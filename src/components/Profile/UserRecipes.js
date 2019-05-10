import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER, GET_USER_RECIPES } from '../../queries';
import { Link } from 'react-router-dom';

const UserRecipes = ({ username }) => {

    const _handleDelete = async (deleteUserRecipe) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
        if (confirmDelete) {
            const { data } = await deleteUserRecipe();
            console.log(data);
        }
    };

    return (
        <Query query={GET_USER_RECIPES} variables={{ username }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;

                return (
                    <ul>
                        {data.getUserRecipes.map(recipe => (
                            <li key={recipe._id}>
                                <Link to={`/recipes/${recipe._id}`}><p>{recipe.name}</p></Link>
                                <Mutation
                                    mutation={DELETE_USER_RECIPE}
                                    variables={{ _id: recipe._id }}
                                    refetchQueries={() => [
                                        { query: GET_ALL_RECIPES },
                                        { query: GET_CURRENT_USER },
                                    ]}
                                    update={(cache, { data: { deleteUserRecipe } }) => {
                                        const { getUserRecipes } = cache.readQuery({
                                            query: GET_USER_RECIPES,
                                            variables: { username }
                                        });

                                        cache.writeQuery({
                                            query: GET_USER_RECIPES,
                                            variables: { username },
                                            data: {
                                                getUserRecipes: getUserRecipes.filter(
                                                    recipe => recipe._id !== deleteUserRecipe._id
                                                )
                                            }
                                        });
                                    }}
                                >
                                    {(deleteUserRecipe, {loading}) => {
                                        return (
                                            <p
                                                style={{ marginBottom: '0' }}
                                                className="delete-button"
                                                onClick={() => _handleDelete(deleteUserRecipe)}
                                            >
                                                {loading ? 'deleting...' : 'X'}
                                            </p>
                                        );
                                    }}
                                </Mutation>
                            </li>)
                        )}
                    </ul>
                );
            }}
        </Query>
    );
};

export default UserRecipes;