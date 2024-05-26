import AuthService from "./AuthService";
import axios from "axios";

const getPosts = () => {
    let config = {
        method: "get",
        maxBody: Infinity,
        url: "/posts",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
    };

    return axios.request(config).then((r) => {
        if (r.status === 200) {
            return r.data;
        } else {
            return [];
        }
    });
};

const getPostByID = (id) => {
    let config = {
        method: "get",
        maxBody: Infinity,
        url: `/posts/${id}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
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

const addPost = (imageUrl, title, content) => {
    let config = {
        method: "post",
        maxBody: Infinity,
        url: "/posts",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
        data: {
            imageUrl,
            title,
            content,
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

const PostService = {
    getPosts,
    getPostByID,
    addPost,
};

export default PostService;
