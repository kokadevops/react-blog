import React from "react";
import Post from "./Post";

const Item = ({ posts }) => {
    return (
        <>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
};

export default Item;
