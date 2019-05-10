import React from 'react';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../../queries';
import RecipeItem from '../Recipe/RecipeItem';

const App = () =>
    <div className='App'>
        <h1>Home</h1>
        <Query
            query={GET_ALL_RECIPES}
        >
            {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error</div>;
                return (
                    <div>
                        {data.getAllRecipes.map(
                            recipe => (
                                <RecipeItem key={recipe._id} {...recipe}/>
                            )
                        )}
                    </div>
                );
            }}
        </Query>
    </div>;


export default App;