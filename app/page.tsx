import Navbar from '@/components/ui/Navbar';
import PopularMovies from '@/components/PopularMovies';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <PopularMovies />
      </div>
    </div>
  );
};

export default Home;
