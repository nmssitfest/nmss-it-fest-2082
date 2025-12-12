import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-space-dark border-t border-border/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold neon-text mb-4">
              NMSS IT FEST
            </h3>
            <p className="text-muted-foreground mb-4">
              Nepal's premier school technology event bringing together young innovators and tech enthusiasts.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61583806525138"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/nmssitfest/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Events', 'Schedule', 'Organizers', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Events</h4>
            <ul className="space-y-2">
              {['Hackathon', 'Esports', 'Graphic Designing', 'Scratch Programming', 'Typing Battle'].map((event) => (
                <li key={event}>
                  <Link
                    to="/events"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {event}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a href="mailto:nmssitfest@gmail.com" className="hover:text-primary transition-colors">
                  nmssitfest@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a href="tel:+9779767467837" className="hover:text-primary transition-colors">
                  +977 9767467837
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={16} className="text-primary mt-1" />
                <span>Narayani Model Secondary School, Bharatpur</span>
              </li>
              <li>
                <a
                  href="https://narayani.edu.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink size={14} />
                  School Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center text-muted-foreground text-sm">
          <p>
            © 2025 NMSS IT Fest. All rights reserved. | Narayani Model Secondary School
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
