import About from '@/components/NewHome/About';
import BelowFooter from '@/components/NewHome/BelowFooter';
import Categories from '@/components/NewHome/Categories';
import JoinUs from '@/components/NewHome/JoinUs';
import LatestPosts from '@/components/NewHome/LatestPosts';
import Loading from '@/components/NewHome/Loading';
import CardsGrid from '@/components/NewHome/NewBlogCards';
import NewsShelter from '@/components/NewHome/NewsShelter';
import SocialFollow from '@/components/NewHome/SocialFollow';
import TopNavbar from '@/components/NewHome/TopNavbar';

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center gap-12">
        <div className="flex justify-start items-start gap-6">
          {/* Main blog content area */}
          <div>
            <CardsGrid />
          </div>

          {/* Sidebar with fixed positioning */}
          <div>
            <TopNavbar />
            <About />
            <SocialFollow />
            <NewsShelter />
            <LatestPosts />
            <Categories />
            <JoinUs />
          </div>
        </div>
      </div>
      <Loading />
      <BelowFooter />
    </main>
  );
}
