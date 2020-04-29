import Link from 'next/link'
import subscribe from '../libs/subscribe'

import useSWR from 'swr'

const USER_SUBSCRIPTION = `
  subscription {
    user(order_by: {createdAt: desc}, limit: 10) {
      id
      firstName
      createdAt
    }
  }
`;

const subscribeData = async(...args) => {
  return subscribe(USER_SUBSCRIPTION);
};

export default () => {
  const { data } = useSWR('subscription', subscribeData);
  if(!data) {
    return <div>Loading...</div>
  }

  return ( 
    <div style={{ textAlign: 'center' }}>
      <h1>Subscribed to Latest 10 user from the database</h1>
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
