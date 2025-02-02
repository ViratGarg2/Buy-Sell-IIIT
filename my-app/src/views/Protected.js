import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";

export default function Protected(props){
    const {Component} = props
    const user = localStorage.getItem("authToken");
    
    // console.log(user);
    if(user){
    return (
        // <CustomCursor/>
        <Component/>
    )
}else{
    return (
        <ForbiddenAnimation/>
    )
}
}

// module.exports = Protected;