import PopularMovies from "@/components/PopularMovies";
import { Suspense } from "react";
import Loading from "./loading";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
        <Suspense fallback={<Loading />}>
          <PopularMovies />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
