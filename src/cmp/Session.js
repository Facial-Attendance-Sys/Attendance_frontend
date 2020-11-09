import api from './API_URL'
const check_session=async (token,role)=>{

    const data={
    token:token,
    role:role
    }
    
    const res=await fetch(api+'/verify',{method:'POST',headers:{'Content-type':'application/json'},body:JSON.stringify(data)})
    .then(res=>res.json())
    
    return res

   



}

export default check_session