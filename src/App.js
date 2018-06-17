import React, { Component } from 'react';
import Search from './components/Search';
import Result from './components/Result';
import Repos from './components/Repos';
import Detail from './components/Detail';

class App extends Component {
    state = {
        users: {
            data: undefined,
            error: ""
        },
        repos: {
            data: undefined,
            error: ""
        },
        detail: {
            data: undefined,
            error: ""
        },
        activeUser: undefined,
        activeRepo: undefined
    };
    getUsers = async (e) => {
        e.preventDefault();
        const user = e.target.elements.user.value;
        const api_call = await fetch(` https://api.github.com/search/users?q=${user}`);
        const data = await api_call.json();
        this.setState({
            repos: {
                data: undefined,
                error: ""
            },
            detail: {
                data: undefined,
                error: ""
            }
        });
        if (user) {
            this.setState({
                users: {
                    data: data.items,
                    error: ""
                }
            });
        } else {
            this.setState({
                users: {
                    data: undefined,
                    error: "Please, enter the name of user..."
                }
            });
        }
    };
    getRepos = async (e) => {
        e.preventDefault();
        const selectedUser = e.target.dataset.user;
        const userIndex = e.target.dataset.index;
        this.setState({
            detail: {
                data: undefined,
                error: ""
            }

        });
        await fetch(` https://api.github.com/users/${selectedUser}/repos?page=1&per_page=100`)
            .then(response => response.json())
            .catch(() => {
                this.setState({
                    repos: {
                        data: undefined,
                        error: "Network error, sorry, try again later..."
                    }
                });
            }).then(response => {
                if (response) {
                    console.log(response)

                    this.setState({
                        repos: {
                            data: response,
                            error: ""
                        },
                        activeUser: userIndex
                    });
                } else {
                    this.setState({
                        repos: {
                            data: undefined,
                            error: "Sorry, repos not found..."
                        },
                        activeUser: userIndex
                    })
                }
            })
    };
    getDetail = async (e) => {
        e.preventDefault();
        const selectedRepo = e.target.dataset.repo;
        const repoIndex = e.target.dataset.index;
        await fetch(`https://api.github.com/repos/${selectedRepo}/readme`)
            .then(response => response.json())
            .catch(() => {
                this.setState({
                    detail: {
                        data: undefined,
                        error: "Network error, sorry, try again later..."
                    }
                })
            })
            .then(response => {
                if (response.content) {
                    this.setState({
                        detail: {
                            data: atob(response.content),
                            error: ""
                        },
                        activeRepo: repoIndex
                    })
                } else {
                    this.setState({
                        detail: {
                            data: undefined,
                            error: "Sorry, no README file found..."
                        },
                        activeRepo: repoIndex
                    })
                }
            })
    };
    render() {
        return (
          <main className="page-main">
              <Search getUsers={this.getUsers}/>
              <div className="page-main__wrapper">
                  <Result result={this.state.users} activeUser={this.state.activeUser} getRepos={this.getRepos}/>
                  <Repos repos={this.state.repos} activeRepo={this.state.activeRepo} getDetail={this.getDetail}/>
                  <Detail detail={this.state.detail}/>
              </div>
          </main>
        );
  }
}

export default App;
