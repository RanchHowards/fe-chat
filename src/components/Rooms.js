import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { CHATS, CREATE_CHAT } from '../queries'
import { useQuery, useMutation } from '@apollo/client'

const Rooms = () => {
  const [name, setName] = useState('')

  const [createChat] = useMutation(CREATE_CHAT, {
    update: (store, response) => {
      try {
        const dataInStore = store.readQuery({ query: CHATS })
        store.writeQuery({
          query: CHATS,
          data: {
            chats: [
              ...dataInStore.chats,
              { ...response.data.createChat, messages: [] },
            ],
          },
        })
      } catch (err) {
        throw new Error(
          'error from App.js trying to write to Cache from createChat',
          err.message
        )
      }
    },
  })
  const handleChat = (e) => {
    e.preventDefault()
    createChat({ variables: { name } })
    setName('')
  }
  const { data, loading, error } = useQuery(CHATS)

  if (loading || error)
    return (
      <div class="loading">
        <img src="../../public/Loading.svg" alt="loading animation" />
      </div>
    )
  const chats = data.chats

  return (
    <div>
      <header className="chatroom-header">
        <div className="chatroom-header-container">
          <Link to="/home">
            <h1>ChatApp</h1>
          </Link>
        </div>
      </header>
      <section className="chatroom-container">
        <form id="chatroom-form" onSubmit={(e) => handleChat(e)}>
          <input
            className="chatroom-input"
            placeholder="chatroom name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
          <button type="submit">Create Chat</button>
        </form>

        <ul id="chatroom-list">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link to={chat.id}>
                <button className="chat-button">{chat.name}</button>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
export default Rooms
