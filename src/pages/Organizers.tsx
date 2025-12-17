import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Facebook, Star, Users } from 'lucide-react';

const organizers = [
  {
    category: 'Event Coordinator',
    icon: Star,
    members: [
      {
        name: 'Binamra Sapkota',
        role: 'Leads the entire IT Fest and oversees all teams',
        facebook: 'https://www.facebook.com/binamra01',
        featured: true,
      },
    ],
  },
  {
    category: 'Core Organizing Team',
    icon: Users,
    members: [
      { name: 'Rohan Paudel', role: 'Assistant Coordinator' },
      { name: 'Prakhyat Tiwari', role: 'Event Manager' },
      { name: 'Rahul Sharma', role: 'Finance & Registration' },
      { name: 'Sushant Pokhrel', role: 'PR & Communication' },
      { name: 'Swikriti Battarai', role: 'Anchoring' },
      { name: 'Aashish Paudel', role: 'Anchoring' }
    ],
  },
  {
    category: 'Hackathon Team',
    icon: User,
    members: [
      { name: 'Bijan Paudel', role: 'Hackathon Lead' },
      { name: 'Success Adhikari', role: 'Technical Support' },
      { name: 'Aakriti Rijal', role: 'Timekeeping & Evaluation Support' },
    ],
  },
  {
    category: 'Esports Team',
    icon: User,
    members: [
      { name: 'Atish Paudel', role: 'Free Fire Coordinator' },
      { name: 'Arpan Parajuli', role: 'PUBG Coordinator' },
    ],
  },
  {
    category: 'Scratch Programming Team',
    icon: User,
    members: [
      { name: 'Binamra Sapkota', role: 'Scratch Event Lead' },
      { name: 'Sabina Shrestha', role: 'Evaluation & Support Coordinator' },
    ],
  },
  {
    category: 'Graphic Designing Team',
    icon: User,
    members: [
      { name: 'Prajwal Subedi', role: 'Graphic Designing Event Lead' },
      { name: 'Bipin Lamsal', role: 'Creative & Submission Manager' },
    ],
  },
  {
    category: 'Typing Battle Team',
    icon: User,
    members: [
      { name: 'Success Adhikari', role: 'Typing Battle Coordinator' },
    ],
  },
];

const Organizers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-gradient">Meet The Team</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind NMSS IT Fest 2082
            </p>
          </motion.div>

          {/* Teams */}
          <div className="space-y-12">
            {organizers.map((team, teamIndex) => (
              <motion.div
                key={team.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: teamIndex * 0.1 }}
              >
                {/* Team Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <team.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground">
                    {team.category}
                  </h2>
                </div>

                {/* Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {team.members.map((member, memberIndex) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: teamIndex * 0.1 + memberIndex * 0.05 }}
                      className={`glass-card-hover p-5 rounded-xl ${
                        member.featured ? 'border-primary/50 bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          member.featured ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <span className="text-lg font-display font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-foreground truncate">
                            {member.name}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {member.role}
                          </p>
                          {member.facebook && (
                            <a
                              href={member.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-primary text-sm mt-2 hover:underline"
                            >
                              <Facebook size={14} />
                              Profile
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Organizers;
