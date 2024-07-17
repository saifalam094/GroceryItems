

import ItemList from './ItemList'
const Content = ({items,handleDelete,handlecheck}) => {

  return (
    <main>
        {items.length?
    <ItemList items={items} handleDelete={handleDelete} handlecheck={handlecheck}/>
: (<p style={{marginTop:"2rem"}}>Your list is empty</p>)}
    </main>
  )
}

export default Content
