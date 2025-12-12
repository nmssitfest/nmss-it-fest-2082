-- Create registrations table for all events
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  sub_event TEXT,
  team_name TEXT,
  leader_name TEXT NOT NULL,
  leader_contact TEXT NOT NULL,
  email TEXT NOT NULL,
  member_2 TEXT,
  member_3 TEXT,
  member_4 TEXT,
  school TEXT,
  class TEXT,
  payment_screenshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required for registration)
CREATE POLICY "Anyone can register" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading own registration by email (for future reference)
CREATE POLICY "Users can view registrations by email" 
ON public.registrations 
FOR SELECT 
USING (true);

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-screenshots', 'payment-screenshots', true);

-- Allow public uploads to payment-screenshots bucket
CREATE POLICY "Anyone can upload payment screenshots"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment-screenshots');

-- Allow public read access
CREATE POLICY "Anyone can view payment screenshots"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-screenshots');