import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Code, Gamepad2, Palette, Keyboard, Terminal, Trophy, Users, Banknote, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for registration form
const registrationSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  leaderName: z.string().trim().min(1, 'Name is required').max(100, 'Name too long').optional(),
  fullName: z.string().trim().min(1, 'Name is required').max(100, 'Name too long').optional(),
  leaderContact: z.string().trim().regex(/^[0-9]{10}$/, 'Contact must be 10 digits').optional(),
  contact: z.string().trim().regex(/^[0-9]{10}$/, 'Contact must be 10 digits').optional(),
  teamName: z.string().trim().max(100, 'Team name too long').optional(),
  member2: z.string().trim().max(100, 'Name too long').optional(),
  member3: z.string().trim().max(100, 'Name too long').optional(),
  member4: z.string().trim().max(100, 'Name too long').optional(),
  school: z.string().trim().max(200, 'School name too long').optional(),
  class: z.string().trim().max(50, 'Class too long').optional(),
}).refine(data => data.leaderName || data.fullName, {
  message: 'Name is required',
}).refine(data => data.leaderContact || data.contact, {
  message: 'Contact number is required',
});

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const events = [
  {
    id: 'hackathon',
    name: 'Hackathon',
    icon: Code,
    entryFee: 1000,
    prize: 18000,
    description: 'A 12-hour coding marathon where teams build innovative solutions to real-world problems.',
    teamSize: '2-4 members',
    fields: ['teamName', 'leaderName', 'leaderContact', 'email', 'member2', 'member3', 'member4'],
    requiresPayment: true,
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    icon: Gamepad2,
    entryFee: 200,
    prize: 12000,
    description: 'Battle it out in the ultimate Free Fire tournament. Show your squad\'s skills!',
    teamSize: '4 members',
    fields: ['teamName', 'leaderName', 'leaderContact', 'email', 'member2', 'member3', 'member4'],
    requiresPayment: true,
    category: 'Esports',
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    icon: Gamepad2,
    entryFee: 200,
    prize: 12000,
    description: 'Dominate the battleground in our PUBG Mobile championship.',
    teamSize: '4 members',
    fields: ['teamName', 'leaderName', 'leaderContact', 'email', 'member2', 'member3', 'member4'],
    requiresPayment: true,
    category: 'Esports',
  },
  {
    id: 'graphic',
    name: 'Graphic Designing',
    icon: Palette,
    entryFee: 0,
    prize: 5000,
    prizeLabel: 'Rewards worth up to NRs. 5000.',
    description: 'Unleash your creativity and design stunning visuals on given themes.',
    teamSize: 'Individual',
    fields: ['fullName', 'contact', 'email', 'school', 'class'],
    requiresPayment: false,
  },
  {
    id: 'scratch',
    name: 'Scratch Programming',
    icon: Terminal,
    entryFee: 0,
    prize: 3000,
    prizeLabel: 'Rewards worth up to NRs. 3000.',
    description: 'Create interactive stories, games, and animations using Scratch.',
    teamSize: 'Individual',
    fields: ['fullName', 'contact', 'email', 'school', 'class'],
    requiresPayment: false,
  },
  {
    id: 'typing',
    name: 'Typing Battle',
    icon: Keyboard,
    entryFee: 0,
    prize: 3000,
    prizeLabel: 'Rewards worth up to NRs. 3000.',
    description: 'Test your typing speed and accuracy in this exciting competition.',
    teamSize: 'Individual',
    fields: ['fullName', 'contact', 'email', 'school', 'class'],
    requiresPayment: false,
  },
  {
    id: 'cssbattle',
    name: 'CSS Battle',
    icon: Terminal,
    entryFee: 0,
    prize: 3000,
    prizeLabel: 'Rewards worth up to NRs. 3000.',
    description: 'Showcase your CSS skills by replicating designs with precision and speed.',
    teamSize: 'Individual',
    fields: ['fullName', 'contact', 'email', 'school', 'class'],
    requiresPayment: false,
  }
];

const paymentQR = 'https://i.ibb.co/b5jDGJBj/Payment-QR.jpg';

