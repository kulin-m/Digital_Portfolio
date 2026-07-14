import React from 'react';
import SceneCanvas from './components/canvas/SceneCanvas';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

// Error boundary to catch 3D rendering crashes without killing the whole page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('3D Scene Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse at center, #0d1426 0%, #060913 100%)'
        }} />
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="relative min-h-screen text-white" style={{ background: '#060913', fontFamily: 'Inter, sans-serif' }}>
      {/* Loading overlay */}
      <Loading />

      {/* 3D Canvas Background — wrapped in error boundary */}
      <ErrorBoundary>
        <SceneCanvas />
      </ErrorBoundary>

      {/* Navigation */}
      <Navbar />

      {/* 2D Overlay content flow */}
      <main className="relative w-full flex flex-col" style={{ zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
