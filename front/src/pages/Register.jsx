import React, { useContext, useState } from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import { AuthContext } from "../context";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
    const { setIsAuth } = useContext(AuthContext);
    const router = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if (userPassword !== userPasswordConfirm) {
            alert("Введенные пароли не совпадают!");
            setUserPasswordConfirm("");
            return;
        }
        handleRegister(e);
    };

    const handleRegister = async (e) => {
        try {
            const response = await AuthService.register(
                userEmail,
                userPassword
            );

            if (response.status === 200) {
                router("/login");
            } else {
                setIsAuth(false);
                alert("Такой пользователь уже зарегистрирован!");
            }
        } catch (error) {
            console.error(error);
            alert("Ошибка регистрации!");
        }
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <h1 style={{ marginBottom: 10 }}>Регистрация</h1>

            <form onSubmit={register}>
                <MyInput
                    type="email"
                    placeholder={"email@example.com"}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <MyInput
                    type="password"
                    placeholder={"Пароль"}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <MyInput
                    type="password"
                    placeholder={"Подтверждение пароля"}
                    value={userPasswordConfirm}
                    onChange={(e) => setUserPasswordConfirm(e.target.value)}
                    style={{ marginBottom: 10 }}
                />

                <MyButton type={"submit"}>Зарегистрироваться</MyButton>
            </form>
        </div>
    );
};

export default Register;
