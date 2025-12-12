import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Gamepad2, Palette, Keyboard, Terminal, ArrowRight } from 'lucide-react';

const events = [
  {
    name: 'Hackathon',
    icon: Code,
    prize: '18,000',
    description: '24-hour coding marathon',
  },
  {
    name: 'Esports',
    icon: Gamepad2,
    prize: '24,000',
    description: 'Free Fire & PUBG',
  },
  {
    name: 'Graphic Design',
    icon: Palette,
    prize: '5,000',
    description: 'Showcase your creativity',
  },
  {
    name: 'Typing Battle',
    icon: Keyboard,
    prize: '3,000',
    description: 'Speed & accuracy',
  },
  {
    name: 'Scratch',
    icon: Terminal,
    prize: '3,000',
    description: 'Block programming',
  },
];

const EventsPreview = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-display uppercase tracking-widest text-primary mb-2">
            Compete & Win
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured Events
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from 5 exciting competitions and showcase your skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card-hover p-6 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <event.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h4 className="text-xl font-display font-bold text-foreground mb-2">
                  {event.name}
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Prize Pool</p>
                    <p className="text-lg font-display font-bold text-gradient">
                      NRs. {event.prize}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/events" className="btn-neon font-display inline-flex items-center gap-2">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsPreview;
