import { Edge, NodeWithCursor, UnwoundEdges, Paginated } from './types'
import { definitely } from './utils'

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

const addCursorToEdgeNodes = <NodeType>(edge: Edge<NodeType>): NodeWithCursor<NodeType> | null => {
  if (!edge || !edge.node) return null
  return {
    ...edge.node,
    __cursor: edge.cursor ? edge.cursor : undefined,
  }
}

export const unwindEdges = <EdgeType>(paginated?: Paginated<EdgeType> | null): UnwoundEdges<EdgeType> => {
  if (!paginated) return emptyResponse
  const allEdges = paginated.edges || []
  const edges = definitely(allEdges)
  const { pageInfo } = paginated
  return [
    definitely(edges.map(addCursorToEdgeNodes)),
    {
      pageInfo,
      lastCursor: edges.length ? edges[edges.length - 1].cursor || undefined : undefined,
      firstCursor: edges.length ? edges[0].cursor || undefined : undefined,
    },
  ]
}
