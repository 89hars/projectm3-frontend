import React from 'react'
import Layouts from '../components/Layouts'
import { useSearch } from '../contexts/SearchContext'
function SearchPage() {
    const { token } = useSearch();

    return (
        <Layouts title={'Search Results'}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{token?.results.length < 1 ? 'No products found' : `Found ${token.results.length}`}</h6>
                    <ul>
                        {token?.results.map((eachArt) => (
                            <li key={eachArt._id}>
                                <Link to={`/details/${eachArt._id}`}>
                                    {eachArt.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </Layouts>


    )
}

export default SearchPage
