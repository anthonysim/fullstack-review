import axios from 'axios';

export const getTop25Repos = () => {
  // console.log('top 25 repos!')

  return axios.get('http://localhost:1128/repos')
    .then(() => console.log('Retrieved 25 Top Repos!'))
    .catch(() => console.error('Something wrong happened!'))
}



export default { getTop25Repos };
