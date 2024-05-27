import React, { useContext } from "react";
import MyButton from "../UI/button/MyButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";
import AuthService from "../services/AuthService";

const Header = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        AuthService.logout();

        setIsAuth(false);
    };

    return (
        <div className="header">
            <h1>stArt</h1>

            <div className="links">
                <Link to="./posts">Посты</Link>

                {isAuth && <MyButton onClick={logout}>Выйти</MyButton>}
            </div>
        </div>
    );
};

export default Header;
