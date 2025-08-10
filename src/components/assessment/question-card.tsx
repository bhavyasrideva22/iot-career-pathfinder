import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/assessment";
import { likertOptions, scaleOptions } from "@/data/assessmentData";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value?: number | string;
  onAnswer: (value: number | string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({ 
  question, 
  value, 
  onAnswer, 
  questionNumber, 
  totalQuestions 
}: QuestionCardProps) => {
  const options = question.type === 'likert' ? likertOptions : 
                 question.type === 'scale' ? scaleOptions : 
                 question.options?.map((opt, idx) => ({ value: idx, label: opt })) || [];

  return (
    <Card className="p-8 bg-gradient-card border-border/50 shadow-cyber">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground capitalize">
            {question.category} • {question.subcategory}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {question.text}
          </h3>
        </div>

        <div className="space-y-3">
          {question.type === 'multiple-choice' ? (
            <div className="grid gap-3">
              {options.map((option) => (
                <Button
                  key={option.value}
                  variant={value === option.value ? "default" : "outline"}
                  className={cn(
                    "justify-start text-left h-auto p-4 transition-all duration-200",
                    value === option.value && "bg-primary shadow-glow"
                  )}
                  onClick={() => onAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {options.map((option) => (
                <Button
                  key={option.value}
                  variant={value === option.value ? "default" : "outline"}
                  className={cn(
                    "flex flex-col h-auto p-4 text-center transition-all duration-200",
                    value === option.value && "bg-primary shadow-glow"
                  )}
                  onClick={() => onAnswer(option.value)}
                >
                  <span className="text-lg font-bold">{option.value}</span>
                  <span className="text-xs mt-1">{option.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>

        {question.type === 'scale' && (
          <div className="text-sm text-muted-foreground text-center">
            Rate your current level from 1 (Beginner) to 5 (Expert)
          </div>
        )}
      </div>
    </Card>
  );
};