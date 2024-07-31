import { useState } from 'react'
import { dictionary } from '../../Utils/consts'
import ManagementBar from '../ManagementBar/ManagementBar'
import ProductsSection from '../ProductsSection/ProductsSection'
import { Product } from '../../Utils/DataModels'

import "./Main.scss"
import { Box, Modal, Pagination } from '@mui/material'
import ProductDetails from '../ProductDetails/ProductDetails'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { productsActions } from '../../store/products'

const style = {
  position: 'absolute',
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
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState<string>('')
  const [sortValue, setSortValue] = useState<string>('')
  const [isAddModalShown, setIsAddModalShown] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const allProducts = useAppSelector((state) => state.products.productsArr)

  const onPressApply = (searchValue: string, sortValue: string): void => {
    setSearchValue(searchValue)
    setSortValue(sortValue)
  }

  const addNewProduct = (id: number, name: string, description: string, price: number, imgUrl?: string): void => {
    const newProduct: Product = {
      id,
      name,
      description,
      price,
      creation: new Date().toDateString(),
      imgUrl,
    }

    dispatch(productsActions.addProduct(newProduct))
    setPageNumber(1)
    setIsAddModalShown(false)
  }

  return <div className='main'>
    <div className='headline'>{dictionary.headline}</div>
    <div className='pageContent'>
      <ManagementBar searchValue={searchValue} sortValue={sortValue} onApply={onPressApply} onAdd={() => setIsAddModalShown(true)}/>
      <ProductsSection allProducts={allProducts} pageNumber={pageNumber} searchValue={searchValue} sortValue={sortValue} setNumberOfPages={setNumberOfPages} />
      <div className='pagination'>
        {numberOfPages > 1 && <Pagination page={pageNumber} onChange={(event, value: number) => setPageNumber(value)} count={numberOfPages} color="primary"/>}
      </div>
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
