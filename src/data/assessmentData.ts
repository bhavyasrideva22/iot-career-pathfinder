import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'introduction',
    title: 'Introduction & Overview',
    description: 'Learn about IoT Security Engineering and what this assessment covers',
    questions: [],
    timeEstimate: 3
  },
  {
    id: 'psychometric',
    title: 'Personality & Interest Assessment',
    description: 'Evaluate your psychological fit for IoT Security Engineering',
    timeEstimate: 8,
    questions: [
      {
        id: 'psych_1',
        text: 'I enjoy working with security protocols for connected devices and embedded systems.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest',
        construct: 'domain_interest'
      },
      {
        id: 'psych_2',
        text: 'I prefer structured problem-solving over open-ended creative tasks.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'personality',
        construct: 'conscientiousness'
      },
      {
        id: 'psych_3',
        text: 'I am curious about how hackers might exploit IoT devices and networks.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest',
        construct: 'security_mindset'
      },
      {
        id: 'psych_4',
        text: 'I enjoy analyzing complex technical systems to find potential vulnerabilities.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'personality',
        construct: 'analytical_thinking'
      },
      {
        id: 'psych_5',
        text: 'I am motivated more by solving challenging problems than by external rewards.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'motivation',
        construct: 'intrinsic_motivation'
      },
      {
        id: 'psych_6',
        text: 'I pay close attention to details, especially when it comes to security configurations.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'personality',
        construct: 'attention_to_detail'
      },
      {
        id: 'psych_7',
        text: 'I am comfortable working in environments where threats and technologies constantly evolve.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'adaptability',
        construct: 'change_tolerance'
      },
      {
        id: 'psych_8',
        text: 'I find satisfaction in protecting systems and data from cyber threats.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'motivation',
        construct: 'protective_motivation'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Aptitude & Knowledge',
    description: 'Test your technical skills and foundational knowledge',
    timeEstimate: 12,
    questions: [
      {
        id: 'tech_1',
        text: 'What is the binary representation of the decimal number 15?',
        type: 'multiple-choice',
        options: ['1111', '1011', '1101', '1001'],
        category: 'technical',
        subcategory: 'fundamentals'
      },
      {
        id: 'tech_2',
        text: 'Which protocol is commonly used for lightweight messaging in IoT devices?',
        type: 'multiple-choice',
        options: ['HTTP', 'MQTT', 'FTP', 'SMTP'],
        category: 'technical',
        subcategory: 'iot_protocols'
      },
      {
        id: 'tech_3',
        text: 'In IoT security, what does "device authentication" primarily ensure?',
        type: 'multiple-choice',
        options: [
          'The device can connect to any network',
          'The device identity is verified before network access',
          'The device has the latest firmware',
          'The device uses encryption'
        ],
        category: 'technical',
        subcategory: 'security_concepts'
      },
      {
        id: 'tech_4',
        text: 'Which of the following is a common vulnerability in IoT devices?',
        type: 'multiple-choice',
        options: [
          'Default passwords',
          'Encrypted communications',
          'Regular updates',
          'Strong authentication'
        ],
        category: 'technical',
        subcategory: 'vulnerabilities'
      },
      {
        id: 'tech_5',
        text: 'What is the primary purpose of a firewall in IoT network security?',
        type: 'multiple-choice',
        options: [
          'To increase network speed',
          'To control traffic between networks',
          'To store device data',
          'To update device firmware'
        ],
        category: 'technical',
        subcategory: 'network_security'
      },
      {
        id: 'tech_6',
        text: 'If you found an IoT device sending unencrypted data, what would be your first concern?',
        type: 'multiple-choice',
        options: [
          'Device performance',
          'Data confidentiality and integrity',
          'Network bandwidth',
          'Power consumption'
        ],
        category: 'technical',
        subcategory: 'threat_assessment'
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Readiness Analysis',
    description: 'Comprehensive evaluation of your readiness across six key dimensions',
    timeEstimate: 10,
    questions: [
      {
        id: 'will_1',
        text: 'I am committed to pursuing a career in IoT security regardless of initial challenges.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'will',
        construct: 'persistence'
      },
      {
        id: 'will_2',
        text: 'I would continue learning IoT security even if progress feels slow initially.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'will',
        construct: 'determination'
      },
      {
        id: 'interest_1',
        text: 'I actively seek out news and articles about IoT security threats and solutions.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'interest',
        construct: 'curiosity'
      },
      {
        id: 'interest_2',
        text: 'I find IoT security topics more engaging than other technology areas.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'interest',
        construct: 'passion'
      },
      {
        id: 'skill_1',
        text: 'Rate your current understanding of network security principles (1-5)',
        type: 'scale',
        category: 'wiscar',
        subcategory: 'skill',
        construct: 'current_knowledge'
      },
      {
        id: 'skill_2',
        text: 'Rate your programming skills in languages like Python or C (1-5)',
        type: 'scale',
        category: 'wiscar',
        subcategory: 'skill',
        construct: 'programming'
      },
      {
        id: 'cognitive_1',
        text: 'I can quickly identify patterns and relationships in complex security data.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'cognitive',
        construct: 'pattern_recognition'
      },
      {
        id: 'cognitive_2',
        text: 'I enjoy solving logical puzzles and analytical problems.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'cognitive',
        construct: 'analytical_ability'
      },
      {
        id: 'ability_1',
        text: 'I adapt quickly when learning new security tools and technologies.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'ability',
        construct: 'learning_agility'
      },
      {
        id: 'ability_2',
        text: 'I actively seek feedback to improve my technical skills.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'ability',
        construct: 'growth_mindset'
      },
      {
        id: 'real_world_1',
        text: 'My career goals align with working in cybersecurity and IoT protection.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'realWorld',
        construct: 'career_alignment'
      },
      {
        id: 'real_world_2',
        text: 'I understand the day-to-day responsibilities of an IoT Security Engineer.',
        type: 'likert',
        category: 'wiscar',
        subcategory: 'realWorld',
        construct: 'role_understanding'
      }
    ]
  }
];

export const likertOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

export const scaleOptions = [
  { value: 1, label: 'Beginner' },
  { value: 2, label: 'Novice' },
  { value: 3, label: 'Intermediate' },
  { value: 4, label: 'Advanced' },
  { value: 5, label: 'Expert' }
];