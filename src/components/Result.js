import React from 'react';

class Result extends React.Component {
    render() {
        const result = this.props.result;
        let searchResult;
        let userName;

        if (result.data) {
            userName = result.data.map((user, index) => {
                const className = this.props.activeUser == user.id ? 'result__item result__item--active' : 'result__item';
                return (
                    <li className={className}
                        key={index}
                        data-user={user.login}
                        data-index={user.id}
                        onClick={this.props.getRepos}>

                        {user.login}

                    </li>
                )
            });
            searchResult =
                <div className="result__container">
                    <div className="result__wrapper">
                        <h2 className="result__title">
                            Select User:
                        </h2>
                    </div>
                    <ul className="result__list">
                        {userName}
                    </ul>
                </div>

        } else {
            if (result.error) {
                searchResult =
                    <p className="result__error">
                        {result.error}
                    </p>
            }
        }
        return (
            <section className="result">
                {searchResult}
            </section>
        )
    }
}

export default Result;
