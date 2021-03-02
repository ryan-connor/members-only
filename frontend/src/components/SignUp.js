import {React, useState } from "react";

const SignUp = (props) => {

    const [loginValue, setLoginValue]= useState({
        username:'',
        password:''
    });
    const [errors, setErrors] = useState();

    let handleSignUp = (e) => {
        e.preventDefault();

    let signUpUrl = "http://localhost:8000/user";
    
    let signUp = async () => {
 
        let user = {
            username: loginValue.username,
            password: loginValue.password,
        };

        let response = await fetch(signUpUrl, {method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(user)});

        if (response.status >= 400 && response.status < 600) {
            setErrors('error signing up');
             setLoginValue({...loginValue, password: ''});
        } else {
            //log in successful
            setErrors();
            setLoginValue({username:'', password: ''});

            //toggle sign up popup
            props.toggle();
        };
    };

    signUp();
       
    };

    //track input in signup fields
    let handleChange = (e) => {
        if (e.target.name=== "username") {
            setLoginValue({...loginValue, username: e.target.value});
        } else if (e.target.name==="password") {
            setLoginValue({...loginValue, password: e.target.value});
        };
    };

    //conditionally show popup
    let hideOrShow = () => {
        if (!props.active) {
            return "hidden"
        };
    };

    //sign up popup with conditional error message
    return (
        <div className={"login "+ hideOrShow()}>
            <form className="loginForm" onSubmit={handleSignUp}>
                <label for="username">Username</label>
                <input type="text" name="username" placeholder="Enter Username" minLength="1" required value={loginValue.username} onChange={handleChange}></input>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Enter Password" minLength="1" required value={loginValue.password} onChange={handleChange}></input>
                <button type="submit">Sign Up</button>
                {errors && <div id="loginError">Error: Username already in use</div>}
            </form>
        </div>
    )
};

export default SignUp;