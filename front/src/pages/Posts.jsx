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
    const [posts, setPosts] = useState([
        {
            id: 1,
            img: "../images/idei-dizajna-kvartiry-spb51.jpg",
            title: "Дизайн — это круто!",
            body: "Считается, что в более широком смысле дизайн не только призван к художественному конструированию, но и должен участвовать в решении более широких социально-технических проблем функционирования производства, потребления, существования людей в предметной среде, путём рационального построения её визуальных и функциональных свойств.",
        },
        {
            id: 2,
            img: "../images/332fc6acb7873e10a346146c3a9b205b.jpg",
            title: "Дизайн — это весело!",
            body: "Дизайн является творческой деятельностью, цель которой — определение формальных качеств предметов, производимых промышленностью; эти качества формы относятся не только к внешнему виду, но, главным образом, к структурным и функциональным связям,\
            которые превращают систему в целостное единство (с точки зрения как изготовителя, так и потребителя).\
            Дизайн стремится охватить все аспекты окружающей человека среды, которые обусловлены промышленным производством.\
            Дизайн является творческой деятельностью, цель которой — определение формальных качеств предметов, производимых промышленностью; эти качества формы относятся не только к внешнему виду, но, главным образом, к структурным и функциональным связям, которые превращают систему в целостное единство (с точки зрения как изготовителя, так и потребителя). Дизайн стремится охватить все аспекты окружающей человека среды, которые обусловлены промышленным производством.Дизайн является творческой деятельностью, цель которой — определение формальных качеств предметов, производимых промышленностью; эти качества формы относятся не только к внешнему виду, но, главным образом, к структурным и функциональным связям, которые превращают систему в целостное единство (с точки зрения как изготовителя, так и потребителя). Дизайн стремится охватить все аспекты окружающей человека среды, которые обусловлены промышленным производством. Дизайн является творческой деятельностью, цель которой — определение формальных качеств предметов, производимых промышленностью; эти качества формы относятся не только к внешнему виду, но, главным образом, к структурным и функциональным связям, которые превращают систему в целостное единство (с точки зрения как изготовителя, так и потребителя). \
            Дизайн стремится охватить все аспекты окружающей человека среды, которые обусловлены промышленным производством.",
        },
        {
            id: 3,
            img: "../images/d9194d5e44f032e740ad109c335.jpg",
            title: "Дизайн — это потрясающе!",
            body: "Дизайн — органичное новое соединение существующих материальных объектов и (или) жизненных ситуаций на основе метода компоновки при необходимом использовании данных науки с целью придания результатам этого соединения эстетических качеств и оптимизации их взаимодействия с человеком и обществом. Это определяет наличие присущих дизайну социальных последствий, проявляющихся в содействии общественному прогрессу и формированию личности. Термином «дизайн» может определяться собственно замысел (проект), процесс его реализации и полученный результат.",
        },
    ]);
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
        return sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(filter.query.toLowerCase())
        );
    }, [filter.query, sortedPosts]);

    const createPost = async (post) => {
        const createdPost = await PostService.addPost(
            post.img,
            post.title,
            post.body
        );
        setPosts([...posts, createdPost]);
        setModal(false);
    };

    const [fetchPosts, isLoading, error] = useFetching(async () => {
        const gottenPosts = await PostService.getPosts();

        setPosts(gottenPosts);
    });

    useEffect(() => {
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

            <PostList posts={sortedAndSearchedPosts} title="Посты" />
        </div>
    );
}

export default Posts;
