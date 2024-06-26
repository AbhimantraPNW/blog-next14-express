'use client';

import Autocomplete from '@/components/Autocomplete';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { appConfig } from '@/utils/config';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const { data: blogs, meta } = useGetBlogs({
    page,
    take: 6,
  });


  const handleChangePaginate = ({selected} : {selected: number}) => {
    setPage(selected + 1)
  }

  return (
    <main className="container mx-auto px-4">
      {/* Jumbotron */}
      <section className="text-center mt-10">
        <h1 className="text-4xl font-bold">Blog Hub</h1>
        <p className="text-xl">this is my blog!</p>
      </section>
      <Autocomplete />

      {/* Cards */}
      <section className="grid grid-cols md:grid-cols-3 gap-4">
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              title={blog.title}
              author={blog.user.fullName}
              category={blog.category}
              createdAt={new Date(blog.createdAt)}
              description={blog.description}
              imageUrl={appConfig.baseUrl + `/assets${blog.thumbnail}`}
              blogId={blog.id}
            />
          );
        })}
      </section>

      <div className='my-8 flex justify-center'>
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </main>
  );
} 
