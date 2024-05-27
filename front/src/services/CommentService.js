import axios from "axios";

const addComment = async (postId, commentData) => {
    const response = await axios.post(`/posts/${postId}/comments`, commentData);

    return response.data;
};

const CommentService = {
    addComment,
};

export default CommentService;
