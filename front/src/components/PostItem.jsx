import React, { useState, useEffect } from "react";
import MyButton from "../UI/button/MyButton";
import Like from "./Like";
import MyModal from "../UI/modal/MyModal";
import Comments from "./Comments";
import PostService from "../services/PostService";
import AuthService from "../services/AuthService";
import CommentService from "../services/CommentService";

const PostItem = (props) => {
    const [modal, setModal] = useState(false);
    const [like, setLike] = useState();
    const [post, setPost] = useState(props.post);
    const [currentUser, setCurrentUser] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPostDetails = async () => {
            if (modal) {
                const fetchedPost = await PostService.getPostById(
                    props.post.id
                );

                fetchComments();

                setPost(fetchedPost);
            }
        };

        fetchPostDetails();
    }, [modal, props.post.id]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await AuthService.getToken();

            setCurrentUser(user);
        };

        fetchCurrentUser();
    }, []);

    const fetchComments = async () => {
        const fetchedComments = await PostService.getPostById(props.post.id);

        setComments(fetchedComments.comments);
    };

    const handleCreateComment = async (commentData) => {
        const createdComment = await CommentService.addComment(
            props.post.id,
            commentData
        );

        setComments((prevComments) => [...prevComments, createdComment]);
    };

    return (
        <div className="post">
            <div className="post__content">
                <img
                    className="post__image"
                    src={post.image}
                    alt="Изображение"
                />

                <strong>
                    {props.number}. {post.title}
                </strong>

                <div className="post__description">{post.content}</div>
            </div>
            <div className="post__footer">
                <Like
                    like={like}
                    setLike={setLike}
                    postId={props.post.id}
                    currentUser={currentUser}
                />

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
                                src={post.image}
                                alt="Изображение"
                            />

                            <strong>
                                {props.number}. {post.title}
                            </strong>

                            <div className="post__description__module">
                                {post.content}
                            </div>
                        </div>
                        <div>
                            <Like
                                like={like}
                                setLike={setLike}
                                postId={props.post.id}
                                currentUser={currentUser}
                            />

                            <Comments
                                comments={comments}
                                onCreateComment={handleCreateComment}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>
                </MyModal>
            </div>
        </div>
    );
};

export default PostItem;
