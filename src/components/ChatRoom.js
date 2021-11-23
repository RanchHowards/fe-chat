import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { MESSAGE_ADDED, ADD_MESSAGE, FIND_CHAT } from '../queries'
import { useQuery, useSubscription, useMutation } from '@apollo/client'

const ChatRoom = ({ user }) => {
  const id = useParams().id

  const [message, setMessage] = useState('')
  const [addMessage] = useMutation(ADD_MESSAGE)

  const { data, loading, error } = useQuery(FIND_CHAT, { variables: { id } })
  const handleMessage = (event) => {
    event.preventDefault()
    if (message.length > 0) {
      const chatID = id
      addMessage({ variables: { message, author: user, chatID } })
      setMessage('')
    }
  }

  const updateCacheWith = (newMessage, client) => {
    // const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({
      query: FIND_CHAT,
      variables: { id },
    })

    client.writeQuery({
      query: FIND_CHAT,
      variables: { id },
      data: {
        findChat: {
          ...dataInStore.findChat,
          messages: dataInStore.findChat.messages.concat({
            ...newMessage,
            id: Math.floor(Math.random() * 10000),
          }),
        },
      },
    })
  }

  useSubscription(MESSAGE_ADDED, {
    variables: { chatID: id },
    onSubscriptionData: ({ subscriptionData, client }) => {
      const newMessage = subscriptionData.data.messageAdded
      updateCacheWith(newMessage, client)
    },
  })
  if (loading || error) return <h1 style={{ color: 'white' }}>LOADING/ERROR</h1>

  const chat = data.findChat
  const messages = chat.messages

  return (
    <div>
      <header className="chatroom-header">
        <div className="chatroom-header-container">
          <h1 style={{ color: 'white', margin: '0' }}>{chat.name}</h1>
          <Link to="/rooms">
            <button>BACK</button>
          </Link>
        </div>
      </header>
      <section className="chatroom-container">
        <form onSubmit={(e) => handleMessage(e)}>
          <input
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          ></input>
          <button type="submit">Send</button>
        </form>

        <ul className="chat-box">
          {messages.map((msg) => (
            <li
              className="message"
              style={
                user === msg.author
                  ? { backgroundColor: 'green', alignSelf: 'flex-start' }
                  : {
                      backgroundColor: 'rgba(200, 200, 33)',
                      alignSelf: 'flex-end',
                    }
              }
              key={msg.id}
            >
              <span className="message-author">{msg.author}</span>
              {msg.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
export default ChatRoom
