import React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/posts";
import axios from "axios";

const App = () => {
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostsData = async () => {
            try {
                const resp = await api.get("/posts");
                setPosts(resp.data);
            } catch (err) {
                {
                    err.resp
                        ? console.log(err.resp.data)
                        : console.log(`Error ${err.message}`);
                }
            }
        };
        fetchPostsData();
    }, []);

    useEffect(() => {
        const filteredResults = posts.filter((post) => {
            return (
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
            );
        });

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleEdit = async (id) => {
        const datetimeOfEditPost = new Date().toLocaleString();
        const updatedPost = {
            id: id,
            datetime: datetimeOfEditPost,
            title: editTitle,
            body: editBody,
        };
        try {
            const resp = await api.put(`/posts/${id}`, updatedPost);
            setPosts(
                posts.map((post) => (post.id === id ? { ...resp.data } : post))
                // .reverse()
            );
            setEditBody("");
            setEditTitle("");
            navigate("/");
        } catch (err) {
            console.log(`Error ${err.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter((post) => post.id !== id);
            setPosts(postList);
            navigate("/");
        } catch (err) {
            console.log(`Error ${err.message}`);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const idOfNewPost = Math.random();
        // const idOfNewPost = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetimeOfNewPost = new Date().toLocaleString();
        const newPost = {
            id: idOfNewPost,
            datetime: datetimeOfNewPost,
            title: postTitle,
            body: postBody,
        };
        try {
            const resp = await api.post("/posts", newPost);
            const allPosts = [...posts, resp.data];
            setPosts(allPosts);
            setPostTitle("");
            setPostBody("");
            navigate("/");
        } catch (err) {
            console.log(`Error ${err.message}`);
        }
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
                    path="/edit/:id"
                    element={
                        <EditPost
                            posts={posts}
                            handleEdit={handleEdit}
                            editTitle={editTitle}
                            setEditTitle={setEditTitle}
                            editBody={editBody}
                            setEditBody={setEditBody}
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
