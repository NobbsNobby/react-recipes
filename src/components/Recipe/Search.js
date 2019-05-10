import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../../queries';
import SearchItem from './SearchItem';


const Search = () => {
    const [searchResults, changeResult] = useState([]);

    const _handleChange = ({ searchRecipes }) => {
        changeResult(searchRecipes);
    };

    return (
        <ApolloConsumer>
            {client => (
                <div className="App">
                    <input
                        type="search"
                        placeholder="Search for Recipes"
                        onChange={async (e) => {
                            e.persist();

                            const { data } = await client.query({
                                query: SEARCH_RECIPES,
                                variables: { searchTerm: e.target.value }
                            });
                            _handleChange(data);
                        }}
                    />
                    <ul>
                        {searchResults.map(recipe => (
                                <SearchItem key={recipe._id} {...recipe}/>
                            )
                        )}
                    </ul>
                </div>
            )}
        </ApolloConsumer>
    );
};

export default Search;
