import { consts, SortOptions } from "./consts"
import { Product } from "./DataModels"

export const getFixedList = (allProducts: Product[], searchValue: string, sortValue: string): Product[] => {
  let filteredList: Product[] = allProducts.slice()

  if (searchValue !== '') {
    filteredList = filteredList.filter((product: Product) => product.name.toLowerCase().includes(searchValue) || product.description?.toLowerCase().includes(searchValue))
  }

  if (sortValue === SortOptions.productName) {
    filteredList.sort((p1: Product, p2: Product) => p1.name.localeCompare(p2.name))
  } else if (sortValue === SortOptions.creationDate) {
    filteredList.sort((p1: Product, p2: Product) => new Date(p2.creation).getTime() - new Date(p1.creation).getTime())
  }

  return filteredList
}

export const getSlicedProductsArray = (productArray: Product[], pageNumber: number): Product[] => 
  productArray.slice((pageNumber - 1) * consts.itemsPerPage, pageNumber * consts.itemsPerPage)