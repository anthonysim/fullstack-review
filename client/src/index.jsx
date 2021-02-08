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
        console.log(res.data)
        this.setState({ repos: res.data })
      })
      .catch(() => console.error('Something wrong happened!'))
  }

  search(term) {
    console.log(`${term} was searched`);

    axios.post(`http://localhost:1128/repos/${term}`)
      // need to do a get top 25 and update state.repos then render on the table below
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  render() {
    let count = 0;
    const top25 = this.state.repos.slice(0, 25).map(({ id, name, created_at, star_count, login, url }) => {
      return <tr key={id}><td>{count += 1}</td><td>{id}</td><td>{name}</td><td>{created_at}</td><td>{star_count}</td><td>{login}</td><td><a href={url} target="_blank">{url}</a></td></tr>
    })
    // console.log(top25)

    return (
      <div>
        <h1>Github Fetcher</h1>
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
              <th>Name</th>
              <th>Created At</th>
              <th>Star Count</th>
              <th>Login</th>
              <th>URL</th>
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
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));