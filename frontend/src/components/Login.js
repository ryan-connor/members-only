import {React , useState} from "react";

const Login = (props) => {


    const [loginValue, setLoginValue]= useState({
        username:'',
        password:''
    });


    let handleLogin = (e) => {
        e.preventDefault();

    
    
    let signIn = async () => {
        // e.preventDefault(); 
        let user = {
            username: loginValue.username,
            password: loginValue.password,
        }
        

        let loginUrl = `http://localhost:8000/user/${user.username}/signIn`;

        let response = await fetch(loginUrl, {method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(user)});
        console.log(response);


        if (response.status >= 400 && response.status < 600) {
            console.log("error logging in");
            setLoginValue({...loginValue, password: ''});
        } else {
            //assuming for now this means log in is successful
            console.log("frontend thinks successful login");
            setLoginValue({username:'', password: ''});
            let responseJson = await response.json();
            console.log("user:", responseJson);

            //save response and jwt in state/local storage
            //save username and privilege to app state via callback
            props.signInUser(responseJson.user);
            //save jwt to localstorage
            localStorage.setItem('token', responseJson.token);
            //return/display some sort of success message

            //toggle login popup
            props.toggle();
        }

        //add in proper error catching



    };

    signIn();

       
    };

    let handleChange = (e) => {
        if (e.target.name=== "username") {
            setLoginValue({...loginValue, username: e.target.value});

        } else if (e.target.name==="password") {
            setLoginValue({...loginValue, password: e.target.value});
        }
    };


    let hideOrShow = () => {
        if (!props.active) {
            return "hidden"
        };
    };

    return (
        <div className={"login "+ hideOrShow()}>
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