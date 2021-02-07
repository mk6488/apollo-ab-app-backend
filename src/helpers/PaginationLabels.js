const baseLabels = {
	totalDocs: 'count',
	limit: 'perPage',
	page: 'currentPage',
	nextPage: 'next',
	prevPage: 'prev',
	totalPages: 'pageCount',
	pagingCounter: 'slNo',
	meta: 'paginator'
}

export const athletePaginatorLabels = { ...baseLabels, docs: 'athletes' }
export const commentPaginatorLabels = { ...baseLabels, docs: 'comments' }
export const loadPaginatorLabels = { ...baseLabels, docs: 'loads' }
export const sessionPaginatorLabels = { ...baseLabels, docs: 'sessions' }
export const testPaginatorLabels = { ...baseLabels, docs: 'tests' }
export const userPaginatorLabels = { ...baseLabels, docs: 'users' }
export const wellnessPaginatorLabels = { ...baseLabels, docs: 'wellness' }