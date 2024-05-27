import axios from "axios";

const register = (email, password) => {
    let config = {
        method: "post",
        maxBody: Infinity,
        url: `/auth/register`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            username: email,
            password: password,
        },
    };

    return axios.request(config).then((response) => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
    });
};

const login = (email, password) => {
    let config = {
        method: "post",
        maxBody: Infinity,
        url: `/auth/login`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            username: email,
            password: password,
        },
    };

    localStorage.removeItem("user");

    return axios.request(config).then((response) => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getToken = () => {
    const userJson = localStorage.getItem("user");

    if (userJson) {
        const userObject = JSON.parse(userJson);
        return userObject.token || null;
    }

    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getToken,
};

export default AuthService;
