export interface Edge<NodeType> {
	cursor: string
	node: NodeType
}

export interface PageInfoPrev {
	hasNextPage: boolean
	hasPrevPage: boolean
}

interface PageInfoPrevious {
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export type PageInfo = PageInfoPrev | PageInfoPrevious

export interface Paginated<NodeType> {
	pageInfo: PageInfo
	edges: Array<Edge<NodeType>>
}

// export interface EdgeWithCursor<NodeType> extends NodeType {
// 	__cursor: string
// }

export type EdgeWithCursor<NodeType> = NodeType & {
	__cursor: string
}

export interface PaginationInfo {
	pageInfo: PageInfo
	lastCursor?: string
	firstCursor: string
}

export type UnwoundEdges<EdgeType> = [Array<EdgeWithCursor<EdgeType>>, PaginationInfo]
