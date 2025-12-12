-- Fix 1: Remove public SELECT access from registrations table
-- Since there's no authentication, we'll make it insert-only (no public reads)
DROP POLICY IF EXISTS "Users can view registrations by email" ON registrations;

-- Fix 2: Make payment-screenshots bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'payment-screenshots';