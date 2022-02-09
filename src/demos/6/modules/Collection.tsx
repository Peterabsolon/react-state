import { debounce } from 'debounce'
import { observable, makeAutoObservable } from 'mobx'
import { ChangeEvent } from 'react'

import { IFetchDataParams } from '../../../api'
import { DEFAULT_PAGE_SIZE, TSortDirection } from '../../../constants'

interface IBaseModelData {
  id: number
}

interface IBaseModel<TFormPayload> {
  id: number
  editing: boolean
  onEditSubmit: (payload: TFormPayload) => Promise<void>
}

export interface ICollectionProps<
  TModel extends IBaseModel<TFormPayload>,
  TModelData extends IBaseModelData,
  TSortBy extends string,
  TFilters extends Record<string, any>,
  TFormPayload extends Record<string, any>
> {
  createModel: (data: TModelData) => TModel
  onFetch: (params: IFetchDataParams<TSortBy, TFilters>) => Promise<TModelData[]>
  onCreate: (payload: TFormPayload) => Promise<TModelData>
  onEdit: (id: number, payload: TFormPayload) => Promise<TModelData | void>
}

export class Collection<
  TModel extends IBaseModel<TFormPayload>,
  TModelData extends IBaseModelData,
  TSortBy extends string,
  TFilters extends Record<string, any>,
  TFormPayload extends Record<string, any>
> {
  // ===================================================
  // State
  // ===================================================
  data = observable<TModel>([])
  loading = true
  initialized = false
  canLoadMore = false
  sortBy: TSortBy
  sortDirection: TSortDirection = 'asc'
  searchQuery = ''
  filters: TFilters = {} as TFilters
  formOpen = false
  creating = false
  itemToEdit?: TModel

  constructor(readonly props: ICollectionProps<TModel, TModelData, TSortBy, TFilters, TFormPayload>) {
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
  setData = async (newData: TModelData[], concat = false) => {
    const models = newData.map((item) => this.props.createModel(item))
    this.data.replace(concat ? this.data.slice().concat(models) : models)
    this.canLoadMore = newData.length === DEFAULT_PAGE_SIZE
    this.loading = false
  }

  debouncedSearch = debounce(async (query: string): Promise<void> => {
    this.loading = true
    this.data.clear()
    this.setData(await this.props.onFetch({ ...this.fetchParams, searchQuery: query }))
  }, 500)

  debouncedFilter = debounce(async (filters: Partial<TFilters>): Promise<void> => {
    this.loading = true
    this.data.clear()
    this.setData(await this.props.onFetch({ ...this.fetchParams, filters: filters as TFilters }))
  }, 500)

  // ===================================================
  // Table
  // ===================================================
  onLoadMore = async () => {
    this.loading = true
    this.setData(await this.props.onFetch(this.fetchParams), true)
  }

  onSort = async (sortByNew: TSortBy) => {
    const sortDirectionFlipped = this.sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === this.sortBy ? sortDirectionFlipped : 'asc'

    this.data.clear()
    this.loading = true
    this.sortBy = sortByNew
    this.sortDirection = sortDirectionNew

    this.setData(await this.props.onFetch(this.fetchParams))
  }

  onFilter = async (key: keyof TFilters, value: any) => {
    console.log('filtering...', key)
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
  onCreateSubmit = async (payload: TFormPayload) => {
    this.creating = true
    const res = await this.props.onCreate(payload)
    this.data.push(this.props.createModel(res))
    this.creating = false
  }

  onFormOpen = (item?: TModel) => {
    this.formOpen = true
    this.itemToEdit = item
  }

  onFormClose = () => {
    this.formOpen = false
  }

  onFormSubmit = async (payload: TFormPayload) => {
    await (this.itemToEdit ? this.itemToEdit.onEditSubmit(payload) : this.onCreateSubmit(payload))
    this.formOpen = false
  }

  // ===================================================
  // Lifecycle
  // ===================================================
  onMount = async () => {
    this.setData(await this.props.onFetch(this.fetchParams))
    this.initialized = true
  }
}
