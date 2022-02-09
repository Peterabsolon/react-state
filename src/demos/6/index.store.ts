import { createProduct, editProduct, fetchData, IFetchDataParams, TProductPayload, TProductsFilters } from '../../api'
import { IProduct, TProductsSortBy } from '../../constants'
import { ProductModel } from '../5/mobx/Demo5Mobx.store'

import { Collection } from './modules/Collection'

type TProductsCollection = Collection<ProductModel, IProduct, TProductsSortBy, TProductsFilters, TProductPayload>

class Demo6Store {
  products: TProductsCollection = new Collection({
    createModel: (data: IProduct) => new ProductModel(data),
    onCreate: (payload: TProductPayload) => createProduct(payload),
    onEdit: (id: number, payload: TProductPayload) => editProduct(id, payload),
    onFetch: (params: IFetchDataParams) => fetchData(params),
  })

  someOtherEntity: TProductsCollection = new Collection({
    createModel: (data: IProduct) => new ProductModel(data),
    onCreate: (payload: TProductPayload) => createProduct(payload),
    onEdit: (id: number, payload: TProductPayload) => editProduct(id, payload),
    onFetch: (params: IFetchDataParams) => fetchData(params),
  })
}

export const store = new Demo6Store()
