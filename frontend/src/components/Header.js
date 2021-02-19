import {React, useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Header = (props) => {


    const [loginPopup, setLoginPopup] = useState("hidden");
    const [signUpPopup, setSignUpPopup]= useState("hidden");

    let toggleLoginPopup = () => {
       if (loginPopup==="hidden") {
           setLoginPopup('');
       } else {
           setLoginPopup("hidden");
       };
    };

    let toggleSignUpPopup = () => {
        if (signUpPopup==="hidden") {
            setSignUpPopup('');
        } else {
            setSignUpPopup("hidden");
        };
    };

    let welcomeUser= () => {
        let user=  (props.currentUser)?props.currentUser.username:"Guest";
        return user;
    };


    return (
        <div className="header">
            <div className="headerItem">Posts from the Internet</div>
            <div className="headerItem">Welcome {welcomeUser()}!</div> 
            {/* TODO make this conditionally show log out instead for logged in users */}
            <div className="headerItem">
                <button className="headerItem" onClick={toggleLoginPopup}>Login</button>
                <button className="headerItem" onClick={toggleSignUpPopup}>Sign up</button>
            </div>
            <Login signInUser={props.signInUser} toggle={toggleLoginPopup} active={loginPopup}/>
            <SignUp active={signUpPopup} toggle={toggleSignUpPopup}/>
        </div>
    )
};


export default Header;
