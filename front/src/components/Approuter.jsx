import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context";

import { publicRoutes, privateRoutes } from "../router/router";

const Approuter = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <Routes>
            {isAuth ? (
                <>
                    <Route
                        path="/*"
                        element={<Navigate replace to="/posts" />}
                    />
                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            element={<route.component />}
                            path={route.path}
                            exact={route.exact}
                        />
                    ))}
                </>
            ) : (
                <>
                    <Route
                        path="/*"
                        element={<Navigate replace to="/login" />}
                    />
                    {publicRoutes.map((route, index) => (
                        <Route
                            key={index}
                            element={<route.component />}
                            path={route.path}
                            exact={route.exact}
                        />
                    ))}
                </>
            )}
        </Routes>
    );
};

export default Approuter;
