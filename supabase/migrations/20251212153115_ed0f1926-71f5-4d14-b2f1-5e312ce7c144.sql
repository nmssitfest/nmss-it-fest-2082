-- Drop the permissive SELECT policy on storage.objects for payment-screenshots
DROP POLICY IF EXISTS "Anyone can view payment screenshots" ON storage.objects;

-- Create a restrictive policy that only allows authenticated users to view payment screenshots
CREATE POLICY "Only authenticated users can view payment screenshots"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'payment-screenshots' 
  AND auth.role() = 'authenticated'
);