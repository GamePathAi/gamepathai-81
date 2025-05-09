
/**
 * Helper function to ensure interval is valid
 */
export const validateInterval = (interval: string): 'month' | 'quarter' | 'year' => {
  if (interval === 'month' || interval === 'quarter' || interval === 'year') {
    return interval;
  }
  // Default to month if invalid
  return 'month';
};
