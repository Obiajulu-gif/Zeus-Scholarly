import { Route, Routes } from "react-router-dom";
import ProductDetail from "../ProductDetail";

const Home = () => {
    return (
        <div>
      <h1>Home</h1>
      <Routes>
        <Route path="/emmanuel" element={<p>Emmanuel</p>} /> {/* Correctly close the ProductDetail component */}
      </Routes>
        </div>
    );
};

export default Home;