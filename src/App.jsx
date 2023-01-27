import React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import NewPost from "./components/NewPost";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "My First Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet 1consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
        },
        {
            id: 2,
            title: "My 2nd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet 2consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
        },
        {
            id: 3,
            title: "My 3rd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet 3consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
        },
        {
            id: 4,
            title: "My Fourth Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet 4consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
        },
    ]);

    useEffect(() => {
        const filteredResults = posts.filter((post) => {
            // return (
            //     post.body.toLowerCase().includes(search.toLowerCase()) ||
            //     post.title.toLowerCase().includes(search.toLowerCase())
            // );
            if (
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
            ) {
                return (
                    post.body.toLowerCase().includes(search.toLowerCase()) ||
                    post.title.toLowerCase().includes(search.toLowerCase())
                );
            }
            return;
        });

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleDelete = (id) => {
        const postList = posts.filter((post) => post.id !== id);
        setPosts(postList);
        navigate("/");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const idOfNewPost = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetimeOfNewPost = new Date().toLocaleString();
        const newPost = {
            id: idOfNewPost,
            datetime: datetimeOfNewPost,
            title: postTitle,
            body: postBody,
        };
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
        navigate("/");
    };

    return (
        <div className="App">
            <Header title="React Blog" />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route path="/" element={<Home posts={searchResults} />} />
                <Route
                    path="/post"
                    element={
                        <NewPost
                            handleSubmit={handleSubmit}
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                        />
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        <PostPage posts={posts} handleDelete={handleDelete} />
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
