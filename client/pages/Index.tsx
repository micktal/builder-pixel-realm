import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CheckCircle, ArrowUp, User, Zap, Users, Target, Shield, Award } from "lucide-react";

// Progress tracking
interface ModuleProgress {
  currentSection: number;
  completedSections: Set<number>;
  assessmentData: any;
  personalPlan: any;
}

const SECTIONS = [
  { id: 0, title: "Accueil", icon: User },
  { id: 1, title: "Auto-bilan 360°", icon: Target },
  { id: 2, title: "Résilience face à l'imprévu", icon: Zap },
  { id: 3, title: "Techniques de respiration", icon: Users },
  { id: 4, title: "Soutiens & ressources", icon: Shield },
  { id: 5, title: "Mon système de suivi", icon: Target },
  { id: 6, title: "Quiz final", icon: Award },
];

export default function Index() {
  const [progress, setProgress] = useState<ModuleProgress>({
    currentSection: 0,
    completedSections: new Set(),
    assessmentData: null,
    personalPlan: null,
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId: number) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setProgress(prev => ({ ...prev, currentSection: sectionId }));
    }
  };

  const completeSection = (sectionId: number) => {
    setProgress(prev => ({
      ...prev,
      completedSections: new Set([...prev.completedSections, sectionId])
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-learning-primary z-50 transform-origin-0"
        style={{ scaleX }}
      />

      {/* Navigation Sidebar */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {SECTIONS.map((section) => {
            const isCompleted = progress.completedSections.has(section.id);
            const isCurrent = progress.currentSection === section.id;
            const Icon = section.icon;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => navigateToSection(section.id)}
                className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-learning-primary text-white' 
                    : isCurrent 
                    ? 'bg-learning-accent text-learning-primary ring-2 ring-learning-primary' 
                    : 'bg-white text-gray-400 hover:bg-learning-accent hover:text-learning-primary'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
                
                {/* Tooltip */}
                <div className="absolute left-16 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {section.title}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-learning-primary text-white p-3 rounded-full shadow-lg z-40 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Welcome Section */}
      <section id="section-0" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-learning-primary mb-6 leading-tight">
              Autonomie &<br />
              <span className="bg-gradient-to-r from-learning-primary to-learning-accent bg-clip-text text-transparent">
                Résilience Durable
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-learning-neutral mb-8 font-medium">
              Module 4 - Votre parcours vers l'autonomie
            </h2>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Découvrez vos forces, renforcez votre résilience et construisez votre système personnel 
              de soutien dans ce module interactif de 30 minutes.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 learning-gradient rounded-full opacity-20"></div>
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-48 h-48 text-learning-primary"
                  fill="currentColor"
                >
                  {/* Simple illustration of person climbing steps */}
                  <path d="M50 150 L75 125 L100 100 L125 75 L150 50" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <circle cx="80" cy="140" r="8" />
                  <path d="M72 148 L88 148 L88 180 L82 180 L82 165 L78 165 L78 180 L72 180 Z" />
                  <path d="M80 132 L75 140 L85 140 Z" />
                  <rect x="45" y="145" width="20" height="8" />
                  <rect x="70" y="120" width="20" height="8" />
                  <rect x="95" y="95" width="20" height="8" />
                  <rect x="120" y="70" width="20" height="8" />
                  <rect x="145" y="45" width="20" height="8" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            onClick={() => navigateToSection(1)}
            className="learning-button text-xl px-12 py-4 inline-flex items-center space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Commencer mon parcours</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </motion.button>

          {/* Module Duration */}
          <motion.p
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            ⏱️ Durée estimée : 30 minutes
          </motion.p>
        </div>
      </section>

      {/* Section 1: Auto-bilan 360° */}
      <SelfAssessmentSection 
        progress={progress} 
        onComplete={() => completeSection(1)}
        onNavigate={navigateToSection}
      />

      {/* Section 2: Résilience face à l'imprévu */}
      <ResilienceSection 
        progress={progress} 
        onComplete={() => completeSection(2)}
        onNavigate={navigateToSection}
      />

      {/* Placeholder for other sections */}
      <BreathingSection
        progress={progress}
        onComplete={() => completeSection(3)}
        onNavigate={navigateToSection}
      />
      
      <PlaceholderSection 
        sectionId={4} 
        title="Soutiens & ressources" 
        description="Identifiez votre réseau de soutien et vos ressources"
        icon={Shield}
      />
      
      <PlaceholderSection 
        sectionId={5} 
        title="Mon système de suivi" 
        description="Créez votre plan personnalisé de développement"
        icon={Target}
      />
      
      <PlaceholderSection 
        sectionId={6} 
        title="Quiz final & engagement" 
        description="Validez vos acquis et prenez votre engagement"
        icon={Award}
      />
    </div>
  );
}

// Self Assessment Section Component
function SelfAssessmentSection({ progress, onComplete, onNavigate }: any) {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  const questions = [
    { id: 'emotion', label: 'Gestion émotionnelle', description: 'Je gère mes émotions avec sérénité' },
    { id: 'energy', label: 'Niveau d\'énergie', description: 'Je maintiens mon énergie au quotidien' },
    { id: 'relations', label: 'Relations interpersonnelles', description: 'J\'entretiens des relations harmonieuses' },
    { id: 'stress', label: 'Gestion du stress', description: 'Je fais face au stress efficacement' },
    { id: 'adaptation', label: 'Capacité d\'adaptation', description: 'Je m\'adapte facilement aux changements' },
    { id: 'motivation', label: 'Motivation personnelle', description: 'Je reste motivé(e) face aux défis' },
    { id: 'equilibre', label: 'Équilibre vie/travail', description: 'Je maintiens un bon équilibre de vie' },
    { id: 'apprentissage', label: 'Apprentissage continu', description: 'J\'apprends continuellement de mes expériences' },
  ];

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const generateResults = () => {
    if (Object.keys(responses).length === questions.length) {
      setShowResults(true);
      // Scroll automatiquement vers le haut de la section pour voir les résultats
      setTimeout(() => {
        const section = document.getElementById('section-1');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const getAverageScore = () => {
    const scores = Object.values(responses);
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  };

  return (
    <section id="section-1" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Auto-bilan 360°
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Évaluez votre niveau actuel dans différentes dimensions de l'autonomie et de la résilience. 
            Soyez honn��te avec vous-même pour obtenir un bilan personnalisé.
          </p>
        </motion.div>

        {!showResults ? (
          <div className="space-y-8">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="learning-card p-6"
              >
                <h3 className="text-xl font-semibold text-learning-neutral mb-2">
                  {question.label}
                </h3>
                <p className="text-gray-600 mb-4">{question.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Pas du tout</span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleResponse(question.id, value)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          responses[question.id] === value
                            ? 'bg-learning-primary border-learning-primary text-white'
                            : 'border-gray-300 hover:border-learning-primary hover:bg-learning-accent'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">Totalement</span>
                </div>
              </motion.div>
            ))}

            {Object.keys(responses).length === questions.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={generateResults}
                  className="learning-button text-lg px-8 py-4"
                >
                  Voir mes résultats
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <ResultsDisplay 
            responses={responses} 
            questions={questions} 
            onComplete={onComplete}
            onContinue={() => onNavigate(2)}
          />
        )}
      </div>
    </section>
  );
}

// Results Display Component
function ResultsDisplay({ responses, questions, onComplete, onContinue }: any) {
  const getAverageScore = () => {
    const scores = Object.values(responses) as number[];
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const avgScore = getAverageScore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="learning-card p-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-learning-primary mb-4">
          Votre Bilan Personnel
        </h3>
        <div className="text-6xl font-bold mb-2">
          <span className={getScoreColor(avgScore)}>
            {avgScore.toFixed(1)}/5
          </span>
        </div>
        <p className="text-gray-600">Score moyen de résilience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {questions.map((question: any) => {
          const score = responses[question.id];
          return (
            <div key={question.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{question.label}</span>
              <span className={`font-bold text-lg ${getScoreColor(score)}`}>
                {score}/5
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-learning-accent bg-opacity-20 p-6 rounded-xl mb-8">
        <h4 className="font-semibold text-learning-primary mb-3">💡 Conseil personnalisé</h4>
        <p className="text-gray-700">
          {avgScore >= 4 
            ? "Excellent ! Vous montrez une grande résilience. Continuez à cultiver ces forces et partagez votre expérience avec d'autres."
            : avgScore >= 3
            ? "Bonne base ! Identifiez 1-2 domaines à renforcer en priorité. Votre parcours de développement sera très bénéfique."
            : "Potentiel d'amélioration important ! Ce module vous donnera des outils concrets pour développer votre résilience. Restez motivé(e) !"
          }
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="learning-button-secondary">
          📄 Exporter mon bilan PDF
        </button>
        <button 
          onClick={() => {
            onComplete();
            onContinue();
          }}
          className="learning-button"
        >
          Continuer vers la résilience →
        </button>
      </div>
    </motion.div>
  );
}

// Resilience Section Component
function ResilienceSection({ progress, onComplete, onNavigate }: any) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [choices, setChoices] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [ritual, setRitual] = useState('');

  const scenarios = [
    {
      id: 0,
      situation: "Votre réunion importante déborde de 30 minutes, mais vous avez un autre engagement familial prévu juste après...",
      choices: [
        { id: 'A', text: "J'interromps poliment la réunion pour respecter mon engagement", feedback: "Excellent ! Vous savez poser vos limites et honorer vos engagements personnels." },
        { id: 'B', text: "Je reste en réunion et j'annule mon engagement familial", feedback: "Attention à l'équilibre ! Vos proches méritent aussi votre respect des engagements." },
        { id: 'C', text: "Je négocie 10 minutes de plus et trouve un compromis", feedback: "Parfait ! Vous trouvez des solutions créatives qui respectent toutes les parties." },
      ]
    },
  ];

  const handleChoice = (scenarioId: number, choiceId: string) => {
    setChoices(prev => ({ ...prev, [scenarioId]: choiceId }));
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (scenarioId < scenarios.length - 1) {
        setCurrentScenario(scenarioId + 1);
      }
    }, 3000);
  };

  const getCurrentFeedback = () => {
    const choice = choices[currentScenario];
    const scenario = scenarios[currentScenario];
    return scenario?.choices.find(c => c.id === choice)?.feedback;
  };

  return (
    <section id="section-2" className="min-h-screen py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-12 h-12 text-learning-primary mr-4" />
            <h2 className="text-4xl font-bold text-learning-primary">
              Résilience face à l'imprévu
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testez vos réflexes face aux situations inattendues et développez votre capacité d'adaptation.
          </p>
        </motion.div>

        <div className="learning-card p-8 mb-8">
          {!showFeedback ? (
            <motion.div
              key={currentScenario}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-learning-neutral mb-6">
                Situation {currentScenario + 1}
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {scenarios[currentScenario].situation}
              </p>
              
              <div className="space-y-4">
                {scenarios[currentScenario].choices.map((choice) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleChoice(currentScenario, choice.id)}
                    className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-learning-primary hover:bg-learning-accent hover:bg-opacity-20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start">
                      <span className="bg-learning-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        {choice.id}
                      </span>
                      <span className="text-gray-700">{choice.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-learning-accent bg-opacity-20 p-8 rounded-xl">
                <h4 className="text-2xl font-bold text-learning-primary mb-4">
                  💭 Feedback du coach
                </h4>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {getCurrentFeedback()}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {Object.keys(choices).length === scenarios.length && !showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-card p-8"
          >
            <h3 className="text-2xl font-bold text-learning-primary mb-6 text-center">
              ✨ Créez votre rituel minute
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Décrivez en quelques mots votre stratégie personnelle pour reprendre le contrôle en 60 secondes :
            </p>
            
            <textarea
              value={ritual}
              onChange={(e) => setRitual(e.target.value)}
              placeholder="Ex: Respirer profondément 3 fois, me poser la question 'Qu'est-ce qui est vraiment important maintenant ?', puis agir..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-learning-primary focus:outline-none resize-none"
            />
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => {
                  onComplete();
                  onNavigate(3);
                }}
                className="learning-button"
                disabled={!ritual.trim()}
              >
                Sauvegarder et continuer →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Breathing Techniques Section Component
function BreathingSection({ progress, onComplete, onNavigate }: any) {
  const [currentTechnique, setCurrentTechnique] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('');
  const [completedTechniques, setCompletedTechniques] = useState<Set<number>>(new Set());
  const [selectedFavorite, setSelectedFavorite] = useState<number | null>(null);

  const techniques = [
    {
      id: 0,
      name: "Respiration 4-7-8",
      description: "Technique relaxante pour réduire l'anxiété et favoriser l'endormissement",
      instructions: [
        "Inspirez par le nez pendant 4 secondes",
        "Retenez votre souffle pendant 7 secondes",
        "Expirez par la bouche pendant 8 secondes"
      ],
      duration: 19, // 4+7+8
      benefits: "Réduit l'anxiété, facilite l'endormissement, calme le système nerveux"
    },
    {
      id: 1,
      name: "Cohérence cardiaque",
      description: "Respiration régulière pour équilibrer le système nerveux",
      instructions: [
        "Inspirez pendant 5 secondes",
        "Expirez pendant 5 secondes",
        "Répétez 6 fois par minute pendant 5 minutes"
      ],
      duration: 10, // 5+5
      benefits: "Améliore la concentration, réduit le stress, régule les émotions"
    },
    {
      id: 2,
      name: "Respiration du carré",
      description: "Technique de concentration et d'ancrage dans le présent",
      instructions: [
        "Inspirez pendant 4 secondes",
        "Retenez pendant 4 secondes",
        "Expirez pendant 4 secondes",
        "Retenez (poumons vides) pendant 4 secondes"
      ],
      duration: 16, // 4+4+4+4
      benefits: "Améliore la concentration, procure un sentiment de contrôle"
    }
  ];

  const startBreathingExercise = (techniqueId: number) => {
    setCurrentTechnique(techniqueId);
    setIsBreathing(true);

    const technique = techniques[techniqueId];
    let cycleCount = 0;
    const maxCycles = 3;

    const runCycle = () => {
      if (cycleCount >= maxCycles) {
        setIsBreathing(false);
        setBreathingPhase('');
        setCompletedTechniques(prev => new Set([...prev, techniqueId]));
        return;
      }

      // Phases de respiration selon la technique
      if (techniqueId === 0) { // 4-7-8
        setBreathingPhase('Inspirez (4s)');
        setTimeout(() => setBreathingPhase('Retenez (7s)'), 4000);
        setTimeout(() => setBreathingPhase('Expirez (8s)'), 11000);
        setTimeout(() => {
          cycleCount++;
          runCycle();
        }, 19000);
      } else if (techniqueId === 1) { // Cohérence cardiaque
        setBreathingPhase('Inspirez (5s)');
        setTimeout(() => setBreathingPhase('Expirez (5s)'), 5000);
        setTimeout(() => {
          cycleCount++;
          runCycle();
        }, 10000);
      } else if (techniqueId === 2) { // Respiration du carré
        setBreathingPhase('Inspirez (4s)');
        setTimeout(() => setBreathingPhase('Retenez (4s)'), 4000);
        setTimeout(() => setBreathingPhase('Expirez (4s)'), 8000);
        setTimeout(() => setBreathingPhase('Pause (4s)'), 12000);
        setTimeout(() => {
          cycleCount++;
          runCycle();
        }, 16000);
      }
    };

    runCycle();
  };

  const selectFavorite = (techniqueId: number) => {
    setSelectedFavorite(techniqueId);
  };

  const isCompleted = completedTechniques.size >= 2; // Au moins 2 techniques testées

  return (
    <section id="section-3" className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 text-learning-primary mr-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-learning-primary">
              Techniques de Respiration
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Apprenez des techniques de respiration scientifiquement prouvées pour gérer le stress,
            améliorer votre concentration et renforcer votre résilience au quotidien.
          </p>
        </motion.div>

        {!isBreathing ? (
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            {techniques.map((technique, index) => {
              const isCompletedTechnique = completedTechniques.has(technique.id);

              return (
                <motion.div
                  key={technique.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`learning-card p-8 ${isCompletedTechnique ? 'ring-2 ring-learning-primary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-learning-neutral flex items-center">
                      {technique.name}
                      {isCompletedTechnique && (
                        <CheckCircle className="w-6 h-6 text-learning-primary ml-2" />
                      )}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6">{technique.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-learning-primary mb-3">Instructions :</h4>
                    <ul className="space-y-2">
                      {technique.instructions.map((instruction, i) => (
                        <li key={i} className="flex items-start">
                          <span className="bg-learning-accent text-learning-primary w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-4 bg-learning-accent bg-opacity-20 rounded-lg">
                    <h4 className="font-semibold text-learning-primary mb-2">💡 Bienfaits :</h4>
                    <p className="text-gray-700">{technique.benefits}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => startBreathingExercise(technique.id)}
                      className="learning-button flex-1"
                    >
                      🧘‍♀️ Essayer cette technique
                    </button>

                    {isCompletedTechnique && (
                      <button
                        onClick={() => selectFavorite(technique.id)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                          selectedFavorite === technique.id
                            ? 'bg-learning-primary text-white'
                            : 'border-2 border-learning-primary text-learning-primary hover:bg-learning-primary hover:text-white'
                        }`}
                      >
                        ⭐ {selectedFavorite === technique.id ? 'Technique favorite' : 'Marquer comme favorite'}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="learning-card p-12 text-center"
          >
            <h3 className="text-3xl font-bold text-learning-primary mb-8">
              {techniques[currentTechnique].name}
            </h3>

            {/* Cercle de respiration animé */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-learning-primary"
                animate={{
                  scale: breathingPhase.includes('Inspirez') ? 1.2 :
                         breathingPhase.includes('Retenez') ? 1.2 : 0.8
                }}
                transition={{ duration: breathingPhase.includes('Retenez') ? 0 : 3, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-learning-primary bg-opacity-20 flex items-center justify-center"
                  animate={{
                    scale: breathingPhase.includes('Inspirez') ? 1.3 :
                           breathingPhase.includes('Retenez') ? 1.3 : 0.7
                  }}
                  transition={{ duration: breathingPhase.includes('Retenez') ? 0 : 3, ease: "easeInOut" }}
                >
                  <span className="text-learning-primary font-bold text-lg">
                    🧘‍♀️
                  </span>
                </motion.div>
              </div>
            </div>

            <p className="text-2xl font-semibold text-learning-primary mb-4">
              {breathingPhase}
            </p>

            <p className="text-gray-600">
              Suivez le rythme du cercle et concentrez-vous sur votre respiration
            </p>
          </motion.div>
        )}

        {isCompleted && !isBreathing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-card p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-learning-primary mb-4">
              🎉 Félicitations !
            </h3>
            <p className="text-gray-600 mb-6">
              Vous avez découvert et pratiqué des techniques de respiration.
              {selectedFavorite !== null && ` Votre technique favorite est : ${techniques[selectedFavorite].name}.`}
            </p>

            <div className="bg-learning-accent bg-opacity-20 p-6 rounded-xl mb-6">
              <h4 className="font-semibold text-learning-primary mb-3">💡 Conseil pour la suite</h4>
              <p className="text-gray-700">
                Pratiquez votre technique favorite 5 minutes par jour pendant une semaine.
                Utilisez-la notamment dans les moments de stress pour retrouver rapidement votre calme.
              </p>
            </div>

            <button
              onClick={() => {
                onComplete();
                onNavigate(4);
              }}
              className="learning-button"
            >
              Continuer vers les ressources de soutien →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Placeholder Section Component
function PlaceholderSection({ sectionId, title, description, icon: Icon }: any) {
  return (
    <section id={`section-${sectionId}`} className="min-h-screen py-20 px-4 flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="learning-card p-12"
        >
          <Icon className="w-16 h-16 text-learning-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {description}
          </p>
          <p className="text-sm text-gray-500">
            Cette section sera développée dans la prochaine itération. 
            Continuez à faire défiler pour explorer les autres sections disponibles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
