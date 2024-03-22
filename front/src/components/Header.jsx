import React, { useContext } from "react";
import MyButton from "../UI/button/MyButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";

const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="header">
            <h1>stArt</h1>

            <div className="links">
                <Link to="./posts">Посты</Link>
                <MyButton onClick={logout}>Выйти</MyButton>
            </div>
        </div>
    );
};

export default Header;
