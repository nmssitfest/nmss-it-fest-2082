import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin } from 'lucide-react';

const schedule = [
  {
    day: 'Day 1',
    date: 'December 25, 2025',
    events: [
      { time: '8:30 AM', activity: 'Hackathon Kick-off', description: 'Opening ceremony and theme reveal' },
      { time: '9:00 AM', activity: 'Hackathon Begins', description: '12-hour coding marathon starts' },
      { time: '10:30 AM', activity: 'E-sports Qualifying Rounds', description: 'Free Fire & PUBG qualifiers' },
    ],
  },
  {
    day: 'Day 2',
    date: 'December 26, 2025',
    events: [
      { time: '10:30 AM', activity: 'Typing Battle', description: 'Speed typing competition' },
      { time: '11:00 AM', activity: 'Scratch Programming', description: 'Block-based coding challenge' },
      { time: '11:30 AM', activity: 'Graphic Designing', description: 'Creative design competition' },
      { time: '9:00 AM', activity: 'Hackathon Continues', description: 'Mid-way checkpoints' },
    ],
  },
  {
    day: 'Day 3',
    date: 'December 27, 2025',
    events: [
      { time: '9:00 AM', activity: 'Hackathon Submission', description: 'Final project submissions' },
      { time: '10:00 AM', activity: 'E-sports Finals', description: 'Championship matches' },
      { time: '2:00 PM', activity: 'Judging & Evaluation', description: 'All events judged' },
      { time: '3:00 PM', activity: 'Prize Distribution', description: 'Awards ceremony & closing remarks' },
    ],
  },
];

const Schedule = () => {
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
              <span className="text-gradient">Event Schedule</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Three days of innovation, competition, and celebration
            </p>
            <div className="inline-flex items-center gap-4 glass-card px-6 py-3 rounded-full">
              <div className="flex items-center gap-2 text-primary">
                <Calendar size={18} />
                <span className="font-medium">Dec 25-27, 2025</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} />
                <span>NMSS, Bharatpur</span>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {schedule.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dayIndex * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Day Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center neon-border">
                    <span className="text-2xl font-display font-bold text-primary">{dayIndex + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">{day.day}</h2>
                    <p className="text-muted-foreground">{day.date}</p>
                  </div>
                </div>

                {/* Events */}
                <div className="ml-8 border-l-2 border-border/50 pl-8 space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <motion.div
                      key={event.activity}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.2 + eventIndex * 0.1 }}
                      className="relative glass-card-hover p-5 rounded-xl"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute -left-[2.75rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary neon-border" />
                      
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2 text-primary min-w-[100px]">
                          <Clock size={16} />
                          <span className="font-medium">{event.time}</span>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground mb-1">
                            {event.activity}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {event.description}
                          </p>
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

export default Schedule;
