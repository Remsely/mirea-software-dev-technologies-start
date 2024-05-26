import React, { useState, useEffect } from "react";

import MyButton from "../UI/button/MyButton";
import Like from "./Like";
import MyModal from "../UI/modal/MyModal";
import Comments from "./Comments";

const PostItem = (props) => {
    const [modal, setModal] = useState(false);
    const [like, setLike] = useState("white");

    return (
        <div className="post">
            <div className="post__content">
                <img
                    className="post__image"
                    src={props.post.img}
                    alt="Изображение"
                />

                <strong>
                    {props.number}. {props.post.title}
                </strong>

                <div className="post__description">{props.post.body}</div>
            </div>
            <div className="post__footer">
                <Like like={like} setLike={setLike} postId={props.post.id} />

                <MyButton
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    Подробнее
                </MyButton>

                <MyModal visible={modal} setVisible={setModal}>
                    <div className="post">
                        <div className="post__content">
                            <img
                                className="post__image"
                                src={props.post.img}
                                alt="Изображение"
                            />

                            <strong>
                                {props.number}. {props.post.title}
                            </strong>

                            <div className="post__description__module">
                                {props.post.body}
                            </div>
                        </div>
                        <div>
                            <Like
                                like={like}
                                setLike={setLike}
                                postId={props.post.id}
                            />

                            <Comments postId={props.post.id} />
                        </div>
                    </div>
                </MyModal>
            </div>
        </div>
    );
};

export default PostItem;
