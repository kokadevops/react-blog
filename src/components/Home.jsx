import Item from "./Item";

const Home = ({ posts }) => {
    return (
        <main className="Home">
            {posts.length ? (
                <Item posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem", color: "red" }}>
                    no posts match
                </p>
            )}
        </main>
    );
};

export default Home;
