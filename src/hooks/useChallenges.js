import { useContext } from 'react';
import { ChallengesContext } from '@/Context/ChallengesContext';

export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }

  const { challenges, setChallenges, getRandomChallenge } = context;

  const clearChallenges = () => {
    setChallenges([]);
  };

  const getChallenges = () => challenges;

  const hasChallenges = () => challenges.length > 0;

  const getChallengeCount = () => challenges.length;

  const getChallengesByType = (type) => {
    return challenges.filter(challenge => challenge.type.name === type);
  };

  return {
    // State
    challenges,

    // Actions
    setChallenges,
    clearChallenges,

    // Core functionality
    getRandomChallenge,

    // Getters
    getChallenges,
    hasChallenges,
    getChallengeCount,
    getChallengesByType,
  };
}; 