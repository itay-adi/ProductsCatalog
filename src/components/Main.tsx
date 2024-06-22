import { useState } from 'react'
import { SortOptions, consts, dictionary } from '../Utils/consts'
import ManagementBar from './ManagementBar'
import ProductsSection from './ProductsSection'
import { Product } from '../Utils/DataModels'
import { initialProductsState } from '../Utils/data'

import "./Main.scss"
import { Box, Modal, Pagination } from '@mui/material'
import ProductDetails from './ProductDetails'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  width: 600,
  p: 4,
}

const Main = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortValue, setSortValue] = useState<string>('')
  const [allProducts, setAllProducts] = useState<Product[]>(initialProductsState)
  const [isAddModalShown, setIsAddModalShown] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState(1)

  const onPressApply = (searchValue: string, sortValue: string): void => {
    setSearchValue(searchValue)
    setSortValue(sortValue)
  }

  const addNewProduct = (id: number, name: string, description: string, price: number, imgUrl?: string): void => {
    let newProduct: Product = {
      id,
      name,
      description,
      price,
      creation: new Date(),
      imgUrl,
    }

    setAllProducts([newProduct, ...allProducts])
    setIsAddModalShown(false)
  }

  const getFixedList = (): Product[] => {
    let filteredList = allProducts

    if (searchValue !== '') {
      filteredList = filteredList.filter((product: Product) => product.name.toLowerCase().includes(searchValue) || product.description?.toLowerCase().includes(searchValue))
    }

    if (sortValue === SortOptions.productName) {
      filteredList.sort((p1: Product, p2: Product) => p1.name.localeCompare(p2.name))
    } else if (sortValue === SortOptions.creationDate) {
      filteredList.sort((p1: Product, p2: Product) => p2.creation.getTime() - p1.creation.getTime())
    }

    return filteredList
  }

  return <div className='main'>
    <div className='headline'>{dictionary.headline}</div>
    <div className='pageContent'>
      <ManagementBar searchValue={searchValue} sortValue={sortValue} onApply={onPressApply} onAdd={() => setIsAddModalShown(true)}/>
      <ProductsSection allProducts={getFixedList()} onSetAllProducts={setAllProducts} pageNumber={pageNumber}/>
        <div className='pagination'><Pagination page={pageNumber} onChange={(event, value) => setPageNumber(value)} count={Math.ceil(getFixedList().length/consts.itemsPerPage)} color="primary"/></div>
      <Modal
        open={isAddModalShown}
        onClose={() => setIsAddModalShown(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modalBox' sx={style}>
          <ProductDetails newItem onClickSave={addNewProduct} />
        </Box>
      </Modal>
    </div>
  </div>
}

export default Main