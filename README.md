[![Codecov Coverage](https://img.shields.io/codecov/c/github/good-idea/unwind-edges/master.svg?style=flat-square)](https://codecov.io/gh/good-idea/unwind-edges/) ![](https://img.badgesize.io/https://unpkg.com/@good-idea/unwind-edges/lib/index.js.svg) ![](https://img.badgesize.io/https://unpkg.com/@good-idea/unwind-edges/lib/index.js.svg?compression=gzip)

# unwind-edges

`uwindEdges` is a simple utility for extracting nodes from GraphQL responses that are paginated with the [Relay Cursor Connection spec](https://facebook.github.io/relay/graphql/connections.htm). This structure is handy for handling pagination in your requests, but after that, you usually just want the nodes.

You can also use the `paginate` export to transform an array of nodes into a paginated object.

# usage

## `unwindEdges`

Takes a Cursor Connection and returns a tuple of (1) simple array of the nodes, with an additional `__cursor` property, and (2) the original page info.

Example:

```ts
import { unwindEdges } from '@good-idea/unwind-edges'

const response = {
  allUsers: {
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: 'x123',
        node: {
          id: 'abc',
          name: 'frank',
        },
      },
      {
        cursor: 'y234',
        node: {
          id: 'def',
          name: 'ursula',
        },
      },
      {
        cursor: 'z456',
        node: {
          id: 'ghi',
          name: 'ira',
        },
      },
    ],
  },
}

const [users, { pageInfo, firstCursor, lastCursor }] = unwindEdges(response.allUsers)

console.log(users)
/**
 *  [
 *    { id: 'abc', name: 'frank', __cursor: 'x123' },
 *    { id: 'def', name: 'ursula', __cursor: 'y234' },
 *    { id: 'ghi', name: 'ira', __cursor: 'z456' }
 *  ]
 */

console.log(pageInfo)
/**
 *  {
 *    hasPreviousPage: false,
 *    hasNextPage: true
 *  }
 */

console.log(firstCursor) // => 'x123'
console.log(lastCursor) // => 'x123'
```

## `paginate`

Takes an array of objects and returns a Relay-style connection object.

Example:

```js
import { paginate } from '@good-idea/unwind-edges'
const users = [
  { id: 'abc', name: 'frank' },
  { id: 'def', name: 'ursula' },
  { id: 'ghi', name: 'ira' },
]

const paginatedUsers = paginate(users)

console.log(paginatedUsers)

/**
 *  {
 *    edges: [
 *      {
 *        cursor: 'abc',
 *        node: {
 *          id: 'abc',
 *          name: 'frank'
 *        }
 *      },
 *      {
 *        cursor: 'def',
 *        node: {
 *          id: 'def',
 *          name: 'ursula'
 *        }
 *      },
 *      {
 *        cursor: 'ghi',
 *        node: {
 *          id: 'ghi',
 *          name: 'ira'
 *        }
 *      },
 *    ],
 *    pageInfo: {
 *      hasNextPage: false,
 *      hasPrevPage: false,
 *      hasPreviousPage: false,
 *      firstCursor: 'abc',
 *      lastCursor: 'ghi'
 *    }
 *  }
 */
```

### Pagination Arguments

You can also specify `first` and `after` arguments to return a limited selection of nodes.

```js
const users = [
  { id: 1, name: 'frank' },
  { id: 2, name: 'ursula' },
  // ...
  { id: 50, name: 'ira' },
]

const paginated = paginate(users, { first: 10 })

console.log(paginated)
/**
 *  {
 *    edges: [
 *      {
 *        cursor: 'abc',
 *        node: {
 *          id: 'abc',
 *          name: 'frank'
 *        }
 *      },
 *      {
 *        cursor: 'def',
 *        node: {
 *          id: 'def',
 *          name: 'ursula'
 *        }
 *      },
 *      // ...
 *      {
 *        cursor: 'xyz',
 *        node: {
 *          id: 'xyz',
 *          name: 'fancy'
 *        }
 *      },
 *    ],
 *    pageInfo: {
 *      hasNextPage: true,
 *      hasPrevPage: false,
 *      hasPreviousPage: false,
 *      firstCursor: 'abc',
 *      lastCursor: 'xyz'
 *    }
 *  }
 */
```

In order to make sure that `hasNextPage` returns the proper value, be sure to pass in _more_ nodes than you specify as your argument to `first`. For instance, when fetching items from a database, a common practice is to overfetch by one.

```
const users = getUsersFromDB({ first: 11 })

const paginated = paginate(users, { first: 10 })

console.log(paginated.pageInfo.hasNextPage)
// `true` if your database returned more than 10 users
// `false` if your database returned 10 users or less
```

`hasPrevPage` / `hasPreviousPage` will return `true` if you specify an `after` argument:

```
const users = getUsersFromDB({ first: 50 })

const paginated = paginate(users, { first: 10, after: 'def' })

console.log(paginated.pageInfo.hasPrevPage) // => true
console.log(paginated.pageInfo.firstCursor) // => 'ghi'
```

### Cursors

`paginate` will automatically look for an `id` or `_id` property on your node to extract as it's `cursor`. If you need to extract a cursor from another property, you can pass in a `cursorKey` property in the third parameter:

```
const users = [
  { id: 'abc', name: 'frank', },
  { id: 'def', name: 'ursula' },
  { id: 'ghi', name: 'ira' }
]

const paginated = paginate(users, {}, { cursorKey: 'name' })

console.log(paginated.edges[0].cursor) // => 'frank'
```

# Typescript Usage

If you're working in Typescript, you can pass in an additional type argument to tell TS what you're going to get back:

```ts
interface User {
  id: string
  name: string
}

const [users] = unwindEdges<User>(sampleResponse)

console.log(users[0].id) // 👍
console.log(users[0].name) // 👍
console.log(users[0].__cursor) // 👍
console.log(users[0].birthday) // ❗️ Property 'birthday' does not exist on type 'NodeWithCursor<User>'.
```

The module also exports the `Paginated<T>` interface, which can be handy if you want to create an interface for a Relay Connection:

```
type UserConnection = Paginated<User>
```
