import React, { useState } from 'react'
import { dictionary, SortOptions } from '../../Utils/consts'

import "./ManagementBar.scss";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

interface ManagementBarProps {
    searchValue: string
    sortValue: string
    onApply: (searchValue: string, sortValue: string) => void
    onAdd: () => void
}

const ManagementBar = (props: ManagementBarProps) => {
    const [newSearchValue, setNewSearchValue] = useState<string>('')
    const [newSortValue, setNewSortValue] = useState<string>('')

    const getAllSortOptions = (): React.JSX.Element[] => {
        const menuItems: string[] = [SortOptions.none, SortOptions.productName, SortOptions.creationDate]

        return menuItems.map((menuItem: string, index: number) => <MenuItem value={menuItem} key={index}>{menuItem}</MenuItem>)
    }

    return <div className='managementBar'>
        <Button className='addButton' size='large' variant="outlined" onClick={() => props.onAdd()}>{dictionary.add}</Button>
        <TextField id="outlined-basic" className='searchBar' value={newSearchValue} label={dictionary.searchProducts} variant="outlined" onChange={(value) => setNewSearchValue(value.target.value)}/>
        <FormControl className='sortBy'>
            <InputLabel id="demo-simple-select-label">{dictionary.sortBy}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newSortValue}
                label={dictionary.sortBy}
                onChange={(value) => setNewSortValue(value.target.value)}
            >
                {getAllSortOptions()}
            </Select>
        </FormControl>
        <Button className='addButton' size='large' variant="contained" onClick={() => props.onApply(newSearchValue, newSortValue)}>{dictionary.apply}</Button>
    </div>
}

export default ManagementBar