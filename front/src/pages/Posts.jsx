import React, { useState, useMemo, useEffect } from "react";
import "../styles/App.css";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../UI/modal/MyModal";
import MyButton from "../UI/button/MyButton";
import PostService from "../services/PostService";
import { useFetching } from "../hooks/useFetching";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort])
            );
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(
            (post) =>
                post &&
                post.title &&
                post.title.toLowerCase().includes(filter.query.toLowerCase())
        );
    }, [filter.query, sortedPosts]);

    const createPost = (post) => {
        setPosts([...posts, post]);

        setModal(false);
    };

    const [fetchPosts, isLoading, error] = useFetching(async () => {
        const gottenPosts = await PostService.getPosts();

        setPosts(gottenPosts);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPosts();
    }, []);

    return (
        <div className="App">
            <MyButton
                onClick={() => {
                    setModal(true);
                }}
            >
                Добавить пост
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: "15px 0" }} />

            <PostFilter filter={filter} setFilter={setFilter} />

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <PostList posts={sortedAndSearchedPosts} title="Посты" />
            )}
        </div>
    );
}

export default Posts;
