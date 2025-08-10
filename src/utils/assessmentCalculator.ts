import { Response, AssessmentResult, Score, WISCARDimension } from '@/types/assessment';

export const calculateAssessmentResult = (responses: Response[]): { result: AssessmentResult; wiscarScores: WISCARDimension } => {
  // Calculate category scores
  const psychometricScores = calculatePsychometricScores(responses);
  const technicalScores = calculateTechnicalScores(responses);
  const wiscarScores = calculateWISCARScores(responses);

  // Calculate overall fit
  const overallFit = Math.round(
    (psychometricScores.average + technicalScores.average + wiscarScores.average) / 3
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallFit >= 75) recommendation = 'yes';
  else if (overallFit >= 55) recommendation = 'maybe';
  else recommendation = 'no';

  // Generate insights
  const insights = generateInsights(psychometricScores, technicalScores, wiscarScores, overallFit);
  
  // Generate next steps
  const nextSteps = generateNextSteps(recommendation, psychometricScores, technicalScores, wiscarScores);
  
  // Generate career paths and resources
  const careerPaths = getCareerPaths(recommendation);
  const learningResources = getLearningResources(recommendation, technicalScores.average);

  const scores: Score[] = [
    {
      category: 'psychometric',
      subcategory: 'overall',
      value: psychometricScores.average,
      maxValue: 100,
      interpretation: interpretPsychometricScore(psychometricScores.average)
    },
    {
      category: 'technical',
      subcategory: 'overall', 
      value: technicalScores.average,
      maxValue: 100,
      interpretation: interpretTechnicalScore(technicalScores.average)
    },
    {
      category: 'wiscar',
      subcategory: 'overall',
      value: wiscarScores.average,
      maxValue: 100,
      interpretation: interpretWISCARScore(wiscarScores.average)
    }
  ];

  return {
    result: {
      scores,
      overallFit,
      recommendation,
      insights,
      nextSteps,
      careerPaths,
      learningResources
    },
    wiscarScores: {
      will: wiscarScores.will,
      interest: wiscarScores.interest,
      skill: wiscarScores.skill,
      cognitive: wiscarScores.cognitive,
      ability: wiscarScores.ability,
      realWorld: wiscarScores.realWorld
    }
  };
};

const calculatePsychometricScores = (responses: Response[]) => {
  const psychResponses = responses.filter(r => 
    r.questionId.startsWith('psych_')
  );
  
  const scores = psychResponses.map(r => Number(r.value) * 20); // Convert 1-5 scale to 0-100
  const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  
  return { scores, average };
};

const calculateTechnicalScores = (responses: Response[]) => {
  const techResponses = responses.filter(r => 
    r.questionId.startsWith('tech_')
  );
  
  // Correct answers for technical questions
  const correctAnswers = {
    'tech_1': 0, // 1111
    'tech_2': 1, // MQTT
    'tech_3': 1, // Device identity verification
    'tech_4': 0, // Default passwords
    'tech_5': 1, // Control traffic
    'tech_6': 1  // Data confidentiality
  };
  
  const scores = techResponses.map(r => {
    const correct = correctAnswers[r.questionId as keyof typeof correctAnswers];
    return Number(r.value) === correct ? 100 : 0;
  });
  
  const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  
  return { scores, average };
};

const calculateWISCARScores = (responses: Response[]) => {
  const wiscarResponses = responses.filter(r => 
    r.questionId.startsWith('will_') || 
    r.questionId.startsWith('interest_') ||
    r.questionId.startsWith('skill_') ||
    r.questionId.startsWith('cognitive_') ||
    r.questionId.startsWith('ability_') ||
    r.questionId.startsWith('real_world_')
  );

  const dimensions = {
    will: calculateDimensionScore(wiscarResponses, 'will_'),
    interest: calculateDimensionScore(wiscarResponses, 'interest_'),
    skill: calculateDimensionScore(wiscarResponses, 'skill_'),
    cognitive: calculateDimensionScore(wiscarResponses, 'cognitive_'),
    ability: calculateDimensionScore(wiscarResponses, 'ability_'),
    realWorld: calculateDimensionScore(wiscarResponses, 'real_world_')
  };

  const average = Math.round(
    (dimensions.will + dimensions.interest + dimensions.skill + 
     dimensions.cognitive + dimensions.ability + dimensions.realWorld) / 6
  );

  return { ...dimensions, average };
};

