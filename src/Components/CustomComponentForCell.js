import { Fragment } from "react"



export const CustomComponentForCell=(props)=>{
    const cellColumnParam=props.cellParam;
   function onActionHandler(){
        console.log("Action", cellColumnParam);
        alert(`Hi ${cellColumnParam.data.name} as ${cellColumnParam.value}`)
        }
    return<Fragment>
         <div> 
              <button onClick={onActionHandler}>Button</button>
            </div>
    </Fragment>
}