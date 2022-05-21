import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline"
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from "react"

interface Props {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (quantity: number) => void
}

export const ItemCounter:FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {

  const increaseQuantity = () => {
    if(currentValue === maxValue) return;

    updatedQuantity(currentValue + 1)
  }

  const decreaseQuantity = () => {
    if(currentValue === 1) return;

    updatedQuantity(currentValue - 1)
  }
  
  return (
    <Box display="flex" alignItems="center" >
      <IconButton onClick={decreaseQuantity} >
        <RemoveCircleOutline/>
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }} >{ currentValue }</Typography>
      <IconButton onClick={increaseQuantity}>
        <AddCircleOutline/>
      </IconButton>
    </Box>
  )
}
