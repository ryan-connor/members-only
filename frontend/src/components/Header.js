import React from "react";

const Header = (props) => {


    //functions

    return (
        <div className="header">
             <div className="headerItem">Posts from the Internet</div>
            {/* TODO make this conditionally show for logged in users */}
            <div className="headerItem">Welcome username!</div> 
            {/* TODO make this conditionally show log out instead for logged in users */}
            <div className="headerItem">
                <button className="headerItem">Login</button>
                <button className="headerItem">Sign up</button>
            </div>

        </div>
    )
};


export default Header;
