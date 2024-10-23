'use client';
import { IBlog } from '@/types/blog';
import BestBlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import CustomHeader from '@/components/shared/CustomHeader/CustomHeader';

const BestBlogsServer = () => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  if (isLoading) {
    return <CustomLoader />;
  }
  return (
    <div className="w-full px-2 md:p-4 ">
      <div className="flex align-center  gap-5 items-center">
        <h2 className="mt-20 border-secondary border-l-2 border-t-2 h-10 w-full"></h2>
        <h2 className="pt-10 text-gray-700 flex justify-center items-center text-divider w-[780px]  md:lg:w-[580px] font-semibold md:text-[15px] text-[12px]">
          Most Popular
        </h2>
        <h2 className="mt-20  border-secondary w-full border-t-2 border-r-2 h-10"></h2>
      </div>
      <div className="wrapper mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:m-0 ">
          {data?.blogs
            ?.slice(0, 4)
            .map((blog: IBlog) => <BestBlogCard blog={blog} key={blog.id} />)}
        </div>
        <div className="flex-center mt-10">
          {/* <Button asChild className="group animate-in zoom-in duration-500">
            <Link
              href="/blogs"
              className="flex items-center gap-2 font-semibold"
            >
              View All
              <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </Link>
          </Button> */}
        </div>
      </div>
      <div className="flex mt-5">
        <div className="flex-1 border-b-2 border-l-2 border-r-2 border-secondary h-10"></div>
      </div>
    </div>
  );
};

export default BestBlogsServer;
