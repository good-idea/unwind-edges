import { Maybe, Node, Cursor, PageInfo } from './types'
import { definitely } from './utils'

export type NodeWithCursor<T = Node> = T & {
  __cursor?: Cursor | undefined
}

export interface PaginationInfo {
  pageInfo?: Partial<PageInfo> | null
  lastCursor?: Cursor
  firstCursor?: Cursor
}

export type UnwoundEdges<EdgeType> = [Array<NodeWithCursor<EdgeType>>, PaginationInfo]

export interface PartialEdge<T> {
  cursor?: Maybe<Cursor>
  node?: T | null | undefined
}

const emptyResponse: UnwoundEdges<any> = [
  [],
  {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      hasPrevPage: false,
    },
    firstCursor: undefined,
    lastCursor: undefined,
  },
]

const addCursorToEdgeNodes = <T>(edge: PartialEdge<Maybe<T>>): NodeWithCursor<T> | null => {
  if (!edge || !edge.node) return null
  return {
    ...edge.node,
    __cursor: edge.cursor ? edge.cursor : undefined,
  }
}

export interface PaginatedInput<T = Node> {
  pageInfo?: Partial<PageInfo> | null
  edges?: Maybe<Array<Maybe<PartialEdge<Maybe<T>>>>>
}

/**
 * unwindEdges
 * @export
 * @template EdgeType
 * @param {Paginated<EdgeType>} { edges, pageInfo }
 * @returns {UnwoundEdges<EdgeType>}
 */
export const unwindEdges = <T>(paginated?: PaginatedInput<T> | null): UnwoundEdges<T> => {
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
