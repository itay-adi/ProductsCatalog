import React, { useEffect, useState } from 'react'
import { Product } from '../Utils/DataModels'
import { consts, dictionary } from '../Utils/consts'
import { Button, TextField } from '@mui/material'

import './ProductDetails.scss'

interface ProductDetailsProps {
    newItem?: boolean
    selectedProduct?: Product
    onClickSave: (id: number, newName: string, newDescription: string, newPrice: number, imgUrl?: string) => void
}

const ProductDetails = (props: ProductDetailsProps) => {
    const [newName, setNewName] = useState<string>(props.selectedProduct?.name ?? '')
    const [newDescription, setNewDescription] = useState<string>(props.selectedProduct?.description ?? '')
    const [newPrice, setNewPrice] = useState<number>(props.selectedProduct?.price ?? 0)
    const [newImgURL, setNewImgURL] = useState<string | undefined>(props.selectedProduct?.imgUrl)

    useEffect(() => {
        setNewName(props.selectedProduct?.name ?? '')
        setNewDescription(props.selectedProduct?.description ?? '')
        setNewPrice(props.selectedProduct?.price ?? 0)
        setNewImgURL(props.selectedProduct?.imgUrl)
    }, [props.selectedProduct])

    const isSaveButtonDisabled = (): boolean => !newName ||
        newName.length > consts.nameMaxLength || 
        (newDescription && newDescription.length > consts.descriptionMaxLength) ||
        !newPrice ||
        newPrice <= consts.minPrice

    return <div className='productDetails'>
        <div className='productHeadline'>{props.newItem ? dictionary.addNewProduct : `${props.selectedProduct?.name ?? ''} ${dictionary.details}`}</div>
        <div className='productDetailsContent'>
            {newImgURL ? <img src={newImgURL} className="productImage" alt='not found'/> : <div className='imageFrame'/>}
            <TextField
                error={newName.length > consts.nameMaxLength}
                helperText={newName.length > consts.nameMaxLength ? dictionary.nameShouldBe : ''}
                id="outlined-basic"
                className='productName'
                label={dictionary.name}
                variant="outlined"
                value={newName}
                onChange={(value) => setNewName(value.target.value)}
            />
            {props.newItem && <TextField
                id="outlined-basic"
                className='productName'
                label={dictionary.imgURL}
                variant="outlined"
                value={newImgURL}
                onChange={(value) => setNewImgURL(value.target.value)}
            />}
            <TextField
                error={newDescription.length > consts.descriptionMaxLength}
                helperText={newDescription.length > consts.descriptionMaxLength ? dictionary.descriptionShouldBe : ''}
                id="outlined-multiline-static"
                label={dictionary.description}
                multiline
                rows={4}
                value={newDescription}
                onChange={(value) => setNewDescription(value.target.value)}
            />
            <TextField
                error={newPrice < consts.minPrice}
                helperText={newPrice < consts.minPrice ? dictionary.priceShouldBe : ''}
                id="outlined-multiline-static"
                label={`${dictionary.price} ($)`}
                value={newPrice}
                onChange={(value) => {
                    if (!isNaN(Number(value.target.value))) {
                        setNewPrice(Number(value.target.value))
                    }
                }}
            />
            <div className='saveButton'>
                <Button
                    variant="contained"
                    size='large'
                    color="success"
                    disabled={isSaveButtonDisabled()}
                    onClick={() => props.onClickSave(props.selectedProduct?.id ?? new Date().getTime(), newName, newDescription, newPrice, newImgURL)}>
                        {dictionary.save}
                </Button>
            </div>
        </div>
    </div>
}

export default ProductDetails