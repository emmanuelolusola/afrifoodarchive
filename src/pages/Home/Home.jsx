import FoodArchive from "../../components/FoodArchive/FoodArchive";
import Header from "../../components/header/Header";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/searchBar/SearchBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <SearchBar />
      <FoodArchive />
    </div>
  );
};

export default Home;
