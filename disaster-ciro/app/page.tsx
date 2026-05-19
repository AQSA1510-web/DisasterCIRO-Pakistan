'use client';
import { useState } from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  return showApp ? (
    <Dashboard onBack={() => setShowApp(false)} />
  ) : (
    <Landing onLaunch={() => setShowApp(true)} />
  );
}
