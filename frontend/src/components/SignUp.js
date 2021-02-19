import {React, useState } from "react";

const SignUp = (props) => {


    const [loginValue, setLoginValue]= useState({
        username:'',
        password:''
    });


    let handleSignUp = (e) => {
        e.preventDefault();

    let signUpUrl = "http://localhost:8000/user";
    
    let signUp = async () => {
        // e.preventDefault(); 
        let user = {
            username: loginValue.username,
            password: loginValue.password,
            //add in privilege logic to backend
        }

        let response = await fetch(signUpUrl, {method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(user)});
        console.log(response);

        if (response.status >= 400 && response.status < 600) {
            console.log("error creating account");
            setLoginValue({...loginValue, password: ''});
        } else {
            //assuming for now this means log in is successful
            setLoginValue({username:'', password: ''});
            //return/display some sort of success message

            //toggle sign up popup
            props.toggle();
        }

        //add in proper error catching


    }

    signUp();

       
    };

    let handleChange = (e) => {
        if (e.target.name=== "username") {
            setLoginValue({...loginValue, username: e.target.value});

        } else if (e.target.name==="password") {
            setLoginValue({...loginValue, password: e.target.value});
        }
    };


    return (
        <div className={"login "+ props.active}>
            <form className="loginForm" onSubmit={handleSignUp}>
                <label for="username">Username</label>
                <input type="text" name="username" placeholder="Enter Username" value={loginValue.username} onChange={handleChange}></input>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Enter Password" value={loginValue.password} onChange={handleChange}></input>
                <button type="submit">Sign Up</button>
            </form>


        </div>
    )

};


export default SignUp;