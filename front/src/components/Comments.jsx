import React, { useState } from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const Comments = ({ comments, onCreateComment }) => {
    const [newComment, setNewComment] = useState("");

    const handleCreateComment = (e) => {
        e.preventDefault();

        if (newComment.trim()) {
            onCreateComment({
                content: newComment,
            });

            setNewComment("");
        }
    };

    return (
        <div>
            <form onSubmit={handleCreateComment}>
                <MyInput
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    type="text"
                    placeholder="Введите комментарий"
                />

                <MyButton type="submit">Добавить комментарий</MyButton>
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
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.author}</strong>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
