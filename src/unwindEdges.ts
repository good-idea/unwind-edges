import { UnwoundEdges, Paginated } from './types'

/**
 * unwindEdges
 * @export
 * @template EdgeType
 * @param {Paginated<EdgeType>} { edges, pageInfo }
 * @returns {UnwoundEdges<EdgeType>}
 */

export const unwindEdges = <EdgeType = any>({ edges, pageInfo }: Paginated<EdgeType>): UnwoundEdges<EdgeType> => {
  return [
    edges.map((edge) => ({ ...edge.node, __cursor: edge.cursor })),
    {
      pageInfo,
      lastCursor: edges.length ? edges[edges.length - 1].cursor : undefined,
      firstCursor: edges.length ? edges[0].cursor : undefined,
    },
  ]
}
