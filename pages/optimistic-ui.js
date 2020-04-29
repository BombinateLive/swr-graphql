import useSWR, { mutate, trigger } from 'swr'
import fetch from '../libs/fetch'

const uuidv1 = require('uuid/v1');

const query = {
  'query': 'query { user(limit: 10, order_by: {createdAt: desc}) { id firstName } }'
};

const getData = async(...args) => {
  return await fetch(query);
};

export default () => {
  const [text, setText] = React.useState('');
  const { data } = useSWR(query, getData)

  async function handleSubmit(event) {
    event.preventDefault()
    // mutate current data to optimistically update the UI
    mutate(query, {user: [...data.user, {id: uuidv1(), firstName: text}]}, false)
    // send text to the API
    const mutation = {
      'query': 'mutation user($firstName: String!) { insert_user(objects: [{firstName: $firstName}]) { affected_rows } }',
      'variables': { firstName: text}
    };
    await fetch(mutation);
    // revalidate
    trigger(mutation);
    setText('')
  }

  return <div>
    <h1>Insert a new user</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={event => setText(event.target.value)}
        value={text}
      />
      <button>Create</button>
    </form>
    <ul>
      {data ? data.user.map(user => <li key={user.id}>{user.firstName}</li>) : 'loading...'}
    </ul>
  </div>
}
