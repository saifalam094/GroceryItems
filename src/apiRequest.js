const apiRequest=async(url="",optionObj=null,errMsg=null)=>{
    try {
       const response= await fetch(url,optionObj) 
        if(!response.ok){
            throw new Error('Please reload the app')
        }
    } catch (err) {
         errMsg=err.message
    } finally{
           console.log(errMsg)
           return errMsg;

    }
}
export default apiRequest;