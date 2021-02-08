import axios from 'axios';

export const getTop25Repos = () => {
  return axios.get('http://localhost:1128/repos')
}

export default { getTop25Repos };
