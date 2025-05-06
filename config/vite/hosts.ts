
/**
 * Allowed hosts configuration for Vite development server
 */
export const getHostConfig = () => [
  'localhost', 
  '127.0.0.1',
  '*.lovableproject.com',  // Wildcard for all Lovable project domains
  '*.lovable.app',         // For production Lovable domains
  '1f36dc50-ac38-4134-b1ae-182f758d0235.lovableproject.com' // Specific domain
];
