import ProductItem from "../ProductItem/ProductItem"
import { useEffect, useState } from 'react'
import { Product } from '../../Utils/DataModels'

import './ProductsSection.scss'
import ProductDetails from '../ProductDetails/ProductDetails'
import { consts, dictionary } from "../../Utils/consts"
import { getFixedList, getSlicedProductsArray } from "../../Utils/utilFunctions"
import { useAppDispatch } from "../../store/hooks"
import { productsActions } from "../../store/products"

interface ProductsSectionProps {
  allProducts: Product[]
  pageNumber: number
  searchValue: string
  sortValue: string
  setNumberOfPages: (numberOfPages: number) => void
}

const ProductsSection = (props: ProductsSectionProps) => {
  const dispatch = useAppDispatch()

  const [selectedProductId, setSelectedProductId] = useState<number>(getSlicedProductsArray(props.allProducts, props.pageNumber)[0]?.id)
  const [fixedProductsList, setProductsFixedList] = useState<Product[]>(getFixedList(props.allProducts, props.searchValue, props.sortValue))

  useEffect(() => {
    setSelectedProductId(getSlicedProductsArray(props.allProducts, props.pageNumber)[0]?.id)
  }, [props.allProducts, props.pageNumber])

  useEffect(() => {
    const newNumberOfPages: number = Math.ceil(fixedProductsList.length/consts.itemsPerPage) 
    props.setNumberOfPages(newNumberOfPages)
  })

  useEffect(() => {
    setProductsFixedList(getFixedList(props.allProducts, props.searchValue, props.sortValue))
  }, [props.allProducts, props.searchValue, props.sortValue])

  const onClickSave = (id: number, newName: string, newDescription: string, newPrice: number): void => {
    const selectedProduct: Product | undefined = props.allProducts.find((product: Product) => product.id === id)
    const index = props.allProducts.findIndex((product: Product) => product.id === id)
    
    if (selectedProduct) {
      const editedItem: Product = {
        id: selectedProduct.id,
        name: newName,
        description: newDescription,
        price: newPrice,
        creation: selectedProduct.creation,
        imgUrl: selectedProduct.imgUrl
      }

      const newAllProducts: Product[] = props.allProducts.filter((product: Product) => product.id !== id)
      newAllProducts.splice(index, 0, editedItem)

      dispatch(productsActions.setNewArray(newAllProducts))
    }
  }

  const onClickDelete = (id: number): void => {
    dispatch(productsActions.removeProduct(id))
  }

  const getAllProducts = (): React.JSX.Element => (
    <div className='AllProducts'>
      {getSlicedProductsArray(fixedProductsList, props.pageNumber)
        .map((product: Product, index: number) =>
          <ProductItem
            id={product.id}
            key={index}
            name={product.name}
            description={product.description}
            imgUrl={product.imgUrl}
            price={product.price}
            creation={product.creation}
            onSelect={setSelectedProductId}
            onDelete={onClickDelete}
          />)}
    </div>
  )

  const noAvailableProducts = (): React.JSX.Element => <div className="noAvailable">{dictionary.noAvailable}</div>

  return <div className="productsSection">
    {fixedProductsList.length > 0 ? getAllProducts() : noAvailableProducts()}
    <ProductDetails selectedProduct={props.allProducts.find((product: Product) => product.id === selectedProductId)!} onClickSave={onClickSave}/>
  </div>
}

export default ProductsSection