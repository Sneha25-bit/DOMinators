import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getLevelInfo } from "@/lib/level";

type ProgressCardProps = {
  dashboard: {
    points: number;
  };
};

const ProgressCard = ({ dashboard }: ProgressCardProps) => {
  const levelInfo = getLevelInfo(dashboard?.points || 0);

  return (
    <Card className="bg-white/20 backdrop-blur-md border-white/30">
      <CardHeader>
        <CardTitle className="text-white">Progress to Next Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-white">
            <span>Ocean Explorer Level {levelInfo.level}</span>
            <span>
              {levelInfo.currentXP} / {levelInfo.xpToNext} points
            </span>
          </div>
          <Progress value={levelInfo.progressPercent} className="w-full" />
          <p className="text-white/70 text-sm">
            Earn {levelInfo.xpRemaining} more points to reach the next level and unlock exclusive features!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
