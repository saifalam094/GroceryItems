import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
const LineItem = ({item,handleDelete,handlecheck}) => {
  return (
 
       <li className='item'>
       <input type="checkbox" onChange={()=>handlecheck(item.id)} checked={item.checked}/>
       <label 
       style={(item.checked)?{textDecoration:"line-through"}:null}
       onDoubleClick={()=>handlecheck(item.id)}>{item.item}</label>
   <FaTrashAlt role='button' tabIndex="0" onClick={()=>handleDelete(item.id)} area-label={ `Delete ${item.item}`} title={ `Delete ${item.item}`}/>
        </li>
 
  )
}

export default LineItem
