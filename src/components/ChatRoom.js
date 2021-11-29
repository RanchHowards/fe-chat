import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import {
  MESSAGE_ADDED,
  ADD_MESSAGE,
  FIND_CHAT,
  DELETE_CHAT,
  CHATS,
} from '../queries'
import { useQuery, useSubscription, useMutation } from '@apollo/client'

const ChatRoom = ({ user }) => {
  //ROUTER INFO
  const id = useParams().id
  const navigate = useNavigate()

  //STATE
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState(null)
  const [redirect, setRedirect] = useState(false)

  //QUERIES
  const { data, loading, error } = useQuery(FIND_CHAT, { variables: { id } })

  //MUTATIONS
  const [addMessage] = useMutation(ADD_MESSAGE)
  const [deleteChat] = useMutation(DELETE_CHAT)

  const updateCacheWith = (newMessage, client) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    try {
      const dataInStore = client.readQuery({
        query: FIND_CHAT,
        variables: { id },
      })

      if (!includedIn(dataInStore.findChat.messages, newMessage)) {
        client.writeQuery({
          query: FIND_CHAT,
          variables: { id },
          data: {
            findChat: {
              ...dataInStore.findChat,
              messages: dataInStore.findChat.messages.concat({
                ...newMessage,
                chatID: id,
              }),
            },
          },
        })
      }
    } catch (err) {
      throw new Error(
        'error from App.js trying to write to Cache from createChat',
        err.message
      )
    }
  }

  const handleMessage = (event) => {
    event.preventDefault()
    if (message.length > 0) {
      const chatID = id
      addMessage({ variables: { message, author: user, chatID } })
      setMessage('')
    }
  }

  useSubscription(MESSAGE_ADDED, {
    variables: { chatID: id },
    onSubscriptionData: ({ subscriptionData, client }) => {
      //WRITES TO CACHE

      const newMessage = subscriptionData.data.messageAdded
      updateCacheWith(newMessage, client)
      clearTimeout(timer)

      //SETS AUTO DELETE FOR CHATS
      const deleteTimer = setTimeout(() => {
        setRedirect(true)

        deleteChat({ variables: { chatID: id } })
        const dataInStore = client.readQuery({ query: CHATS })
        client.writeQuery({
          query: CHATS,
          data: { chats: dataInStore.chats.filter((chat) => chat.id !== id) },
        })
      }, 1000 * 60 * 10) //TEN MINUTES
      setTimer(deleteTimer)
    },
  })
  if (loading || error)
    return (
      <div class="loading">
        <img src="../../Icons/Loading.svg" alt="loading animation" />
      </div>
    )

  const chat = data.findChat
  const messages = chat.messages

  //REDIRECTS IF BEEN TOO LONG & DB WILL BE DELETED
  if (redirect) {
    navigate('/')
  }
  return (
    <div>
      <header className="chatroom-header">
        <div className="chatroom-header-container">
          <h1>{chat.name}</h1>
          <Link to="/rooms">
            <button id="back-button">BACK</button>
          </Link>
        </div>
      </header>
      <section className="chatroom-container">
        <form onSubmit={(e) => handleMessage(e)}>
          <input
            className="chatroom-input"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          ></input>
          <button type="submit">Send</button>
        </form>

        <ul className="chat-box">
          {messages.map((msg) => (
            <li
              className={
                user === msg.author ? 'message user-message' : 'message'
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
