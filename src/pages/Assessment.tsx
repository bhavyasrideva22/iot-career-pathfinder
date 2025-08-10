import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AssessmentIntro } from "@/components/assessment/assessment-intro";
import { QuestionCard } from "@/components/assessment/question-card";
import { ResultsDashboard } from "@/components/assessment/results-dashboard";
import { assessmentSections } from "@/data/assessmentData";
import { Response, AssessmentResult, WISCARDimension } from "@/types/assessment";
import { calculateAssessmentResult } from "@/utils/assessmentCalculator";
import { ArrowLeft, ArrowRight } from "lucide-react";

type AssessmentStage = 'intro' | 'questions' | 'results';

const Assessment = () => {
  const [stage, setStage] = useState<AssessmentStage>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [wiscarScores, setWiscarScores] = useState<WISCARDimension | null>(null);

  // Get all questions from all sections
  const allQuestions = assessmentSections
    .filter(section => section.questions.length > 0)
    .flatMap(section => section.questions);
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleStart = useCallback(() => {
    setStage('questions');
    setCurrentSectionIndex(1); // Skip intro section
    setCurrentQuestionIndex(0);
    setResponses([]);
  }, []);

  const handleAnswer = useCallback((value: number | string) => {
    const newResponse: Response = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date()
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results
      const { result, wiscarScores: scores } = calculateAssessmentResult(responses);
      setAssessmentResult(result);
      setWiscarScores(scores);
      setStage('results');
    }
  }, [currentQuestionIndex, totalQuestions, responses]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setStage('intro');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setAssessmentResult(null);
    setWiscarScores(null);
  }, []);

  const getCurrentResponse = useCallback(() => {
    return responses.find(r => r.questionId === currentQuestion?.id)?.value;
  }, [responses, currentQuestion]);

  if (stage === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (stage === 'results' && assessmentResult && wiscarScores) {
    return (
      <ResultsDashboard 
        result={assessmentResult}
        wiscarScores={wiscarScores}
        onRestart={handleRestart}
      />
    );
  }

  if (stage === 'questions' && currentQuestion) {
    const currentResponse = getCurrentResponse();
    const canProceed = currentResponse !== undefined;

    return (
      <div className="min-h-screen bg-gradient-hero p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header with Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">
                IoT Security Assessment
              </h1>
              <div className="text-sm text-muted-foreground">
                {currentQuestionIndex + 1} of {totalQuestions}
              </div>
            </div>
            <ProgressBar value={progressPercent} />
          </div>

          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            value={currentResponse}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          {/* Navigation */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {canProceed ? 'Ready to continue' : 'Please select an answer'}
                </p>
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center space-x-2 bg-gradient-primary hover:shadow-glow"
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'Complete' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default Assessment;