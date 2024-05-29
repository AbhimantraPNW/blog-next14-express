'use client';

import AuthGuard from '@/hoc/AuthGuard';
import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { useAppSelector } from '@/redux/hooks';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const queries = { page: 1, limit: 10 };
  const { data: blogs, isLoading, meta } = useGetBlogs(queries);

  const userBlogs = blogs.filter((blog) => blog.userId === user.id);
  const totalPosts = userBlogs.length;

  return (
    <main className="container mx-auto px-4 mt-10 mb-10">
      <div className="profile-header flex flex-col items-center">
        <div className="relative w-36 h-32">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <div className="w-36 mt-1 items-center">{user.fullName}</div>
          </Avatar>
        </div>
        <div className="mt-10">
          <p className="text-gray-600">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-lg font-semibold">Total Blog Posts: {totalPosts}</p>
      </div>

      {/* User Blogs */}
      <div className="blog-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          userBlogs.map((blog) => (
            <Link href={`/${blog.id}`}>
              <div
                key={blog.id}
                className="blog-card p-4 bg-white rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="line-clamp-2 text-gray-700">{blog.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
};

export default AuthGuard(Profile);
