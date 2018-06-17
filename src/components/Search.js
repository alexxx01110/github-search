import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className="search-box">
                <h2 className="search-box__title">
                    Username:
                </h2>
                <form className="search-box__form" onSubmit={this.props.getUsers}>
                    <input type="text" name="user"/>
                    {/*<button>Go</button>*/}
                </form>
            </div>
        )
    }
}

export default Search;
