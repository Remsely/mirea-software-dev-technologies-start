import AuthService from "./AuthService";
import axios from "axios";
import PostService from "./PostService";

const addLike = async (postId, userId) => {
    const response = await axios.put(`/posts/${postId}/likes`, null, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
        data: {
            userId,
        },
    });

    if (response.status === 200) {
        return await PostService.getPostById(postId);
    } else {
        return null;
    }
};

const removeLike = async (postId, userId) => {
    await axios.delete(`/posts/${postId}/likes`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
        data: {
            userId,
        },
    });

    return await PostService.getPostById(postId);
};

const LikeService = {
    addLike,
    removeLike,
};

export default LikeService;
