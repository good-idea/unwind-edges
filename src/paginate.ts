import { Edge, PaginatedWithPageInfo, PaginationArgs, PaginateConfig, Node } from './types'

const defaultCursorKeys = ['id', '_id']

const getCursor = <T extends Node>(item: T, cursorKey?: string) => {
  const keys = cursorKey ? [cursorKey, ...defaultCursorKeys] : defaultCursorKeys
  const key = keys.find((key) => key in item)
  if (key) return item[key]
  return undefined
}

const itemsToEdges = <T extends Node>(items: T[], config?: PaginateConfig): Edge<T>[] =>
  items.map((node) => {
    const cursor = getCursor(node, config?.cursorKey)
    return { cursor, node }
  })

export const paginate = <T extends Node>(
  items: T[],
  paginationArgs?: PaginationArgs,
  config?: PaginateConfig,
): PaginatedWithPageInfo<T> => {
  const itemsToPaginate = paginationArgs?.first ? items.slice(0, paginationArgs.first) : items
  const edges = itemsToEdges<T>(itemsToPaginate, config)
  const hasNextPage = paginationArgs?.first ? items.length > paginationArgs.first : false
  const hasPreviousPage = Boolean(paginationArgs?.after)
  const firstCursor = edges[0]?.cursor
  const lastCursor = edges[edges.length - 1]?.cursor

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    hasPrevPage: hasPreviousPage,
    firstCursor,
    lastCursor,
  }

  return {
    pageInfo,
    edges,
  }
}
