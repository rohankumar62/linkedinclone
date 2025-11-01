import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('post', new Blob([JSON.stringify({ content })], { type: 'application/json' }));
      if (image) {
        formData.append('image', image);
      }

      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setContent('');
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;
    try {
      await api.post(`/posts/${postId}/comments`, { content: commentText[postId] });
      setCommentText({ ...commentText, [postId]: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditPost = async (postId) => {
    try {
      await api.put(`/posts/${postId}`, { content: editContent });
      setEditingPost(null);
      setEditContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const isLikedByUser = (post) => {
    return post.likes?.some(like => like.user.id === user.id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
          <form onSubmit={handleCreatePost}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
              rows="3"
              required
            />
            <div className="mt-3 flex items-center justify-between">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{post.user.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
                {user.id === post.user.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(post.id);
                        setEditContent(post.content);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingPost === post.id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
                    rows="3"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingPost(null);
                        setEditContent('');
                      }}
                      className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 mb-4">{post.content}</p>
              )}

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full rounded mb-4 max-h-96 object-cover"
                />
              )}

              <div className="flex items-center gap-4 pt-4 border-t">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 ${
                    isLikedByUser(post) ? 'text-blue-600' : 'text-gray-600'
                  } hover:text-blue-600`}
                >
                  <span>{isLikedByUser(post) ? '👍' : '👍🏻'}</span>
                  <span>{post.likes?.length || 0} Likes</span>
                </button>
                <button
                  onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                  className="text-gray-600 hover:text-blue-600"
                >
                  💬 {post.comments?.length || 0} Comments
                </button>
              </div>

              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={commentText[post.id] || ''}
                      onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                      placeholder="Write a comment..."
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Comment
                    </button>
                  </div>

                  <div className="space-y-3">
                    {post.comments?.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-sm">{comment.user.name}</p>
                            <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
                          </div>
                          <p className="text-gray-400 text-xs">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
