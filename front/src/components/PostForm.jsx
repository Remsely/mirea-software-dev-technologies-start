import React, { useState, useRef } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import PostService from "../services/PostService";

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ image: null, title: "", content: "" });
    const fileInputRef = useRef(null);

    const addNewPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const jsonBody = {
            title: post.title,
            content: post.content,
        };
        formData.append("json", JSON.stringify(jsonBody));

        formData.append("image", post.image);

        const newPost = await PostService.addPost(formData);

        create(newPost);

        setPost({ image: null, title: "", content: "" });

        fileInputRef.current.value = "";

        return newPost;
    };

    return (
        <form>
            <input
                ref={fileInputRef}
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
