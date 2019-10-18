import { UnwoundEdges, Paginated } from './types'

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

export const unwindEdges = <EdgeType = any>(paginated?: Paginated<EdgeType>): UnwoundEdges<EdgeType> => {
  if (!paginated) return emptyResponse
  const edges = paginated.edges || []
  const { pageInfo } = paginated
  return [
    edges.map((edge) => ({ ...edge.node, __cursor: edge.cursor })),
    {
      pageInfo,
      lastCursor: edges.length ? edges[edges.length - 1].cursor : undefined,
      firstCursor: edges.length ? edges[0].cursor : undefined,
    },
  ]
}
