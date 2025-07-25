import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch()

  return (
    <Button
      onClick={() => dispatch(deleteItem(pizzaId))}
      type="secondary"
      size="xs"
    >
      Delete
    </Button>
  )
}
