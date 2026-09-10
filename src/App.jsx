import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Loading } from './components/ui/State';

// Code-split every page for a fast initial load.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WhyChooseUs = lazy(() => import('./pages/WhyChooseUs'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const CmsPage = lazy(() => import('./pages/CmsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="why-choose-us" element={<WhyChooseUs />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticleDetail />} />
          {/* Dynamic CMS pages (privacy, terms, and any admin-created page). */}
          <Route path=":slug" element={<CmsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
