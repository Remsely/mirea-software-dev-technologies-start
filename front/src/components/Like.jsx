import React, { useEffect, useState } from "react";

const Like = ({ like, setLike, postId }) => {
    useEffect(() => {
        if (localStorage.getItem(`like_${postId}`) === "red") {
            setLike("red");
        }
    }, [postId]);

    const isLiked = () => {
        if (like === "white") {
            setLike("red");
            localStorage.setItem(`like_${postId}`, "red");
        } else {
            setLike("white");
            localStorage.setItem(`like_${postId}`, "white");
        }
    };

    const buttonStyle = {
        backgroundColor: like,
    };

    return (
        <button className="like" onClick={isLiked} style={buttonStyle}>
            <img className="likeI" src="../images/heart1.png" alt="Like" />
        </button>
    );
};

export default Like;
