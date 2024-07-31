import { Alert, Button } from '@mui/material'
import { Product } from '../../Utils/DataModels'
import { dictionary } from '../../Utils/consts'

import './ProductItem.scss'

interface ProductItemProps extends Product {
    onSelect: (selectedID: number) => void
    onDelete: (selectedID: number) => void
}

const ProductItem = (props: ProductItemProps) => {
    const isRecentlyAdded = (): boolean => {
        const today: number = new Date().getTime()
        const dateOfCreation: number = new Date(props.creation).getTime()
        const differenceInMillis = today - dateOfCreation
        const differenceInDays = differenceInMillis / (24 * 60 * 60 * 1000)

        return differenceInDays < 30
    }

    return <div className='productItem'>
        <div className='productItemDetails' onClick={() => props.onSelect(props.id)}>
            <img src={props.imgUrl} className="productImage" alt='not found'/>
            <div className='productText'>
                <span className='productName'>{props.name}</span>
                <p className='productDescription'>{props.description}</p>
            </div>
        </div>
        <div className='productItemAction'>
            <Alert className={`alert${!isRecentlyAdded() && 'Invisible'}`} severity="success" >{dictionary.recentlyAdded}</Alert>
            <span className='price'>{`${dictionary.price}: ${props.price}$`}</span>
            <Button variant="outlined" color="error" size='large' onClick={() => props.onDelete(props.id)}>{dictionary.delete}</Button>
        </div>
    </div>
}

export default ProductItem