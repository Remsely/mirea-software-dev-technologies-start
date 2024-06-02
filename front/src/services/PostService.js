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

const getPostById = (id) => {
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

const addPost = async (formData) => {
    const r = await axios.post("/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        Authorization: `Bearer ${AuthService.getToken()}`,
    });

    return r.data;
};

const PostService = {
    getPosts,
    getPostById,
    addPost,
};

export default PostService;
