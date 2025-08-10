import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult, WISCARDimension } from "@/types/assessment";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  Target,
  Brain,
  Lightbulb,
  Zap,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsDashboardProps {
  result: AssessmentResult;
  wiscarScores: WISCARDimension;
  onRestart: () => void;
}

export const ResultsDashboard = ({ result, wiscarScores, onRestart }: ResultsDashboardProps) => {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return <CheckCircle className="h-6 w-6 text-success" />;
      case 'maybe': return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'no': return <TrendingDown className="h-6 w-6 text-destructive" />;
      default: return <AlertTriangle className="h-6 w-6" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'text-success';
      case 'maybe': return 'text-warning';
      case 'no': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationBg = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'bg-success/10 border-success/20';
      case 'maybe': return 'bg-warning/10 border-warning/20';
      case 'no': return 'bg-destructive/10 border-destructive/20';
      default: return 'bg-muted/10';
    }
  };

  const wiscarDimensions = [
    { key: 'will', label: 'Will', value: wiscarScores.will, icon: Target },
    { key: 'interest', label: 'Interest', value: wiscarScores.interest, icon: Zap },
    { key: 'skill', label: 'Skill', value: wiscarScores.skill, icon: BookOpen },
    { key: 'cognitive', label: 'Cognitive', value: wiscarScores.cognitive, icon: Brain },
    { key: 'ability', label: 'Ability to Learn', value: wiscarScores.ability, icon: Lightbulb },
    { key: 'realWorld', label: 'Real-World Fit', value: wiscarScores.realWorld, icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your IoT Security Engineering readiness
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={cn("p-8 border-2", getRecommendationBg(result.recommendation))}>
          <div className="flex items-center space-x-4 mb-6">
            {getRecommendationIcon(result.recommendation)}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Overall Recommendation</h2>
              <p className={cn("text-lg font-semibold capitalize", getRecommendationColor(result.recommendation))}>
                {result.recommendation === 'yes' && 'Highly Recommended - You\'re Ready!'}
                {result.recommendation === 'maybe' && 'Conditional - Improvement Needed'}
                {result.recommendation === 'no' && 'Consider Alternative Paths'}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Overall Fit Score</span>
                <span className="font-bold">{result.overallFit}%</span>
              </div>
              <Progress value={result.overallFit} className="h-3" />
            </div>
          </div>
        </Card>

        {/* WISCAR Analysis */}
        <Card className="p-8 bg-gradient-card border-border/50 shadow-cyber">
          <h2 className="text-2xl font-bold mb-6 text-foreground">WISCAR Readiness Analysis</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wiscarDimensions.map(({ key, label, value, icon: Icon }) => (
              <div key={key} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{label}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-medium">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Category Scores</h3>
            <div className="space-y-4">
              {result.scores.map((score, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize text-foreground">
                      {score.category} {score.subcategory && `- ${score.subcategory}`}
                    </span>
                    <span className="font-medium">{score.value}/{score.maxValue}</span>
                  </div>
                  <Progress value={(score.value / score.maxValue) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">{score.interpretation}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Key Insights</h3>
            <div className="space-y-3">
              {result.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Next Steps and Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Recommended Next Steps</h3>
            <div className="space-y-3">
              {result.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Career Paths</h3>
            <div className="space-y-2">
              {result.careerPaths.map((path, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {path}
                </Badge>
              ))}
            </div>
            
            <h4 className="font-semibold mt-6 mb-3 text-foreground">Learning Resources</h4>
            <div className="space-y-2">
              {result.learningResources.map((resource, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{resource}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Retake Assessment
          </Button>
          <Button 
            size="lg"
            className="px-8 bg-gradient-primary hover:shadow-glow"
            onClick={() => window.print()}
          >
            Download Results
          </Button>
        </div>
      </div>
    </div>
  );
};