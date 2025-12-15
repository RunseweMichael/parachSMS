import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const CourseContext = createContext();

const STORAGE_KEY = "courseProgress";
const STORAGE_VERSION = 1;

export const CourseProvider = ({ children }) => {
  const [completedWeeks, setCompletedWeeks] = useState(new Set());
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [weekScores, setWeekScores] = useState({});

  /* ---------------- LOAD FROM STORAGE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.version !== STORAGE_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      setCompletedWeeks(new Set(data.completedWeeks || []));
      setTotalWeeks(Number(data.totalWeeks) || 0);
      setWeekScores(data.weekScores || {});
    } catch (err) {
      console.error("Failed to load progress:", err);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /* ---------------- SAVE TO STORAGE ---------------- */
  useEffect(() => {
    const data = {
      version: STORAGE_VERSION,
      completedWeeks: Array.from(completedWeeks),
      totalWeeks,
      weekScores,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [completedWeeks, totalWeeks, weekScores]);

  /* ---------------- SAFE COMPUTED VALUES ---------------- */
  const completedCount = completedWeeks.size;

  const courseCompleted =
    Number.isInteger(totalWeeks) &&
    totalWeeks > 0 &&
    completedCount > 0 &&
    completedCount === totalWeeks;

  const completionPercentage =
    totalWeeks > 0
      ? Math.round((completedCount / totalWeeks) * 100)
      : 0;

  /* ---------------- ACTIONS ---------------- */
  const markWeekComplete = useCallback((weekId, score) => {
    setCompletedWeeks((prev) => {
      const next = new Set(prev);
      next.add(weekId);
      return next;
    });

    if (score !== undefined) {
      setWeekScores((prev) => ({ ...prev, [weekId]: score }));
    }
  }, []);

  const setTotalWeeksCount = useCallback((count) => {
    if (Number.isInteger(count) && count > 0) {
      setTotalWeeks((prev) => (prev !== count ? count : prev));
    }
  }, []);

  const loadCompletedWeeks = useCallback((weeks, scores = {}) => {
    setCompletedWeeks(new Set(weeks));
    setWeekScores(scores);
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedWeeks(new Set());
    setTotalWeeks(0);
    setWeekScores({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /* ---------------- CONTEXT VALUE ---------------- */
  const value = useMemo(
    () => ({
      completedWeeks,
      totalWeeks,
      weekScores,
      courseCompleted,
      completionPercentage,
      markWeekComplete,
      setTotalWeeksCount,
      loadCompletedWeeks,
      resetProgress,
    }),
    [
      completedWeeks,
      totalWeeks,
      weekScores,
      courseCompleted,
      completionPercentage,
      markWeekComplete,
      setTotalWeeksCount,
      loadCompletedWeeks,
      resetProgress,
    ]
  );

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseProgress = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseProgress must be used within CourseProvider");
  }
  return context;
};

export default CourseContext;
