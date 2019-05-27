import { unwindEdges } from '../'

const sampleResponse = {
  allUsers: {
    pageInfo: { hasNextPage: true, hasPreviousPage: false },
    edges: [
      { cursor: 'x123', node: { id: 'abc', name: 'frank' } },
      { cursor: 'y234', node: { id: 'xyz', name: 'ursula' } },
      { cursor: 'z456', node: { id: 'xyz', name: 'ira' } },
    ],
  },
}

interface User {
  id: string
  name: string
}

describe('unwindEdges', () => {
  it('should return all of the nodes with an additional __cursor property', () => {
    const [users] = unwindEdges<User>(sampleResponse.allUsers)
    const [firstUser, secondUser, thirdUser] = sampleResponse.allUsers.edges

    expect(users[0]).toEqual({ ...firstUser.node, __cursor: firstUser.cursor })
    expect(users[1]).toEqual({ ...secondUser.node, __cursor: secondUser.cursor })
    expect(users[2]).toEqual({ ...thirdUser.node, __cursor: thirdUser.cursor })

    /* Check that the typescript types are returning properly */
    // @ts-ignore
    expect(users[0].username).toBe(undefined)
  })

  it('should return the pageInfo, firstCursor, and lastCursor', () => {
    const [, { pageInfo, firstCursor, lastCursor }] = unwindEdges<User>(sampleResponse.allUsers)
    const [firstUser, , thirdUser] = sampleResponse.allUsers.edges

    expect(pageInfo).toEqual(sampleResponse.allUsers.pageInfo)
    expect(firstCursor).toBe(firstUser.cursor)
    expect(lastCursor).toBe(thirdUser.cursor)
  })
})
