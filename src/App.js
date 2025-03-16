import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [subreddit, setSubreddit] = useState("all");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}/hot.json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.children) {
          setPosts(data.data.children.map((post) => post.data));
          setFilteredPosts(data.data.children.map((post) => post.data));
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [subreddit]);

  useEffect(() => {
    if (keyword) {
      setFilteredPosts(
        posts.filter((post) =>
          !post.title.toLowerCase().includes(keyword.toLowerCase()) // Add "!" to exclude posts with the keyword
        )
      );
      
    } else {
      setFilteredPosts(posts);
    }
  }, [keyword, posts]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Reddit Filter App</h1>
      
      {/* Subreddit Selection */}
      <input
        type="text"
        className="form-control my-2"
        placeholder="Enter subreddit (e.g. technology, news)"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
      />

      {/* Keyword Search */}
      <input
        type="text"
        className="form-control my-3"
        placeholder="Enter keyword to filter posts..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Post List */}
      <div className="list-group">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <a
              key={post.id}
              href={`https://www.reddit.com${post.permalink}`}
              className="list-group-item list-group-item-action"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.title}
            </a>
          ))
        ) : (
          <p className="text-center text-muted">No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default App;