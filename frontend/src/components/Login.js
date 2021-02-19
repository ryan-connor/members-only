import {React , useState} from "react";

const Login = (props) => {


    const [loginValue, setLoginValue]= useState({
        username:'',
        password:''
    });

    
    //function to sign in to account

    //send get response to backend with account info

    //if successful get user info and jwt back, store user info in state and jwt in local storage

    let handleLogin = (e) => {
        e.preventDefault();

    let loginUrl = "http://localhost:8000/:id/signIn";
    
    let signIn = async (e) => {
        e.preventDefault(); 
        let user = {
            username: loginValue.username,
            password: loginValue.password,
        }
        console.log("user:", user);

        let response = await fetch(loginUrl, {method: 'Get', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(user)});
        console.log(response);

        if (response.status >= 400 && response.status < 600) {
            console.log("error logging in");
            setLoginValue({...loginValue, password: ''});
        } else {
            //assuming for now this means log in is successful
            setLoginValue({username:'', password: ''});
            //return/display some sort of success message
        }

        //add in proper error catching

        //save response and jwt in state/local storage

    }

    signIn();

       
    };

    let handleChange = (e) => {
        if (e.target.name=== "username") {
            setLoginValue({...loginValue, username: e.target.value});

        } else if (e.target.name==="password") {
            setLoginValue({...loginValue, password: e.target.value});
        }
    };


    return (
        <div className="login">
            <form className="loginForm" onSubmit={handleLogin}>
                <label for="username">Username</label>
                <input type="text" name="username" placeholder="Enter Username" value={loginValue.username} onChange={handleChange}></input>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Enter Password" value={loginValue.password} onChange={handleChange}></input>
                <button type="submit">Login</button>
            </form>


        </div>
    )
};


export default Login;