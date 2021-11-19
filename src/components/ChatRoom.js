import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { MESSAGE_ADDED, ADD_MESSAGE, FIND_CHAT } from '../queries'
import { useQuery, useSubscription, useMutation } from '@apollo/client'

function ChatRoom() {
  const id = useParams().id

  const [message, setMessage] = useState('')
  const [addMessage] = useMutation(ADD_MESSAGE)

  const { data, loading, error } = useQuery(FIND_CHAT, { variables: { id } })
  const handleMessage = (event) => {
    event.preventDefault()
    const author = 'billly'
    const chatID = id
    addMessage({ variables: { message, author, chatID } })
    setMessage('')
  }

  const updateCacheWith = (newMessage, client) => {
    // const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({
      query: FIND_CHAT,
      variables: { id },
    })
    console.log('store', dataInStore)
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
    onSubscriptionData: ({ subscriptionData, client }) => {
      const newMessage = subscriptionData.data.messageAdded
      updateCacheWith(newMessage, client)
    },
  })
  if (loading || error) return <h1 style={{ color: 'white' }}>LOADING/ERROR</h1>

  const chat = data.findChat

  return (
    <div>
      <h1 style={{ color: 'white' }}>{chat.name}</h1>
      <form onSubmit={(e) => handleMessage(e)}>
        <input
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
      <ul style={{ backgroundColor: 'white' }}>
        {chat.messages.map((msg) => (
          <li key={msg.id}>{msg.message}</li>
        ))}
      </ul>
    </div>
  )
}
export default ChatRoom
