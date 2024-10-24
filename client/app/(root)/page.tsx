import BestBlogs from '@/components/Home/BestBlog/BestBlogs';
import Category from '@/components/Home/Category/Category';
import { Hero } from '@/components/Home/Hero/Hero';

import NewsLetter from '@/components/Home/NewsLetter/NewsLetter';
import SubHero from '@/components/Home/SubHero/SubHero';
import WorkWithUs from '@/components/Home/WorkWithUs/WorkWithUs';
import CardsGrid from '@/components/NewHome/NewBlogCards';

export default function Home() {
  return (
    <>
      <Hero />
      <SubHero />
      <Category />
      <BestBlogs />
      <CardsGrid />
      <NewsLetter />
      <WorkWithUs />
    </>
  );
}
