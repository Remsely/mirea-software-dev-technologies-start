import React, { useState } from "react";
import LikeService from "../services/LikeService";
import PostService from "../services/PostService";

const Like = ({ postId, userId }) => {
    const [like, setLike] = useState();

    const fetchPost = async () => {
        const post = await PostService.getPostById(postId);

        setLike(post.liked ? "red" : "white");
    };

    fetchPost();

    const toggleLike = async () => {
        if (like === "white") {
            await LikeService.addLike(postId, userId);

            setLike("red");
        } else {
            await LikeService.removeLike(postId, userId);

            setLike("white");
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
