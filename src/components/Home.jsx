import Item from "./Item";

const Home = ({ posts, fetchError, isLoading }) => {
    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading...</p>}
            {!isLoading && fetchError && (
                <p style={{ color: "tomato" }} className="statusMsg">
                    {fetchError}
                </p>
            )}
            {!isLoading &&
                !fetchError &&
                (posts.length ? (
                    <Item posts={posts} />
                ) : (
                    <p className="statusMsg">No posts to display</p>
                ))}
        </main>
    );
};

export default Home;
