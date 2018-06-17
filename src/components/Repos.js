import React from 'react';

class Repos extends React.Component {
    state = {
        repos: {
            data: undefined,
            error: undefined
        },
        filtered: []

    };
    static getDerivedStateFromProps(props, state) {
        if (props.repos.data !== state.repos.data) {
            return {
                repos: {
                    data: props.repos.data,
                    error: props.repos.error
                },
                filtered: props.repos.data
            }
        }
        return null
    }
    reposFilter = (e) => {
        e.preventDefault();
        let updatedList = this.state.repos.data;
        const value = e.target.value.toLowerCase();
        updatedList = updatedList.filter(function(item){
            const inName = item.name ? item.name.toLowerCase().search(value) !== -1 : false;
            const inDescription = item.description ? item.description.toLowerCase().search(value) !== -1 : false;
            return inName || inDescription
        });
        this.setState({
            filtered: updatedList
        });
    };

    render() {
        let repoResult;
        let repoName;

        if (this.state.repos.data) {
            repoName = this.state.filtered.map((repo, index) => {
                const className = this.props.activeRepo == repo.id ? 'repos__item repos__item--active' : 'repos__item';
                return (
                    <li className={className}
                        key={index}
                        data-repo={repo.full_name}
                        data-index={repo.id}
                        onClick={this.props.getDetail}>

                        {repo.name}
                        <span className="repos__stars-text">{repo.stargazers_count}</span>
                        <svg className="repos__stars-icon" viewBox="0 0 14 16" version="1.1" width="14" height="16"
                             aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                        </svg>
                    </li>
                )
            });
            repoResult =
                <div className="repos__wrapper">

                    <form className="repos__form">
                        <h2 className="repos__title">
                            Search:
                        </h2>
                        <input type="text" name="repo" onChange={this.reposFilter}/>
                    </form>

                    <ul className="repos__list">
                        {repoName}
                    </ul>
                </div>

        } else {
            if (this.state.repos.error) {
                repoResult =
                    <p className="repos__error">
                        {this.state.repos.error}
                    </p>
            }
        }
        return (
            <section className="repos">
                {repoResult}
            </section>
        )
    }
}

export default Repos;
