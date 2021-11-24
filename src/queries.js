import { gql } from '@apollo/client'

//fragment - not in use
// export const USER_FIELDS = gql`
//   fragment UserFields on User {
//     username
//     pic
//     id
//   }
// `
// export const EVENT_FIELDS = gql`
//   fragment EventFields on Event {
//     title
//     eventType
//     eventPic
//     location
//     description
//     max
//     maxGuests
//     eventDate
//     createdAt
//     id
//   }
// `
// export const NESTED_EVENT_FIELDS = gql`
//   fragment NestedEventFields on Event {
//     title
//     eventType
//     eventPic
//     location
//     attendees {
//       username
//       pic
//       id
//       drink
//     }
//     host {
//       username
//       pic
//       id
//       drink
//     }
//     comments {
//       comment
//       author {
//         username
//         id
//         pic
//       }
//       id
//     }
//     description
//     max
//     maxGuests
//     eventDate
//     createdAt
//     id
//   }
// `
export const CHATS = gql`
  query {
    chats {
      id
      name
      messages {
        message
        author
        id
        chatID
      }
    }
  }
`
export const FIND_CHAT = gql`
  query findChat($id: ID) {
    findChat(id: $id) {
      name
      id
      messages {
        message
        author
        id
        chatID
      }
    }
  }
`

export const ADD_MESSAGE = gql`
  mutation addMessage($message: String, $author: String, $chatID: ID) {
    addMessage(message: $message, author: $author, chatID: $chatID) {
      message
      author
      id
    }
  }
`
export const CREATE_CHAT = gql`
  mutation createChat($name: String) {
    createChat(name: $name) {
      id
      name
    }
  }
`
export const DELETE_CHAT = gql`
  mutation deleteChat($chatID: ID) {
    deleteChat(chatID: $chatID) {
      id
    }
  }
`
export const MESSAGE_ADDED = gql`
  subscription messageAdded($chatID: ID) {
    messageAdded(chatID: $chatID) {
      message
      author
      chatID
      id
    }
  }
`

// export const ALL_USERS = gql`
//   query {
//     allUsers {
//       username
//     }
//   }
// `

// export const ADD_EVENT = gql`
//   mutation addEvent(
//     $title: String!
//     $eventType: String
//     $eventPic: String
//     $location: String
//     $eventDate: Date
//     $description: String
//     $max: Boolean
//     $maxGuests: Int
//   ) {
//     addEvent(
//       title: $title
//       eventType: $eventType
//       eventPic: $eventPic
//       location: $location
//       eventDate: $eventDate
//       description: $description
//       max: $max
//       maxGuests: $maxGuests
//     ) {
//       ...EventFields
//     }
//   }
//   ${EVENT_FIELDS}
// `
// export const EDIT_EVENT = gql`
//   mutation editEvent(
//     $title: String!
//     $eventType: String
//     $eventPic: String
//     $location: String
//     $eventDate: Date
//     $description: String
//     $max: Boolean
//     $maxGuests: Int
//     $eventId: ID!
//   ) {
//     editEvent(
//       title: $title
//       eventType: $eventType
//       eventPic: $eventPic
//       location: $location
//       eventDate: $eventDate
//       description: $description
//       max: $max
//       maxGuests: $maxGuests
//       eventId: $eventId
//     ) {
//       ...EventFields
//       id
//     }
//   }
//   ${EVENT_FIELDS}
// `
// export const JOIN_EVENT = gql`
//   mutation joinEvent($userId: ID!, $eventId: ID!) {
//     joinEvent(userId: $userId, eventId: $eventId) {
//       title
//       attendees {
//         username
//         id
//       }
//       id
//     }
//   }
// `
// export const LEAVE_EVENT = gql`
//   mutation leaveEvent($userId: ID!, $eventId: ID!) {
//     leaveEvent(userId: $userId, eventId: $eventId) {
//       title
//       attendees {
//         username
//         id
//       }
//       id
//     }
//   }
// `
// export const FIND_EVENT = gql`
//   query findEvent($eventId: ID!) {
//     findEvent(eventId: $eventId) {
//       ...NestedEventFields
//     }
//   }
//   ${NESTED_EVENT_FIELDS}
// `

// export const DELETE_EVENT = gql`
//   mutation deleteEvent($eventId: ID!) {
//     deleteEvent(eventId: $eventId) {
//       id
//     }
//   }
// `
// export const CREATE_USER = gql`
//   mutation createUser(
//     $username: String!
//     $password: String!
//     $drink: String
//     $pic: String
//   ) {
//     createUser(
//       username: $username
//       password: $password
//       drink: $drink
//       pic: $pic
//     ) {
//       value
//       user {
//         username
//         pic
//         drink
//         id
//         myEvents {
//           ...EventFields
//         }
//       }
//     }
//   }
//   ${EVENT_FIELDS}
// `

// export const LOGIN = gql`
//   mutation login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       value
//       user {
//         username
//         id
//         drink
//         pic
//         myEvents {
//           ...EventFields
//           id
//         }
//       }
//     }
//   }
//   ${EVENT_FIELDS}
// `
// export const USER_INFO = gql`
//   query {
//     me {
//       username
//       id
//       drink
//       pic
//       myEvents {
//         ...EventFields
//         id
//       }
//     }
//   }
//   ${EVENT_FIELDS}
// `
// export const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `
// export const CREATE_COMMENT = gql`
//   mutation createComment($eventId: ID!, $comment: String!, $inResponseTo: ID) {
//     createComment(
//       eventId: $eventId
//       comment: $comment
//       inResponseTo: $inResponseTo
//     ) {
//       comment
//       id
//       author {
//         username
//         id
//         pic
//       }
//     }
//   }
// `
