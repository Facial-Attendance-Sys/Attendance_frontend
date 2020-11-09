import {React}from 'react'
import SignUp from '../SignUp/SignUp'

const department=[1,2,3,4,5]
function Student_index() {
  
    return <Body/>

}

function Body()
{
    return (
        <div>
            <h1>Welcome student</h1>
            
            {
              Array(15).fill().map((i)=>(<SignUp/>))
            }
            
        </div>
    )

}
export default Student_index
