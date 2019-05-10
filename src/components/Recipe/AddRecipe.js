import React, { useState, useEffect } from 'react';
import { Mutation, Query } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import { gql } from 'apollo-boost';
const initialState = {
    name: '',
    category: '',
    description: '',
    instructions: '',
    username: ''
};

const query = gql`{
    currencyOfInterest @client
}`;

const FormData = () => (
<Query query={query}>
    {({ data, loading, error }) => {
        console.log('q data',data);
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        return (
            <div>123</div>
        )
            ;
    }}
</Query>
)

const AddRecipe = props => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        setForm(form => ({
            ...form,
            username: props.session.getCurrentUser.username
        }));
    }, [props.session.getCurrentUser.username]);

    const _changeField = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const _validateForm = () =>
        !form.name ||
        !form.category ||
        !form.description ||
        !form.instructions ||
        !form.instructions;

    const _handleSubmit = async (e, addRecipe) => {
        e.preventDefault();
        await addRecipe();
        setForm(initialState);
        props.history.push('/');
    };

    const _updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });

    };

    return (
        <Mutation
            mutation={ADD_RECIPE}
            variables={{
                name: form.name,
                category: form.category,
                description: form.description,
                instructions: form.instructions,
                username: form.username
            }}
            refetchQueries={() => [
                { query: GET_USER_RECIPES, variables: { username: form.username } },
            ]}
            update={_updateCache}
        >
            {(addRecipe, { data, loading, error }) => {
                return (
                    <div className="App">
                        {/*<FormData/>*/}
                        <h2 className="App">Add Recipe</h2>
                        <form className="form" onSubmit={e => _handleSubmit(e, addRecipe)}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Recipe name"
                                value={form.name}
                                onChange={_changeField}
                            />
                            <select
                                name="category"
                                value={form.category}
                                onChange={_changeField}
                            >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                            <input
                                type="text"
                                name="description"
                                placeholder="Add description"
                                value={form.description}
                                onChange={_changeField}
                            />
                            <textarea
                                name="instructions"
                                placeholder="Add instructions"
                                value={form.instructions}
                                onChange={_changeField}
                            />
                            <button type="submit" disabled={loading || _validateForm()}>
                                Submit
                            </button>
                            {error && <Error error={error}/>}
                        </form>
                    </div>
                );
            }}
        </Mutation>
    );
};

export default withAuth(
    session => session && session.getCurrentUser
)(withRouter(AddRecipe));
