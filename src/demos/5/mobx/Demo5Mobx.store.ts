/**
 * - this.data.remove/clear/replace()
 * - "React for data"
 */

import { debounce } from 'debounce'
import { observable, makeAutoObservable, set } from 'mobx'
import { ChangeEvent } from 'react'

import { fetchData, editProduct, TProductsFilters, TProductPayload, createProduct } from '../../../api'
import { DEFAULT_PAGE_SIZE, IProduct, TProductsSortBy, TSortDirection } from '../../../constants'

// ===================================================
// Model
// ===================================================
export class ProductModel implements IProduct {
  id: number
  title: string
  material: string
  editing = false

  constructor(data: IProduct) {
    makeAutoObservable(this)
    set(this, data)
  }

  onEditSubmit = async (formValues: TProductPayload) => {
    this.editing = true
    set(this, await editProduct(this.id, formValues))
    this.editing = false
  }
}

export class Demo5Store {
  // ===================================================
  // State
  // ===================================================
  data = observable<ProductModel>([])
  loading = true
  initialized = false
  canLoadMore = false
  sortBy: TProductsSortBy = 'id'
  sortDirection: TSortDirection = 'asc'
  searchQuery = ''
  filters: TProductsFilters = {}
  formOpen = false
  creating = false
  itemToEdit?: ProductModel

  constructor() {
    makeAutoObservable(this)
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
      filters: this.filters,
    }
  }

  get submitting() {
    return this.creating || this.itemToEdit?.editing
  }

  get tableProps() {
    return {
      ...this.fetchParams,
      canLoadMore: this.canLoadMore,
      data: this.data,
      loading: this.loading,
      onFilter: this.onFilter,
      onLoadMore: this.onLoadMore,
      onSort: this.onSort,
    }
  }

  // ===================================================
  // Methods
  // ===================================================
  setData = async (newData: IProduct[], concat = false) => {
    const models = newData.map((item) => new ProductModel(item))
    this.data.replace(concat ? this.data.slice().concat(models) : models)
    this.canLoadMore = newData.length === DEFAULT_PAGE_SIZE
    this.loading = false
  }

  debouncedSearch = debounce(async (query: string): Promise<void> => {
    this.loading = true
    this.data.clear()
    this.setData(await fetchData({ ...this.fetchParams, searchQuery: query }))
  }, 500)

  debouncedFilter = debounce(async (filters: Partial<TProductsFilters>): Promise<void> => {
    this.loading = true
    this.data.clear()
    this.setData(await fetchData({ ...this.fetchParams, filters }))
  }, 500)

  // ===================================================
  // Table
  // ===================================================
  onLoadMore = async () => {
    this.loading = true
    this.setData(await fetchData(this.fetchParams), true)
  }

  onSort = async (sortByNew: TProductsSortBy) => {
    const sortDirectionFlipped = this.sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === this.sortBy ? sortDirectionFlipped : 'asc'

    this.data.clear()
    this.loading = true
    this.sortBy = sortByNew
    this.sortDirection = sortDirectionNew

    this.setData(await fetchData(this.fetchParams))
  }

  onFilter = async (key: keyof TProductsFilters, value: string) => {
    this.filters[key] = value
    this.debouncedFilter(this.filters)
  }

  onSearch = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    this.searchQuery = value
    this.debouncedSearch(value)
  }

  // ===================================================
  // Form
  // ===================================================
  onCreateSubmit = async (payload: TProductPayload) => {
    this.creating = true
    const res = await createProduct(payload)
    this.data.push(new ProductModel(res))
    this.creating = false
  }

  onFormOpen = (item?: ProductModel) => {
    this.formOpen = true
    this.itemToEdit = item
  }

  onFormClose = () => {
    this.formOpen = false
  }

  onFormSubmit = async (payload: TProductPayload) => {
    await (this.itemToEdit ? this.itemToEdit.onEditSubmit(payload) : this.onCreateSubmit(payload))
    this.formOpen = false
  }

  // ===================================================
  // Lifecycle
  // ===================================================
  onMount = async () => {
    this.setData(await fetchData(this.fetchParams))
    this.initialized = true
  }
}

export const store = new Demo5Store()
