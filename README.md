[![Codecov Coverage](https://img.shields.io/codecov/c/github/good-idea/unwind-edges/master.svg?style=flat-square)](https://codecov.io/gh/good-idea/unwind-edges/)

# unwind-edges

`uwindEdges` is a simple utility for extracting nodes from paginated GraphQL responses.


Takes a GraphQL-paginated response and returns a tuple of (1) simple array of the nodes,
with an additional __cursor, and (2) the original page info.
 *
example:

```js
const response = {
	allUsers: {

  pageInfo: { hasNextPage: true, hasPreviousPage: false },
   edges: [
 		{ cursor: 123, node: { id: 'abc', name: 'frank' }}
 		{ cursor: 234, node: { id: 'xyz', name: 'ursula' }}
 		{ cursor: 456, node: { id: 'xyz', name: 'ira' }}
   ]
	}
 }

```

returns:

```js


[
   [
 		{ id: 'abc', username: 'frank', __cursor: 123 },
 		{ id: 'xyz', username: 'ursula', __cursor: 234 },
	 ]
	 [
		 		
	 ]
]
```
 
