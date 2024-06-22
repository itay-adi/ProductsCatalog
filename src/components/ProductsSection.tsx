import ProductItem from "./ProductItem"
import { useEffect, useState } from 'react'
import { Product } from '../Utils/DataModels'

import './ProductsSection.scss'
import ProductDetails from './ProductDetails'
import { consts, dictionary } from "../Utils/consts"

interface ProductsSectionProps {
    allProducts: Product[]
    pageNumber: number
    onSetAllProducts: (products: Product[]) => void
}

const ProductsSection = (props: ProductsSectionProps) => {
    const [selectedProductId, setSelectedProductId] = useState<number>(props.allProducts[0]?.id)

    useEffect(() => {
        setSelectedProductId(props.allProducts[0]?.id)
    }, [props.allProducts])


    const onClickSave = (id: number, newName: string, newDescription: string, newPrice: number): void => {
        let selectedProduct: Product | undefined = props.allProducts.find((product: Product) => product.id === id)
        let index = props.allProducts.findIndex((product: Product) => product.id === id)

        if (selectedProduct) {
            selectedProduct.name = newName
            selectedProduct.description = newDescription
            selectedProduct.price = newPrice

            let newAllProducts: Product[] = props.allProducts.filter((product: Product) => product.id !== id)
            newAllProducts.splice(index, 0, selectedProduct)

            props.onSetAllProducts(newAllProducts)
        }
    }

    const onClickDelete = (id: number): void => {
        props.onSetAllProducts(props.allProducts.filter((product: Product) => product.id !== id))
    }

    const getAllProducts = (): React.JSX.Element => (
        <div className='AllProducts'>
            {props.allProducts
                .slice((props.pageNumber - 1) * consts.itemsPerPage, props.pageNumber * consts.itemsPerPage)
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
        {props.allProducts.length > 0 ? getAllProducts() : noAvailableProducts()}
        <ProductDetails selectedProduct={props.allProducts.find((product: Product) => product.id === selectedProductId)!} onClickSave={onClickSave}/>
    </div>
}

export default ProductsSection