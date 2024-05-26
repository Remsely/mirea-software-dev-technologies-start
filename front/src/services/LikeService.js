import AuthService from "./AuthService";
import axios from "axios";
import PostService from "./PostService";

const addLike = (postId) => {
    let config = {
        method: "put",
        maxBody: Infinity,
        url: `/posts/${postId}/likes`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
        data: {
            postId,
        },
    };

    return axios.request(config).then((r) => {
        if (r.status === 200) {
            return r.data;
        } else {
            return null;
        }
    });
};

const removeLike = async (postId) => {
    let config = {
        method: "delete",
        maxBody: Infinity,
        url: `/posts/${postId}/likes`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
    };

    await axios.request(config);

    return PostService.getPostByID(postId);
};

const LikeService = {
    addLike,
    removeLike,
};

export default LikeService;
