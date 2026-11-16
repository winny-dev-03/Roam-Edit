
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Destinations from "./pages/Destinations.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import Guides from "./pages/Guides.jsx";
import Stories from "./pages/Stories.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Technology from "./pages/Technology.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);

      return () => clearTimeout(t);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Shell() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollManager />
      <Navbar />

      <main key={pathname} className="animate-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetails />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<ArticleDetail />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return <Shell />;
}