interface FormData {
  [key: string]: string | File | null;
}

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data with zod schema
      const validationData = {
        email: formData.email as string,
        leaderName: formData.leaderName as string | undefined,
        fullName: formData.fullName as string | undefined,
        leaderContact: formData.leaderContact as string | undefined,
        contact: formData.contact as string | undefined,
        teamName: formData.teamName as string | undefined,
        member2: formData.member2 as string | undefined,
        member3: formData.member3 as string | undefined,
        member4: formData.member4 as string | undefined,
        school: formData.school as string | undefined,
        class: formData.class as string | undefined,
      };

      const validationResult = registrationSchema.safeParse(validationData);
      if (!validationResult.success) {
        const errorMessage = validationResult.error.errors[0]?.message || 'Invalid form data';
        throw new Error(errorMessage);
      }

      // Additional validation for required members based on event type
      if (selectedEvent?.id === 'hackathon' && !validationData.member2?.trim()) {
        throw new Error('Member 2 is required for Hackathon');
      }
      if ((selectedEvent?.id === 'freefire' || selectedEvent?.id === 'pubg')) {
        if (!validationData.member2?.trim()) throw new Error('Member 2 is required');
        if (!validationData.member3?.trim()) throw new Error('Member 3 is required');
        if (!validationData.member4?.trim()) throw new Error('Member 4 is required');
      }

      let paymentScreenshotUrl = null;

      // Upload payment screenshot if required
      if (selectedEvent?.requiresPayment && formData.paymentProof) {
        const file = formData.paymentProof as File;
        
        // Validate file size (500KB max)
        if (file.size > MAX_FILE_SIZE) {
          throw new Error('Payment screenshot must be less than 500KB');
        }
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${selectedEvent.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('payment-screenshots')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('payment-screenshots')
          .getPublicUrl(fileName);

        paymentScreenshotUrl = urlData.publicUrl;
      }

      // Determine sub-event for esports
      const subEvent = selectedEvent?.category === 'Esports' ? selectedEvent.name : null;

      // Insert registration data with validated values
      const { error: insertError } = await supabase.from('registrations').insert({
        event_type: selectedEvent?.id || '',
        sub_event: subEvent,
        team_name: validationResult.data.teamName || null,
        leader_name: (validationResult.data.leaderName || validationResult.data.fullName) as string,
        leader_contact: (validationResult.data.leaderContact || validationResult.data.contact) as string,
        email: validationResult.data.email,
        member_2: validationResult.data.member2 || null,
        member_3: validationResult.data.member3 || null,
        member_4: validationResult.data.member4 || null,
        school: validationResult.data.school || null,
        class: validationResult.data.class || null,
        payment_screenshot_url: paymentScreenshotUrl,
      });

      if (insertError) throw insertError;

      toast({
        title: 'Registration Submitted!',
        description: 'We will inform you via email about your registration status.',
      });

      setSelectedEvent(null);
      setFormData({});
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldLabel = (field: string, eventId?: string) => {
    const labels: { [key: string]: string } = {
      teamName: 'Team Name',
      leaderName: 'Team Leader Name',
      leaderContact: 'Leader Contact No.',
      email: 'Email Address',
      member2: 'Member 2',
      member3: 'Member 3',
      member4: 'Member 4',
      fullName: 'Full Name',
      contact: 'Contact No.',
      school: 'School Name',
      class: 'Class',
      paymentProof: 'Payment Screenshot',
    };
    const label = labels[field] || field;
    
    // Add (Optional) suffix for non-required member fields
    if (['member2', 'member3', 'member4'].includes(field) && !isRequired(field, eventId)) {
      return `${label} (Optional)`;
    }
    return label;
  };

  const isRequired = (field: string, eventId?: string) => {
    const alwaysRequired = ['teamName', 'leaderName', 'leaderContact', 'email', 'fullName', 'contact', 'school', 'class'];
    if (alwaysRequired.includes(field)) return true;
    
    // Hackathon: member2 required
    if (eventId === 'hackathon' && field === 'member2') return true;
    
    // Free Fire & PUBG: all members required
    if ((eventId === 'freefire' || eventId === 'pubg') && ['member2', 'member3', 'member4'].includes(field)) return true;
    
    return false;
  };

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
              <span className="text-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your arena and compete for glory! Register for any event below.
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 rounded-2xl cursor-pointer group"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <event.icon className="w-7 h-7 text-primary" />
                  </div>
                  {event.category && (
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                      {event.category}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {event.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="glass-card p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Banknote size={14} />
                      Entry Fee
                    </div>
                    <p className="font-display font-bold text-foreground">
                      {event.entryFee === 0 ? 'FREE' : `NRs. ${event.entryFee}`}
                    </p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Trophy size={14} />
                      Prize Pool
                    </div>
                    <p className="font-display font-bold text-gradient text-sm">
                      {event.prizeLabel || `NRs. ${event.prize.toLocaleString()}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Users size={16} />
                  {event.teamSize}
                </div>

                <button className="w-full btn-neon text-sm">
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border/50 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Register for {selectedEvent.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Fill in the details below to complete registration
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-foreground/70 hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {selectedEvent.fields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {getFieldLabel(field, selectedEvent.id)}
                      {isRequired(field, selectedEvent.id) && <span className="text-destructive ml-1">*</span>}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field.includes('contact') || field.includes('Contact') ? 'tel' : 'text'}
                      required={isRequired(field, selectedEvent.id)}
                      value={(formData[field] as string) || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder={`Enter ${getFieldLabel(field, selectedEvent.id).toLowerCase().replace(' (optional)', '')}`}
                    />
                  </div>
                ))}

                {selectedEvent.requiresPayment && (
                  <>
                    <div className="glass-card p-4 rounded-xl">
                      <h4 className="font-display font-bold text-foreground mb-3">
                        Payment Details
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Scan the QR code below to pay the entry fee of NRs. {selectedEvent.entryFee}
                      </p>
                      <div className="flex justify-center">
                        <img
                          src={paymentQR}
                          alt="Payment QR Code"
                          className="w-48 h-48 rounded-lg bg-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Upload Payment Screenshot <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => handleInputChange('paymentProof', e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium"
                      />
                      <p className="text-xs text-muted-foreground mt-2">Max file size: 500KB</p>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon font-display disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Events;
