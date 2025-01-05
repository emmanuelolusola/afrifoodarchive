import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FoodArchive from "../../components/FoodArchive/FoodArchive";
import Header from "../../components/header/Header";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/searchBar/SearchBar";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  return (
    <div>
      <NavBar />
      <div className="px-[20px] md:px-[150px]">
        <Header />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FoodArchive searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
