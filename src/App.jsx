// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { StoriesProvider } from './context/StoriesContext';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Stories from './pages/Stories';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Events from './pages/Events';
import Tech from './pages/Tech';
import Contact from './pages/Contact';
import Article from './pages/Article';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  return (
    <StoriesProvider>
      <ScrollToTop />
      <Topbar />
      <Navbar />
      <main key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/nigerian-news" element={<CategoryPage section="nigeria" />} />
          <Route path="/world-news" element={<CategoryPage section="world" />} />
          <Route path="/politics" element={<CategoryPage section="politics" />} />
          <Route path="/entertainment" element={<CategoryPage section="entertainment" />} />
          <Route path="/lifestyle" element={<CategoryPage section="lifestyle" />} />
          <Route path="/sports" element={<CategoryPage section="sports" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </StoriesProvider>
  );
}