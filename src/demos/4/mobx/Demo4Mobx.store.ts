/**
 * this.data.remove/clear/replace()
 */

import { debounce } from 'debounce'
import { observable, makeAutoObservable } from 'mobx'
import { ChangeEvent } from 'react'

import { fetchData } from '../../../api'
import { DEFAULT_PAGE_SIZE, IProduct, TProductsSortBy, TSortDirection } from '../../../constants'

export class Demo4Store {
  // ===================================================
  // State
  // ===================================================
  data = observable<IProduct>([])
  loading = true
  canLoadMore = false
  sortBy: TProductsSortBy = 'id'
  sortDirection: TSortDirection = 'asc'
  searchQuery = ''

  constructor() {
    makeAutoObservable(this)
    this.debouncedSearch = debounce(this.debouncedSearch, 500)
  }

  // ===================================================
  // Computed state
  // ===================================================
  get fetchParams() {
    return {
      skip: this.data.length,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      searchQuery: this.searchQuery,
    }
  }

  // ===================================================
  // Methods
  // ===================================================
  setData = async (newData: IProduct[], concat = false) => {
    this.data.replace(concat ? this.data.slice().concat(newData) : newData)
    this.canLoadMore = newData.length === DEFAULT_PAGE_SIZE
    this.loading = false
  }

  debouncedSearch = async (query: string): Promise<void> => {
    this.loading = true
    this.data.clear()
    this.setData(await fetchData({ ...this.fetchParams, searchQuery: query }))
  }

  // ===================================================
  // Handlers
  // ===================================================
  onLoadMore = async () => {
    this.loading = true
    this.setData(await fetchData(this.fetchParams), true)
  }

  onSort = async (sortByNew: TProductsSortBy) => {
    // Flip direction if sorting by the same key, sort ascending otherwise
    const sortDirectionFlipped = this.sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === this.sortBy ? sortDirectionFlipped : 'asc'

    this.data.clear()
    this.loading = true
    this.sortBy = sortByNew
    this.sortDirection = sortDirectionNew

    this.setData(await fetchData(this.fetchParams))
  }

  onSearch = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    this.searchQuery = value
    this.debouncedSearch(value)
  }

  onMount = async () => {
    this.setData(await fetchData(this.fetchParams))
  }
}

export const store = new Demo4Store()
