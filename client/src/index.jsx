import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';
import api from './apis/apis.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    api.getTop25Repos()
      .then(res => {
        console.log("componentDidMount", res.data)
        this.setState({ repos: res.data })
      })
      .catch(() => console.error('Something wrong happened or no repos in database!'))
  }

  search(term) {
    console.log(`${term} was searched`);

    axios.post(`repos/${term}`)
      .then(() => console.log('Username has been posted!'))
      .then(() => api.getTop25Repos())
      .then(res => {
        console.log('search add repo button', res.data)
        this.setState({ repos: res.data })
      })
      .catch(() => console.error('Something wrong happened!'))
  }

  render() {
    let count = 0;
    const top25 = this.state.repos.slice(0, 25).map(({ id, name, created_at, star_count, login, url }) => {
      return (
        <tr key={id}>
          <td>{count += 1}</td>
          <td>{id}</td>
          <td>{login}</td>
          <td>{name}</td>
          <td>{star_count}</td>
          <td><a href={url} target="_blank">{url}</a></td>
          <td>{created_at}</td>
        </tr>
      )
    })
    // console.log(top25)

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Github Fetcher</h1>
        {/* <h1>{this.state.repos[0]}</h1> */}
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
        <br />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Id</th>
              <th>Login</th>
              <th>Name</th>
              <th>Star Count</th>
              <th>URL</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {top25}
            {/* <tr>
              <td>231802923</td>
              <td>anthonysim.github.io</td>
              <td>2020-01-04T17:35:55Z</td>
              <td>0</td>
              <td>anthonysim</td>
              <td><a href="https://www.google.com" target="_blank">https://github.com/anthonysim/anthonysim.github.io</a></td>
            </tr> */}
          </tbody>
        </table>
      </div >
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));