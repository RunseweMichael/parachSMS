import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [completedWeeks, setCompletedWeeks] = useState(new Set());
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [weekScores, setWeekScores] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('courseProgress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedWeeks(new Set(data.completedWeeks || []));
        setTotalWeeks(data.totalWeeks || 0);
        setWeekScores(data.weekScores || {});
      } catch (err) {
        console.error('Failed to load progress:', err);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = {
      completedWeeks: Array.from(completedWeeks),
      totalWeeks,
      weekScores
    };
    localStorage.setItem('courseProgress', JSON.stringify(data));
  }, [completedWeeks, totalWeeks, weekScores]);

  // Computed values
  const courseCompleted = totalWeeks > 0 && completedWeeks.size >= totalWeeks;
  const completionPercentage = totalWeeks > 0 
    ? Math.round((completedWeeks.size / totalWeeks) * 100) 
    : 0;

  // 1. USE CALLBACK TO PREVENT INFINITE LOOPS
  const markWeekComplete = useCallback((weekId, score) => {
    setCompletedWeeks(prev => {
      const newSet = new Set(prev);
      newSet.add(weekId);
      return newSet;
    });
    if (score !== undefined) {
      setWeekScores(prev => ({ ...prev, [weekId]: score }));
    }
  }, []);

  const setTotalWeeksCount = useCallback((count) => {
    // Only update if the number is actually different
    setTotalWeeks(prev => (prev !== count ? count : prev));
  }, []);

  const loadCompletedWeeks = useCallback((weeks, scores = {}) => {
    setCompletedWeeks(new Set(weeks));
    setWeekScores(scores);
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedWeeks(new Set());
    setTotalWeeks(0);
    setWeekScores({});
    localStorage.removeItem('courseProgress');
  }, []);

  // 2. MEMOIZE THE VALUE OBJECT
  const value = useMemo(() => ({
    completedWeeks,
    totalWeeks,
    weekScores,
    courseCompleted,
    completionPercentage,
    markWeekComplete,
    setTotalWeeksCount,
    loadCompletedWeeks,
    resetProgress
  }), [completedWeeks, totalWeeks, weekScores, courseCompleted, completionPercentage, markWeekComplete, setTotalWeeksCount, loadCompletedWeeks, resetProgress]);

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseProgress = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within CourseProvider');
  }
  return context;
};

export default CourseContext;