export interface Edge<NodeType> {
  cursor?: string | null
  node?: NodeType | null
}

export interface PageInfo {
  hasNextPage?: boolean | null
  hasPreviousPage?: boolean | null
  hasPrevPage?: boolean | null
  [key: string]: any
}

export interface Paginated<NodeType> {
  pageInfo?: PageInfo | null
  edges?: Array<Edge<NodeType> | null | void> | null
}

export type NodeWithCursor<NodeType> = NodeType & {
  __cursor?: string
}

export interface PaginationInfo {
  pageInfo?: PageInfo | null
  lastCursor?: string
  firstCursor?: string
}

export type UnwoundEdges<EdgeType> = [Array<NodeWithCursor<EdgeType>>, PaginationInfo]

export type Maybe<T> = T | null | void
