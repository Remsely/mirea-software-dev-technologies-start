import React, { useState, useEffect } from "react";

import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({ com: "" });

    useEffect(() => {
        const storedComments = localStorage.getItem(`comments_${postId}`);

        if (storedComments) {
            setComments(JSON.parse(storedComments));
        } else {
            setComments([]);
        }
    }, [postId]);

    const saveCommentsToLocalStorage = (updatedComments) => {
        localStorage.setItem(
            `comments_${postId}`,
            JSON.stringify(updatedComments)
        );
    };

    const createComment = (newComment) => {
        const updatedComments = [...comments, newComment];

        setComments(updatedComments);

        saveCommentsToLocalStorage(updatedComments);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createComment(comment);

        setComment({ com: "" });
    };

    return (
        <div>
            <form>
                <MyInput
                    value={comment.com}
                    onChange={(e) =>
                        setComment({ ...comment, com: e.target.value })
                    }
                    type="text"
                    placeholder="Введите комментарий"
                />

                <MyButton onClick={handleSubmit}>Добавить комментарий</MyButton>
            </form>

            <h1
                style={{
                    paddingBottom: "10px",
                    paddingTop: "10px",
                    fontSize: "18px",
                    textAlign: "center",
                }}
            >
                Комментарии
            </h1>

            <div className="post__comments">
                {comments.map((item, index) => (
                    <p key={index}>{item.com}</p>
                ))}
            </div>
        </div>
    );
};

export default Comments;
