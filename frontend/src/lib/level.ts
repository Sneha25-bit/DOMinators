export type LevelInfo = {
  level: number;
  currentXP: number;
  xpToNext: number;
  progressPercent: number;
  xpRemaining: number;
  totalXPRequired: number;
};

export function getLevelInfo(points: number): LevelInfo {
  const baseXP = 100;
  let level = 0;
  let totalXPRequired = baseXP;

  while (points >= totalXPRequired) {
    level++;
    totalXPRequired += baseXP;
  }

  const previousLevelThreshold = totalXPRequired - baseXP;
  const currentXP = points - previousLevelThreshold;
  const xpToNext = baseXP;
  const progressPercent = Math.floor((currentXP / xpToNext) * 100);
  const xpRemaining = xpToNext - currentXP;

  return {
    level,
    currentXP: points,
    xpToNext: totalXPRequired,
    progressPercent,
    xpRemaining,
    totalXPRequired,
  };
}
