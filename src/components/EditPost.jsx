import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts,
    handleEdit,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [post, setEditBody, setEditTitle]);

    return (
        <main className="NewPost">
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="newPostForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="postTitle">Title</label>
                        <input
                            type="text"
                            id="postTitle"
                            onChange={(e) => setEditTitle(e.target.value)}
                            value={editTitle}
                            required
                            autoFocus
                        />
                        <label htmlFor="postBody">Body</label>
                        <textarea
                            id="postBody"
                            onChange={(e) => setEditBody(e.target.value)}
                            value={editBody}
                            required
                        />
                        <button
                            type="submit"
                            onClick={() => handleEdit(post.id)}
                        >
                            Post
                        </button>
                    </form>
                </>
            )}

            {!post && (
                <>
                    <h2>Post not found</h2>
                    <Link to="/">Back to Home Page</Link>
                </>
            )}
        </main>
    );
};
export default EditPost;
