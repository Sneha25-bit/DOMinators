import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MerchandiseCardProps {
  imageSrc: string;
  title: string;
  description: string;
  pointsCost: number;
  onRedeem: () => void; // Triggered when user clicks redeem
}

export function MerchandiseCard({
  imageSrc,
  title,
  description,
  pointsCost,
  onRedeem,
}: MerchandiseCardProps) {
  return (
    <Card className="flex flex-col h-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-48 bg-gray-100">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & Description */}
      <CardHeader className="px-4 pt-4 pb-2 text-center space-y-1">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      {/* Points Info */}
      <CardContent className="px-4 pb-2 text-center">
        <div className="text-lg font-bold text-primary">
          {pointsCost} Ocean Points
        </div>
      </CardContent>

      {/* Redeem Button */}
      <CardFooter className="px-4 pb-4">
        <Button
          className="w-full hover:scale-105 transition-transform duration-200"
          onClick={onRedeem}
        >
          Redeem with Points
        </Button>
      </CardFooter>
    </Card>
  );
}
