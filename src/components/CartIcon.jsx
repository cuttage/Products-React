import React from 'react'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { Badge, styled } from '@mui/material'
import { useSelector } from 'react-redux'

const CustomizedBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 0,
    backgroundColor: '#FFFFFF',
    color: 'black',
    border: '2px solid black',
    padding: '0 4px',
    fontSize: '0.7rem',
    minWidth: '18px',
    height: '18px',
    borderRadius: '50%',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)

  return (
    <CustomizedBadge
      badgeContent={cartItems?.length.toString()}
      color="primary"
    >
      <ShoppingBagOutlinedIcon />
    </CustomizedBadge>
  )
}

export default CartIcon
