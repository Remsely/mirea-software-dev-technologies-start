import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import PostService from "../services/PostService";

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ image: null, title: "", content: "" });

    const addNewPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const jsonBody = {
            title: post.title,
            content: post.content,
        };
        formData.append("json", JSON.stringify(jsonBody));

        if (post.image) {
            formData.append("image", post.image);
        }

        const newPost = await PostService.addPost(formData);

        const newPostI = { ...newPost };
        create(newPostI);

        setPost({ image: null, title: "", content: "" });

        return newPostI;
    };

    return (
        <form>
            <input
                type="file"
                onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
            />

            <MyInput
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Название поста"
            />

            <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                type="text"
                placeholder="Описание поста"
            />

            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;
