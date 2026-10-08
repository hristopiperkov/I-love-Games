import { Route, Routes } from "react-router";
import Catalog from "./components/Catalog/Catalog";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/home/Home";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
      </Routes>
      <Footer />
    </>
  );
}
