import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user, setUser }) => {
  return (
    <div>
      <form>
        <input
          value={user}
          onChange={({ target }) => setUser(target.value)}
          placeholder="user name"
        ></input>
        <Link to="/rooms">
          {!user ? (
            <button disabled>Enter Chat</button>
          ) : (
            <button type="submit">Enter Chat</button>
          )}
        </Link>
      </form>
    </div>
  )
}
export default Home
