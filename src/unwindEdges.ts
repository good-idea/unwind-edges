import { Edge, NodeWithCursor, UnwoundEdges, Paginated } from './types'

/**
 * unwindEdges
 * @export
 * @template EdgeType
 * @param {Paginated<EdgeType>} { edges, pageInfo }
 * @returns {UnwoundEdges<EdgeType>}
 */

const emptyResponse: UnwoundEdges<any> = [
  [],
  {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    firstCursor: undefined,
    lastCursor: undefined,
  },
]

const addCursorToEdgeNodes = <NodeType>(edge: Edge<NodeType>): NodeWithCursor<NodeType> => {
  return {
    ...edge.node,
    __cursor: edge.cursor,
  }
}

export const unwindEdges = <EdgeType>(paginated?: Paginated<EdgeType>): UnwoundEdges<EdgeType> => {
  if (!paginated) return emptyResponse
  const edges = paginated.edges || []
  const { pageInfo } = paginated
  return [
    edges.map(addCursorToEdgeNodes),
    {
      pageInfo,
      lastCursor: edges.length ? edges[edges.length - 1].cursor : undefined,
      firstCursor: edges.length ? edges[0].cursor : undefined,
    },
  ]
}
