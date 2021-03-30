import {React , useState} from "react";

const Login = (props) => {

    const [loginValue, setLoginValue]= useState({
        username:'',
        password:''
    });
    const [errors, setErrors] = useState();

    let handleLogin = (e) => {
        e.preventDefault();
      
    let signIn = async () => {
        let user = {
            username: loginValue.username,
            password: loginValue.password,
        };

        let loginUrl = `http://localhost:8000/user/${user.username}/signIn`;

        let response = await fetch(loginUrl, {method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(user)});

        if (response.status >= 400 && response.status < 600) {
            setErrors('Error Loggin In');
            setLoginValue({...loginValue, password: ''});
        } else {
            //login successful
            setErrors();
             setLoginValue({username:'', password: ''});
            let responseJson = await response.json();

            //save jwt to local storage
            //save username and privilege to state via callback
            props.signInUser(responseJson.user);
            localStorage.setItem('token', responseJson.token);

            //toggle login popup
            props.toggle();
        };
    };
    signIn();
    };

    //track input for login fields
    let handleChange = (e) => {
        if (e.target.name=== "username") {
            setLoginValue({...loginValue, username: e.target.value});

        } else if (e.target.name==="password") {
            setLoginValue({...loginValue, password: e.target.value});
        };
    };

    //function to conditionally show popups
    let hideOrShow = () => {
        if (!props.active) {
            return "hidden"
        };
    };

    //login popup with conditional error message
    return (
        <div className={"login "+ hideOrShow()}>
            <form className="loginForm" onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Enter Username" minLength="1" required value={loginValue.username} onChange={handleChange}></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter Password" minLength="1" required value={loginValue.password} onChange={handleChange}></input>
                <button type="submit">Login</button>
                {errors && <div id="loginError">Error: Invalid Login Info</div>}
            </form>


        </div>
    )
};


export default Login;