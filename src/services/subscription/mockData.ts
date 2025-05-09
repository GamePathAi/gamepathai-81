
import { Plan } from './types';

// Mock plans data matching the Stripe plans (Player, Co-op, Alliance)
export const mockPlans: Plan[] = [
  {
    id: 'player',
    name: 'Player',
    price: 9.99,
    interval: 'month',
    features: [
      'Single PC optimization',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Basic route optimization'
    ]
  },
  {
    id: 'coop',
    name: 'Co-op',
    price: 17.99,
    interval: 'month',
    features: [
      'Up to 3 devices',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Advanced route optimization',
      'Priority support'
    ]
  },
  {
    id: 'alliance',
    name: 'Alliance',
    price: 29.99,
    interval: 'month',
    features: [
      'Up to 5 devices',
      'Game-specific profiles',
      'Real-time network monitoring',
      'Advanced route optimization',
      'Priority support',
      'Team analytics dashboard',
      'Custom game server selection'
    ]
  }
];
