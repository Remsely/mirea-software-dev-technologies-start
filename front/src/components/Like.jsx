import React, { useState } from "react";
import LikeService from "../services/LikeService";
import PostService from "../services/PostService";

const Like = ({ postId, userId }) => {
    const [like, setLike] = useState();
    const [likes, setLikes] = useState(0);

    const fetchPost = async () => {
        const post = await PostService.getPostById(postId);

        setLikes(post.likeCount);

        setLike(post.liked ? "red" : "white");
    };

    fetchPost();

    const toggleLike = async () => {
        if (like === "white") {
            await LikeService.addLike(postId, userId);

            setLikes(likes - 1);

            setLike("red");
        } else {
            await LikeService.removeLike(postId, userId);

            setLikes(likes + 1);

            setLike("white");
        }
    };

    const buttonStyle = {
        backgroundColor: like,
    };

    return (
        <div className="like__info">
            <button className="like" onClick={toggleLike} style={buttonStyle}>
                <img className="likeI" src="../images/heart1.png" alt="Like" />
            </button>

            <p>{likes}</p>
        </div>
    );
};

export default Like;
