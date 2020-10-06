export type Node = Record<string, any>

export interface Edge<NodeType = Node> {
  cursor?: string | number | null
  node: NodeType
}

export interface PageInfo {
  hasNextPage?: boolean | null
  hasPreviousPage?: boolean | null
  hasPrevPage?: boolean | null
  [key: string]: any
}

export interface PaginatedWithPageInfo<NodeType = Node> {
  pageInfo: PageInfo
  edges: Array<Edge<NodeType>>
}

export interface Paginated<NodeType = Node> {
  pageInfo?: PageInfo | null
  edges: Array<Edge<NodeType>>
}

export type NodeWithCursor<NodeType = Node> = NodeType & {
  __cursor?: string
}

export interface PaginationInfo {
  pageInfo?: PageInfo | null
  lastCursor?: string
  firstCursor?: string
}

export interface PaginationArgs {
  first?: number
  after?: string
}

export type UnwoundEdges<EdgeType> = [Array<NodeWithCursor<EdgeType>>, PaginationInfo]

export type Maybe<T> = T | null | void

export interface PaginateConfig {
  cursorKey?: string
}
