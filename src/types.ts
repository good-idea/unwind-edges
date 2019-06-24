export interface Edge<NodeType> {
  cursor: string
  node: NodeType
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  [key: string]: any
}

export interface Paginated<NodeType> {
  pageInfo?: PageInfo
  edges: Array<Edge<NodeType>>
}

export type NodeWithCursor<NodeType> = NodeType & {
  __cursor: string
}

export interface PaginationInfo {
  pageInfo?: PageInfo
  lastCursor?: string
  firstCursor?: string
}

export type UnwoundEdges<EdgeType> = [Array<NodeWithCursor<EdgeType>>, PaginationInfo]
