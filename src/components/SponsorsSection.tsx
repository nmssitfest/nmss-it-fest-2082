import { motion } from 'framer-motion';

const sponsors = [
  { name: 'DishHome', logo: 'https://www.ids-digital.de/wp-content/uploads/2025/06/DHGO.png' },
  { name: 'Adhyaapan', logo: 'https://i.ibb.co/4ZBSzb3C/adhyaapan-logo.png' },
  { name: 'All in One Solution', logo: 'https://i.ibb.co/6RNZ303R/all-in-one-solution.jpg' },
];

const SponsorsSection = () => {
  return (
    <section className="py-20 bg-space-medium relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-display uppercase tracking-widest text-primary mb-2">
            Proudly
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Supported By
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover p-6 rounded-2xl flex items-center justify-center"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
