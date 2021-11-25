import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user, setUser }) => {
  return (
    <div className="landing">
      <form>
        <input
          id="username-input"
          value={user}
          onChange={({ target }) => setUser(target.value)}
          placeholder="username"
        ></input>
        <Link to="/rooms">
          {!user ? (
            <button className="enter-button" id="enter-button" disabled>
              Enter
            </button>
          ) : (
            <button className="enter-button" type="submit">
              Enter
            </button>
          )}
        </Link>
      </form>
    </div>
  )
}
export default Home
