import React from "react";

const NewPost = ({
    handleSubmit,
    postTitle,
    setPostTitle,
    postBody,
    setPostBody,
}) => {
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title</label>
                <input
                    type="text"
                    id="postTitle"
                    onChange={(e) => setPostTitle(e.target.value)}
                    value={postTitle}
                    required
                    autoFocus
                />
                <label htmlFor="postBody">Body</label>
                <textarea
                    id="postBody"
                    onChange={(e) => setPostBody(e.target.value)}
                    value={postBody}
                    required
                />
                <button type="submit">Create Post</button>
            </form>
        </main>
    );
};

export default NewPost;
