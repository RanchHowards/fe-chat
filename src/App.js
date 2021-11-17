import './App.css'
import { CHATS } from './queries'
import { useQuery } from '@apollo/client'

function App() {
  const { data, loading, error } = useQuery(CHATS)

  if (loading || error) return <h1>LOADING</h1>
  const messages = data.chats[0].messages //built just for one Chat, must be expanded

  return (
    <ul>
      {messages.map((m) => (
        <li key={m.id}>{m.message}</li>
      ))}
    </ul>
  )
}

export default App
