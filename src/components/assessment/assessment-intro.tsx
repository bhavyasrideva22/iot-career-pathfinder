import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Cpu, Network, Zap } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            IoT Security Engineer Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive Readiness & Career Fit Assessment for IoT Security Engineering
          </p>
        </div>

        <Card className="p-8 bg-gradient-card border-border/50 shadow-cyber">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What You'll Discover</h2>
              <p className="text-muted-foreground leading-relaxed">
                This comprehensive assessment evaluates your psychological fit, technical aptitude, 
                and readiness for a career in IoT Security Engineering. Get personalized insights 
                and recommendations based on validated psychometric and technical evaluations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-cyber-green" />
                  <span className="font-medium">Psychological Compatibility</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Cpu className="h-6 w-6 text-cyber-blue" />
                  <span className="font-medium">Technical Aptitude</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Network className="h-6 w-6 text-cyber-purple" />
                  <span className="font-medium">WISCAR Readiness Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-cyber-orange" />
                  <span className="font-medium">Personalized Career Guidance</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-foreground">Assessment Overview</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Duration:</strong> 25-30 minutes</li>
                <li>• <strong>Sections:</strong> Personality, Technical Skills, Readiness Analysis</li>
                <li>• <strong>Output:</strong> Detailed career fit analysis and learning roadmap</li>
                <li>• <strong>Privacy:</strong> Your responses are confidential and secure</li>
              </ul>
            </div>

            <div className="bg-accent/20 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold mb-2 text-primary">Why IoT Security Engineering?</h3>
              <p className="text-sm text-muted-foreground">
                IoT Security Engineers protect billions of connected devices worldwide. 
                This rapidly growing field combines cybersecurity expertise with IoT technologies, 
                offering exciting career opportunities in healthcare, automotive, smart cities, and more.
              </p>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={onStart}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};