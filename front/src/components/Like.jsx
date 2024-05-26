import React, { useEffect, useState } from "react";
import LikeService from "../services/LikeService";

const Like = ({ like, setLike, postId }) => {
    useEffect(() => {
        const storedLike = localStorage.getItem(`like_${postId}`);
        if (storedLike === "red") {
            setLike("red");
        }
    }, [postId, setLike]);

    const toggleLike = async () => {
        if (like === "white") {
            await LikeService.addLike(postId);
            setLike("red");
            localStorage.setItem(`like_${postId}`, "red");
        } else {
            await LikeService.removeLike(postId);
            setLike("white");
            localStorage.setItem(`like_${postId}`, "white");
        }
    };

    const buttonStyle = {
        backgroundColor: like,
    };

    return (
        <button className="like" onClick={toggleLike} style={buttonStyle}>
            <img className="likeI" src="../images/heart1.png" alt="Like" />
        </button>
    );
};

export default Like;