const calculateDimensionScore = (responses: Response[], prefix: string) => {
  const dimensionResponses = responses.filter(r => r.questionId.startsWith(prefix));
  if (dimensionResponses.length === 0) return 0;
  
  const total = dimensionResponses.reduce((sum, r) => sum + Number(r.value), 0);
  return Math.round((total / dimensionResponses.length) * 20); // Convert to 0-100 scale
};

const interpretPsychometricScore = (score: number): string => {
  if (score >= 80) return "Excellent psychological fit for IoT security work";
  if (score >= 60) return "Good personality match with room for growth";
  if (score >= 40) return "Moderate fit, consider personality development";
  return "Limited psychological alignment with IoT security demands";
};

const interpretTechnicalScore = (score: number): string => {
  if (score >= 80) return "Strong technical foundation for IoT security";
  if (score >= 60) return "Good technical aptitude with some knowledge gaps";
  if (score >= 40) return "Basic technical understanding, significant learning needed";
  return "Limited technical knowledge, extensive preparation required";
};

const interpretWISCARScore = (score: number): string => {
  if (score >= 80) return "Highly ready across all WISCAR dimensions";
  if (score >= 60) return "Good readiness with some areas for improvement";
  if (score >= 40) return "Moderate readiness, focused development needed";
  return "Low readiness, consider foundational skill building";
};

const generateInsights = (psych: any, tech: any, wiscar: any, overall: number): string[] => {
  const insights = [];
  
  if (psych.average >= 75) {
    insights.push("Your personality traits align well with IoT security engineering demands");
  } else if (psych.average < 50) {
    insights.push("Consider developing analytical thinking and attention to detail skills");
  }
  
  if (tech.average >= 75) {
    insights.push("Strong technical foundation provides excellent starting point");
  } else if (tech.average < 50) {
    insights.push("Focus on building fundamental networking and security knowledge");
  }
  
  if (wiscar.average >= 75) {
    insights.push("High readiness across multiple dimensions indicates strong potential");
  } else {
    insights.push("Targeted skill development could significantly improve your readiness");
  }
  
  return insights;
};

const generateNextSteps = (recommendation: string, psych: any, tech: any, wiscar: any): string[] => {
  const steps = [];
  
  if (recommendation === 'yes') {
    steps.push("Start with introductory IoT security courses and certifications");
    steps.push("Join IoT security communities and forums");
    steps.push("Practice with hands-on labs and security tools");
    steps.push("Consider entry-level positions or internships");
  } else if (recommendation === 'maybe') {
    if (tech.average < 60) {
      steps.push("Strengthen technical fundamentals in networking and programming");
    }
    if (psych.average < 60) {
      steps.push("Develop analytical and problem-solving skills");
    }
    steps.push("Take foundational cybersecurity courses");
    steps.push("Reassess after 6 months of focused learning");
  } else {
    steps.push("Explore related fields like general cybersecurity or network administration");
    steps.push("Consider alternative technology career paths");
    steps.push("Build foundational skills before reconsidering IoT security");
  }
  
  return steps;
};

const getCareerPaths = (recommendation: string): string[] => {
  if (recommendation === 'yes') {
    return [
      "IoT Security Engineer",
      "Embedded Security Developer", 
      "IoT Security Architect",
      "Security Consultant (IoT Focus)",
      "IoT Penetration Tester"
    ];
  } else if (recommendation === 'maybe') {
    return [
      "Junior IoT Security Analyst",
      "Network Security Specialist",
      "Cybersecurity Analyst",
      "IoT Security Intern"
    ];
  } else {
    return [
      "General Cybersecurity Analyst",
      "Network Administrator",
      "IT Support Specialist",
      "Software Developer",
      "Systems Administrator"
    ];
  }
};

const getLearningResources = (recommendation: string, techScore: number): string[] => {
  const resources = [];
  
  if (techScore < 60) {
    resources.push("CompTIA Network+ certification for networking fundamentals");
    resources.push("Python programming courses for security automation");
  }
  
  if (recommendation === 'yes' || recommendation === 'maybe') {
    resources.push("CISSP or Security+ certification paths");
    resources.push("IoT security specialized courses (Coursera, edX)");
    resources.push("Hands-on labs: TryHackMe, HackTheBox IoT modules");
    resources.push("Industry publications: IoT Security Newsletter, SANS IoT");
  }
  
  resources.push("Join professional networks: (ISC)², ISACA");
  
  return resources;
};