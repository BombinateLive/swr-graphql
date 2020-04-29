import fetch from '../libs/fetch';

import useSWR from 'swr'

const query = {
  'query': 'query { user(limit:10, order_by:{createdAt: desc}) { id firstName } }'
};

const getData = async(...args) => {
  return await fetch(query);
};

export default () => {
  const { data, error } = useSWR(query, getData);
  if(error) {
    return <div>Error...</div>
  }
  if(!data) {
    return <div>Loading...</div>
  }

  return ( 
    <div style={{ textAlign: 'center' }}>
      <h1>User from database</h1>
      <div>
      {
        data.user.map(user => 
          <div key={user.id}>
            <p>{user.firstName}</p>
          </div>
        )
      }
      </div>
    </div>
  )
}
