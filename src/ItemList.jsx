import React from 'react'

import LineItem from './LineItem'
const ItemList = ({items,handleDelete,handlecheck}) => {
  return (
    <ul>
    {items.map((item)=>(

       <LineItem 
       key={item.id}
       item={item}
       handleDelete={handleDelete}
       handlecheck={handlecheck}
       />
    
    ))}
  </ul>
  )
}

export default ItemList
