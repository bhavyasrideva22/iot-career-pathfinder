import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Cpu, 
  Network, 
  Zap, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Psychological Assessment",
      description: "Evaluate personality traits and work preferences for IoT security roles"
    },
    {
      icon: Cpu,
      title: "Technical Evaluation", 
      description: "Test fundamental knowledge in networking, programming, and security"
    },
    {
      icon: Network,
      title: "WISCAR Framework",
      description: "Comprehensive readiness analysis across six key dimensions"
    },
    {
      icon: Zap,
      title: "Personalized Results",
      description: "Get tailored career guidance and learning recommendations"
    }
  ];

  const benefits = [
    "Discover if IoT Security Engineering matches your strengths",
    "Identify specific areas for skill development", 
    "Receive personalized learning roadmap",
    "Understand career paths and opportunities",
    "Get confidence in your career decisions"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                Professional Career Assessment
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                IoT Security Engineer
                <br />
                Readiness Assessment
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover your potential in IoT Security Engineering through comprehensive 
                psychological, technical, and readiness evaluation using the validated WISCAR framework.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/assessment')}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">25-30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comprehensive Assessment Components
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our assessment evaluates multiple dimensions to provide accurate career guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-border/50 hover:shadow-cyber transition-all duration-300">
              <div className="space-y-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              What You'll Gain
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-gradient-card border-border/50 shadow-cyber">
            <div className="space-y-6">
              <div className="text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  WISCAR Framework
                </h3>
                <p className="text-sm text-muted-foreground">
                  Validated assessment framework measuring six key readiness dimensions
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Will</div>
                  <div className="text-xs text-muted-foreground">Motivation</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Interest</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Skill</div>
                  <div className="text-xs text-muted-foreground">Current Ability</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Cognitive</div>
                  <div className="text-xs text-muted-foreground">Mental Capacity</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Ability</div>
                  <div className="text-xs text-muted-foreground">Learning Rate</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-primary">Real-world</div>
                  <div className="text-xs text-muted-foreground">Practical Fit</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Card className="p-12 bg-gradient-card border-primary/20 shadow-glow text-center">
          <div className="space-y-6">
            <Users className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Discover Your Potential?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take the first step towards a rewarding career in IoT Security Engineering. 
                Our comprehensive assessment provides the insights you need to make informed decisions.
              </p>
              <Button 
                onClick={() => navigate('/assessment')}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow text-lg px-12 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Begin Your Assessment Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
