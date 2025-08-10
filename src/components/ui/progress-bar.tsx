import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar = ({ value, max = 100, className, showLabel = true }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <span className="text-sm font-medium text-foreground">Progress</span>
        )}
        {showLabel && (
          <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
        )}
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
        <div 
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};