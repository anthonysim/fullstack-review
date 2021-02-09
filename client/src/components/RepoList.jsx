import React from 'react';

const RepoList = (props) => (
  <div style={{ textAlign: "center" }}>
    <h4 > Repo List Component </h4>
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;