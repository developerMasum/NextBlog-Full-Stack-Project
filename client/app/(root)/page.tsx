import About from '@/components/NewHome/About';
import Categories from '@/components/NewHome/Categories';
import LatestPosts from '@/components/NewHome/LatestPosts';
import CardsGrid from '@/components/NewHome/NewBlogCards';
import NewsShelter from '@/components/NewHome/NewsShelter';
import SocialFollow from '@/components/NewHome/SocialFollow';

export default function Home() {
  return (
    <main className="flex justify-center items-center gap-12">
      <div className="flex justify-start items-start gap-6">
        {/* Main blog content area */}
        <div>
          <CardsGrid />
        </div>

        {/* Sidebar with fixed positioning */}
        <div>
          <About />
          <SocialFollow />
          <NewsShelter />
          <LatestPosts />
          <Categories />
        </div>
      </div>
    </main>
  );
}
