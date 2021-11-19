import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Chat: {
      merge: false,
    },
  },
  //     Query: {
  //       fields: {
  //         isLoggedIn: {
  //           read() {
  //             return isLoggedInVar()
  //           },
  //         },
  //         eventsArr: {
  //           read() {
  //             return eventsArrVar()
  //           },
  //         },
  //         eventsArrFilter: {
  //           read() {
  //             return eventsArrFilterVar()
  //           },
  //         },
  //         userData: {
  //           read() {
  //             return userDataVar()
  //           },
  //         },
  //         type: {
  //           read() {
  //             return typeDataVar()
  //           },
  //         },
  //       },
  //     },
  //   },
})

// export const isLoggedInVar = makeVar(!!localStorage.getItem('user-token'))

// export const eventsArrVar = makeVar([])
// export const eventsArrFilterVar = makeVar([])

// export const userDataVar = makeVar({})

// export const typeDataVar = makeVar([])
