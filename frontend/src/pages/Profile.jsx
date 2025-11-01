import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/user/${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
              <p className="text-gray-500 text-sm mt-1">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Posts ({posts.length})</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-b pb-4">
                <p className="text-gray-800">{post.content}</p>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full rounded mt-2 max-h-64 object-cover"
                  />
                )}
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>👍 {post.likes?.length || 0} Likes</span>
                  <span>💬 {post.comments?.length || 0} Comments</span>
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-gray-500 text-center py-8">No posts yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
