import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef=useRef();
  return (
   <form className='addForm' onSubmit={handleSubmit}>
<label htmlFor="addItem">Add Item</label>
   <input type="text" autoFocus 
   id='addItem'
   ref={inputRef}
 placeholder='Add Item'
 required
 value={newItem}
 onChange={(e)=>{
    setNewItem(e.target.value)
 }}
   
   
   />
   <button type='submit' area-label="Add-Item">

    <FaPlus
    onClick={()=>inputRef.current.focus()}
    
    />
   </button>


   </form>
  )
}

export default AddItem
