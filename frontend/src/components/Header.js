import {React, useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Header = (props) => {

    const [loginPopup, setLoginPopup] = useState(false);
    const [signUpPopup, setSignUpPopup]= useState(false);

    //functions to toggles popups for login/signup
    let toggleLoginPopup = () => {
       if (loginPopup) {
           setLoginPopup(false);
           setSignUpPopup(false);
       } else {
           setLoginPopup(true);
           setSignUpPopup(false);
       };
    };

    let toggleSignUpPopup = () => {
        if (signUpPopup) {
            setSignUpPopup(false);
            setLoginPopup(false);
            
        } else {
            setSignUpPopup(true);
            setLoginPopup(false);
        };
    };

    //function to show username if there is a logged in user
    let welcomeUser= () => {
        let user=  (props.currentUser)?props.currentUser.username:"Guest";
        return user;
    };

    //show header and conditionally show username, login/signin popups, and logout button
    return (
        <div className="header">
            <div className="headerItem">Posts from the Internet</div>
            <div className="headerItem">Welcome {welcomeUser()}!</div> 
            <div className="headerItem">
                <button className="headerItem" onClick={toggleLoginPopup}>Login</button>
                <button className="headerItem" onClick={toggleSignUpPopup}>Sign up</button>
                {props.currentUser && <button className="headerItem" onClick={props.signOutUser}>Log Out</button>}
                <Login signInUser={props.signInUser} toggle={toggleLoginPopup} active={loginPopup}/>
                <SignUp active={signUpPopup} toggle={toggleSignUpPopup}/>
            </div>

        </div>
    )
};


export default Header;
