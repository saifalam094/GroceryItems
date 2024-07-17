
import './App.css';
import Content from './Content';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Footer from './Footer';
import Header from './Header';
import apiRequest from './apiRequest';
import React, { useEffect, useState } from 'react'

function App() {
  const API_URL="http://localhost:5000/items";
  const [items,setItems]=useState([]);
const [newItem,setNewItem]=useState("");
const[search,setSearch]=useState("");
const[fetchError,setFetchError]=useState(null);
const[loading ,setLoading]=useState(true)

useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Did not received the expected data');
      }
      const data = await response.json();
      setItems(data); // Set the fetched data to the state
      console.log(JSON.stringify(data));
      setFetchError(null)
  
    } catch (err) {
       setFetchError(err.message)
    } finally{
      setLoading(false);
    }
  };
 setTimeout(() => {
  fetchItems();
 }, 3000);

}, []);
  useEffect(()=>{
    localStorage.setItem('shoppinglist',JSON.stringify(items))
  },[items])
const setAndSaveItems=(newItems)=>{
  setItems(newItems);
}
const addItem= async(item)=>{
    const id=items.length?items[items.length-1].id +1:1;
    const myNewItem={
      id,
      checked:false,
      item
    };
    const listItems=[...items ,myNewItem]
   setAndSaveItems(listItems)
   const postOption={
       method:'POST',
       header:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify(myNewItem)
   }
   const result= await apiRequest(API_URL,postOption)
   if(result){
    setFetchError(result);
   }
}
const handlecheck= async(id)=>{
const listItems= items.map((item)=>item.id===id ?{...item,checked: !item.checked}:item)
setAndSaveItems(listItems)
   const myItem= listItems.filter((item)=>item.id==id);
   const updateOption={
      method:'PATCH',
      header:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        checked:myItem[0].checked
      })
   }
   const reqURL=`${API_URL}/${id}`
          const result=await apiRequest(reqURL,updateOption)
          if(result){
            setFetchError(result)
          }
}
const handleDelete=async(id)=>{
const listItems= items.filter((item)=>item.id!=id);
setAndSaveItems(listItems)
      const deleteOption={
          method:'DELETE',
      }
      const reqURL=`${API_URL}/${id}`
      const result=await apiRequest(reqURL,deleteOption)
      if(result){
        setFetchError(result)
      }

}
const handleSubmit=(e)=>{
  e.preventDefault();
  if(!newItem){
    return
  }
  console.log(newItem)
  addItem(newItem)
  setNewItem("")
console.log("submitted")
}
  return (
   
    <div className='App' >
    
    
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      
      
      />
        <SearchItem
      search={search}
      setSearch={setSearch}
      
      />
      <Header title="Grocery List" />
      <main>
        {loading && <p style={{color:"grey"}}>Loading please wait....</p>}
        {fetchError && <p style={{color:"red",  marginTop:"12px"}}>Error: {fetchError}</p>}
     {!fetchError && !loading &&
     
     <Content items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
     handleDelete={handleDelete}
     handlecheck={handlecheck}
  />
     
     }
      </main>
      <Footer length={items.length}/>
    

    </div>


  );
}

export default App;
