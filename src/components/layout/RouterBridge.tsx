import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNavigate } from '@/lib/scroll';

/**
 * Lets the plain `scrollToSection()` helper navigate back to the home page
 * when it is called from another route (e.g. navbar on /student-projects).
 */
const RouterBridge = () => {
  const navigate = useNavigate();

  useEffect(() => {
    registerNavigate((to) => navigate(to));
    return () => registerNavigate(null);
  }, [navigate]);

  return null;
};

export default RouterBridge;
