/**
 * `paginate` and `unwindEdges` have different type definitions.
 *
 * This is to allow for loose paramaters when unwinding edges,
 * (for instance, missing nodes), while ensuring that `paginate`
 * returns objects in a consistent shape.
 */
export type Cursor = string | number

export type Node = Record<string, any>

export type Maybe<T> = T | null | void

export interface Edge<T = Node> {
  cursor?: Maybe<Cursor>
  node: T
}

export interface PageInfo {
  hasNextPage: boolean | null
  hasPreviousPage: boolean | null
  hasPrevPage: boolean | null
  [key: string]: any
}

export interface PaginatedWithPageInfo<T = Node> {
  pageInfo: PageInfo
  edges: Array<Edge<T>>
}

export interface Paginated<T = Node, EdgeType = Edge<T>> {
  pageInfo?: PageInfo | null
  edges: Array<EdgeType>
}

export interface PaginationArgs {
  first?: number
  after?: string
}

export interface PaginateConfig {
  cursorKey?: string
}
