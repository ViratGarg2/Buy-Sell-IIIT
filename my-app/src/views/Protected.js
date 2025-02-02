import ForbiddenAnimation from "../components/Access";

export default function Protected(props){
    const {Component} = props
    const user = localStorage.getItem("authToken");
    
    // console.log(user);
    if(user){
    return (
        <Component/>
    )
}else{
    return (
        <ForbiddenAnimation/>
    )
}
}

// module.exports = Protected;