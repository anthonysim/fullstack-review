import axios from 'axios';

export const getTop25Repos = () => {
  return axios.get('repos')
}

export default { getTop25Repos };
