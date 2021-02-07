import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search(term) {
    // TODO
    console.log(`${term} was searched`);

    axios.post(`http://localhost:1128/repos/${term}`)
      // need to do a get top 25 and update state.repos then render on the table below
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
        <br />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Owner_Id</th>
              <th>Owner_Login</th>
              <th>Repos_Url</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>231802923</td>
              <td>anthonysim.github.io</td>
              <td>31682285</td>
              <td>anthonysim</td>
              <td>https://api.github.com/users/anthonysim/repos</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));