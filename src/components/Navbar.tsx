import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Organizers', path: '/organizers' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              className="text-xl md:text-2xl font-display font-bold neon-text"
              whileHover={{ scale: 1.05 }}
            >
              NMSS IT FEST
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    style={{ boxShadow: '0 0 10px hsl(180 100% 50% / 0.8)' }}
                  />
                )}
              </Link>
            ))}
            <Link to="/events" className="btn-neon text-sm">
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border/30"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/events"
                onClick={() => setIsOpen(false)}
                className="btn-neon text-center text-sm"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
