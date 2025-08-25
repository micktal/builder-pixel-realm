import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Progress tracking
interface ModuleProgress {
  currentSection: number;
  completedSections: Set<number>;
  assessmentData: any;
  personalPlan: any;
}

const SECTIONS = [
  { id: 0, title: "Accueil" },
  { id: 1, title: "Auto-bilan 360°" },
  { id: 2, title: "Résilience face à l'imprévu" },
  { id: 3, title: "Gestion des priorités" },
  { id: 4, title: "Confiance en soi" },
  { id: 5, title: "Mon système de suivi" },
  { id: 6, title: "Quiz final" },
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
                <span className="text-sm font-bold">{section.id + 1}</span>

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
          ↑
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
            </motion.div>
          </motion.button>

          {/* Module Duration */}
          <motion.p
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Durée estimée : 30 minutes
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
      <PriorityManagementSection
        progress={progress}
        onComplete={() => completeSection(3)}
        onNavigate={navigateToSection}
      />
      
      <ConfidenceSection
        progress={progress}
        onComplete={() => completeSection(4)}
        onNavigate={navigateToSection}
      />
      
      <PlaceholderSection
        sectionId={5}
        title="Mon système de suivi"
        description="Créez votre plan personnalisé de développement"
      />
      
      <PlaceholderSection
        sectionId={6}
        title="Quiz final & engagement"
        description="Validez vos acquis et prenez votre engagement"
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
        <h4 className="font-semibold text-learning-primary mb-3">Conseil personnalisé</h4>
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
          Exporter mon bilan PDF
        </button>
        <button 
          onClick={() => {
            onComplete();
            onContinue();
          }}
          className="learning-button"
        >
          Continuer vers la résilience
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
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Résilience face à l'imprévu
          </h2>
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
                  Feedback du coach
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
              Créez votre rituel minute
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
                Sauvegarder et continuer
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Priority Management Section Component
function PriorityManagementSection({ progress, onComplete, onNavigate }: any) {
  const [currentPhase, setCurrentPhase] = useState<'theory' | 'practice' | 'evaluation'>('theory');
  const [userTasks, setUserTasks] = useState<Array<{id: number, text: string, quadrant: number | null}>>([]);
  const [newTask, setNewTask] = useState('');
  const [completedQuadrants, setCompletedQuadrants] = useState<Set<number>>(new Set());
  const [currentDraggedTask, setCurrentDraggedTask] = useState<number | null>(null);

  const sampleTasks = [
    { id: 1, text: "Répondre aux emails non urgents", quadrant: null },
    { id: 2, text: "Appel client mécontent", quadrant: null },
    { id: 3, text: "Planifier les vacances", quadrant: null },
    { id: 4, text: "Formation en ligne", quadrant: null },
    { id: 5, text: "Réunion de crise", quadrant: null },
    { id: 6, text: "Lecture professionnelle", quadrant: null },
    { id: 7, text: "Réseaux sociaux", quadrant: null },
    { id: 8, text: "Préparation présentation importante", quadrant: null }
  ];

  const quadrants = [
    {
      id: 1,
      title: "URGENT & IMPORTANT",
      subtitle: "À FAIRE",
      description: "Crises, urgences, problèmes pressants",
      color: "bg-red-100 border-red-300",
      examples: ["Urgences médicales", "Crises clients", "Deadlines imminents"]
    },
    {
      id: 2,
      title: "IMPORTANT & NON URGENT",
      subtitle: "À PLANIFIER",
      description: "Prévention, développement, opportunités",
      color: "bg-green-100 border-green-300",
      examples: ["Formation", "Planification", "Relations"]
    },
    {
      id: 3,
      title: "URGENT & NON IMPORTANT",
      subtitle: "À DÉLÉGUER",
      description: "Interruptions, certains appels, emails",
      color: "bg-yellow-100 border-yellow-300",
      examples: ["Certains emails", "Réunions inutiles", "Interruptions"]
    },
    {
      id: 4,
      title: "NON URGENT & NON IMPORTANT",
      subtitle: "À ÉLIMINER",
      description: "Activités triviales, distractions",
      color: "bg-gray-100 border-gray-300",
      examples: ["Réseaux sociaux", "TV excessive", "Conversations futiles"]
    }
  ];

  useEffect(() => {
    if (currentPhase === 'practice') {
      setUserTasks(sampleTasks.map(task => ({ ...task })));
    }
  }, [currentPhase]);

  const addNewTask = () => {
    if (newTask.trim()) {
      setUserTasks(prev => [...prev, {
        id: Date.now(),
        text: newTask.trim(),
        quadrant: null
      }]);
      setNewTask('');
    }
  };

  const moveTaskToQuadrant = (taskId: number, quadrantId: number) => {
    setUserTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, quadrant: quadrantId } : task
    ));
    setCompletedQuadrants(prev => new Set([...prev, quadrantId]));
  };

  const getTasksInQuadrant = (quadrantId: number) => {
    return userTasks.filter(task => task.quadrant === quadrantId);
  };

  const getUnassignedTasks = () => {
    return userTasks.filter(task => task.quadrant === null);
  };

  const isCompleted = userTasks.length > 0 && getUnassignedTasks().length === 0;

  return (
    <section id="section-3" className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Gestion des Priorités & Prise de Décision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Maîtrisez la Matrice d'Eisenhower pour prendre des décisions éclairées,
            gérer efficacement votre temps et renforcer votre autonomie.
          </p>
        </motion.div>

        {/* Navigation des phases */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {[
              { id: 'theory', label: 'Théorie', desc: 'Apprentissage' },
              { id: 'practice', label: 'Pratique', desc: 'Exercice' },
              { id: 'evaluation', label: 'Évaluation', desc: 'Synthèse' }
            ].map(phase => (
              <button
                key={phase.id}
                onClick={() => {
                  setCurrentPhase(phase.id as any);
                  // Scroll vers le haut de la section quand on change de phase
                  setTimeout(() => {
                    const section = document.getElementById('section-3');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  currentPhase === phase.id
                    ? 'bg-learning-primary text-white'
                    : 'bg-white text-learning-primary border-2 border-learning-primary hover:bg-learning-accent'
                }`}
              >
                <div className="text-center">
                  <div>{phase.label}</div>
                  <div className="text-xs opacity-75">{phase.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Phase Théorie */}
        {currentPhase === 'theory' && (
          <div className="space-y-8">
            {/* Introduction théorique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                La Matrice d'Eisenhower : Fondements théoriques
              </h3>

              <div className="prose max-w-none text-gray-700 space-y-6">
                <p className="text-lg leading-relaxed">
                  Développée par le Président américain <strong>Dwight D. Eisenhower</strong> et popularisée par Stephen Covey,
                  cette matrice révolutionnaire distingue deux dimensions cruciales de toute tâche :
                  <strong className="text-learning-primary"> l'urgence et l'importance</strong>.
                </p>

                <div className="bg-learning-accent bg-opacity-20 p-6 rounded-xl">
                  <h4 className="font-semibold text-learning-primary mb-3">Distinction fondamentale :</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-learning-primary mb-2">⏰ URGENT</h5>
                      <p>Ce qui demande une attention immédiate. L'urgence est souvent imposée par les autres ou les circonstances externes.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-learning-primary mb-2">IMPORTANT</h5>
                      <p>Ce qui contribue à vos objectifs à long terme, vos valeurs et votre mission. L'importance est déterminée par vous.</p>
                    </div>
                  </div>
                </div>

                <p>
                  Cette distinction permet de <strong>hiérarchiser objectivement</strong> vos activités et d'éviter le piège de la
                  "tyrannie de l'urgent" qui nous fait sacrifier l'important au profit de l'urgent.
                </p>
              </div>
            </motion.div>

            {/* Les 4 quadrants expliqués */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {quadrants.map((quadrant, index) => (
                <motion.div
                  key={quadrant.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-6 rounded-xl border-2 ${quadrant.color}`}
                >
                  <h4 className="font-bold text-learning-primary mb-2">
                    Q{quadrant.id}: {quadrant.title}
                  </h4>
                  <p className="font-semibold text-sm text-learning-neutral mb-3">
                    {quadrant.subtitle}
                  </p>
                  <p className="text-gray-700 mb-4">{quadrant.description}</p>

                  <div>
                    <h5 className="font-semibold text-learning-primary mb-2">Exemples :</h5>
                    <ul className="space-y-1">
                      {quadrant.examples.map((example, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-learning-primary rounded-full mr-2"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Principes d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Principes d'action pour chaque quadrant
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-red-600 mb-3">Q1 - FAIRE immédiatement</h4>
                  <p className="text-gray-700 mb-4">Minimisez ce quadrant par une meilleure prévention (Q2).</p>

                  <h4 className="font-semibold text-green-600 mb-3">Q2 - PLANIFIER et prioriser</h4>
                  <p className="text-gray-700">Le quadrant de l'excellence ! Investissez 60-70% de votre temps ici.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-3">Q3 - DÉLÉGUER ou dire NON</h4>
                  <p className="text-gray-700 mb-4">Apprenez à déléguer efficacement ou à refuser poliment.</p>

                  <h4 className="font-semibold text-gray-600 mb-3">Q4 - ÉLIMINER</h4>
                  <p className="text-gray-700">Activités qui volent votre temps sans valeur ajoutée.</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-learning-primary bg-opacity-10 rounded-xl">
                <h4 className="font-semibold text-learning-primary mb-3">Clé du succès :</h4>
                <p className="text-gray-700">
                  <strong>Passez progressivement du Quadrant 1 au Quadrant 2.</strong> Plus vous investissez dans Q2
                  (planification, prévention, développement), moins vous aurez de crises en Q1. C'est le secret d'une
                  autonomie durable et d'une résilience renforcée.
                </p>
              </div>
            </motion.div>

            <div className="text-center">
              <button
                onClick={() => setCurrentPhase('practice')}
                className="learning-button text-lg px-8 py-4"
              >
                Passer à la pratique
              </button>
            </div>
          </div>
        )}

        {/* Phase Pratique */}
        {currentPhase === 'practice' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Exercice pratique : Classez vos tâches
              </h3>

              <p className="text-gray-600 mb-6">
                Glissez-déposez les tâches suivantes dans le bon quadrant. Vous pouvez aussi ajouter vos propres tâches !
              </p>

              {/* Ajout de nouvelles tâches */}
              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Ajoutez votre propre tâche..."
                  className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-learning-primary focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                />
                <button
                  onClick={addNewTask}
                  className="learning-button-secondary px-6"
                >
                  Ajouter
                </button>
              </div>

              {/* Tâches non assignées */}
              {getUnassignedTasks().length > 0 && (
                <div className="mb-8">
                  <h4 className="font-semibold text-learning-primary mb-4">Tâches à classer :</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {getUnassignedTasks().map(task => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 bg-white rounded-lg border-2 border-gray-200 cursor-move hover:border-learning-primary transition-colors"
                        draggable
                        onDragStart={() => setCurrentDraggedTask(task.id)}
                        whileHover={{ scale: 1.02 }}
                      >
                        {task.text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matrice interactive */}
              <div className="grid grid-cols-2 gap-4">
                {quadrants.map(quadrant => (
                  <div
                    key={quadrant.id}
                    className={`p-4 rounded-xl border-2 min-h-[200px] ${quadrant.color}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (currentDraggedTask) {
                        moveTaskToQuadrant(currentDraggedTask, quadrant.id);
                        setCurrentDraggedTask(null);
                      }
                    }}
                  >
                    <h4 className="font-bold text-learning-primary mb-2 text-sm">
                      Q{quadrant.id}: {quadrant.subtitle}
                    </h4>
                    <p className="text-xs text-gray-600 mb-4">{quadrant.description}</p>

                    <div className="space-y-2">
                      {getTasksInQuadrant(quadrant.id).map(task => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-2 bg-white rounded text-sm"
                        >
                          {task.text}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={() => setCurrentPhase('evaluation')}
                  className="learning-button text-lg px-8 py-4"
                >
                  Voir mon évaluation
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Phase Évaluation */}
        {currentPhase === 'evaluation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="learning-card p-8 text-center">
              <h3 className="text-3xl font-bold text-learning-primary mb-6">
                Analyse de votre classification
              </h3>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {quadrants.map(quadrant => {
                  const tasksCount = getTasksInQuadrant(quadrant.id).length;
                  return (
                    <div key={quadrant.id} className={`p-4 rounded-xl ${quadrant.color}`}>
                      <h4 className="font-bold text-learning-primary mb-2">Q{quadrant.id}</h4>
                      <div className="text-2xl font-bold text-learning-neutral">{tasksCount}</div>
                      <p className="text-xs">tâches classées</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-learning-accent bg-opacity-20 p-6 rounded-xl mb-8">
                <h4 className="font-semibold text-learning-primary mb-3">Recommandations personnalisées</h4>
                <div className="text-left space-y-3">
                  {getTasksInQuadrant(1).length > 3 && (
                    <p className="text-gray-700"><strong>Trop de tâches urgentes :</strong> Investissez plus dans la planification (Q2) pour réduire les crises.</p>
                  )}
                  {getTasksInQuadrant(2).length < 2 && (
                    <p className="text-gray-700"><strong>Développez Q2 :</strong> Ajoutez plus d'activités de développement et de prévention.</p>
                  )}
                  {getTasksInQuadrant(4).length > 0 && (
                    <p className="text-gray-700"><strong>Éliminez Q4 :</strong> Ces activités nuisent à votre productivité.</p>
                  )}
                  {getTasksInQuadrant(2).length >= getTasksInQuadrant(1).length && (
                    <p className="text-gray-700"><strong>Excellent équilibre :</strong> Vous priorisez l'important sur l'urgent !</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  onComplete();
                  onNavigate(4);
                }}
                className="learning-button text-lg px-8 py-4"
              >
                Continuer vers les ressources de soutien
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Confidence Development Section Component
function ConfidenceSection({ progress, onComplete, onNavigate }: any) {
  const [currentPhase, setCurrentPhase] = useState<'assessment' | 'successes' | 'comfort-zone'>('assessment');
  const [strengths, setStrengths] = useState<Record<string, number>>({});
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [successes, setSuccesses] = useState<Array<{id: number, text: string, category: string, pride: number}>>([]);
  const [newSuccess, setNewSuccess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [comfortZoneLevel, setComfortZoneLevel] = useState(0);
  const [comfortZoneActions, setComfortZoneActions] = useState<string[]>([]);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const strengthsOptions = [
    { id: 'communication', label: 'Communication', description: 'Capacité à exprimer clairement ses idées' },
    { id: 'leadership', label: 'Leadership', description: 'Aptitude à guider et inspirer les autres' },
    { id: 'creativite', label: 'Créativité', description: 'Capacité à trouver des solutions innovantes' },
    { id: 'empathie', label: 'Empathie', description: 'Compréhension et connexion émotionnelle' },
    { id: 'perseverance', label: 'Persévérance', description: 'Ténacité face aux obstacles' },
    { id: 'adaptabilite', label: 'Adaptabilité', description: 'Flexibilité face au changement' },
    { id: 'organisation', label: 'Organisation', description: 'Structuration et planification efficace' },
    { id: 'apprentissage', label: 'Apprentissage', description: 'Capacité à acquérir de nouvelles compétences' }
  ];

  const successCategories = [
    { id: 'professionnel', label: 'Professionnel', color: 'bg-blue-100 border-blue-300' },
    { id: 'personnel', label: 'Personnel', color: 'bg-green-100 border-green-300' },
    { id: 'relationnel', label: 'Relationnel', color: 'bg-purple-100 border-purple-300' },
    { id: 'apprentissage', label: 'Apprentissage', color: 'bg-yellow-100 border-yellow-300' }
  ];

  const availableActions = [
    "Prendre la parole en public",
    "Proposer une idée innovante en réunion",
    "Aborder quelqu'un que je ne connais pas",
    "Dire non à une demande déraisonnable",
    "Demander une augmentation ou promotion",
    "Essayer une nouvelle activité créative",
    "Voyager seul(e) dans un endroit inconnu",
    "Apprendre une nouvelle compétence technique"
  ];

  const rateStrength = (strengthId: string, rating: number) => {
    setStrengths(prev => ({ ...prev, [strengthId]: rating }));
  };

  const toggleStrength = (strengthId: string) => {
    setSelectedStrengths(prev =>
      prev.includes(strengthId)
        ? prev.filter(s => s !== strengthId)
        : [...prev, strengthId]
    );
  };

  const addSuccess = () => {
    if (newSuccess.trim() && selectedCategory) {
      setSuccesses(prev => [...prev, {
        id: Date.now(),
        text: newSuccess.trim(),
        category: selectedCategory,
        pride: 0
      }]);
      setNewSuccess('');
      setSelectedCategory('');
    }
  };

  const updateSuccessPride = (successId: number, pride: number) => {
    setSuccesses(prev => prev.map(success =>
      success.id === successId ? { ...success, pride } : success
    ));
  };

  const calculateConfidenceScore = () => {
    const strengthsScore = Object.values(strengths).reduce((a, b) => a + b, 0) / Object.keys(strengths).length || 0;
    const successesScore = successes.length > 0 ? successes.reduce((sum, s) => sum + s.pride, 0) / successes.length : 0;
    const comfortZoneScore = comfortZoneLevel;

    return Math.round((strengthsScore + successesScore + comfortZoneScore) / 3 * 20);
  };

  const isPhaseComplete = (phase: string) => {
    switch (phase) {
      case 'assessment': return Object.keys(strengths).length >= 5 && selectedStrengths.length >= 3;
      case 'successes': return successes.length >= 3;
      case 'comfort-zone': return comfortZoneLevel > 0 && comfortZoneActions.length >= 2;
      default: return false;
    }
  };

  const isCompleted = isPhaseComplete('assessment') && isPhaseComplete('successes') && isPhaseComplete('comfort-zone');

  useEffect(() => {
    if (isCompleted) {
      setConfidenceScore(calculateConfidenceScore());
    }
  }, [strengths, successes, comfortZoneLevel]);

  return (
    <section id="section-4" className="min-h-screen py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Développement de la Confiance en Soi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Renforcez votre confiance par la reconnaissance de vos forces, la célébration de vos réussites,
            et l'exploration progressive de nouvelles zones de croissance.
          </p>
        </motion.div>

        {/* Navigation des phases */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'assessment', label: 'Forces personnelles', desc: 'Auto-évaluation', icon: '💪' },
            { id: 'successes', label: 'Réussites passées', desc: 'Reconnaissance', icon: '🏆' },
            { id: 'comfort-zone', label: 'Zone de confort', desc: 'Extension', icon: '🚀' }
          ].map(phase => (
            <motion.button
              key={phase.id}
              onClick={() => {
                setCurrentPhase(phase.id as any);
                setTimeout(() => {
                  const section = document.getElementById('section-4');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center ${
                currentPhase === phase.id
                  ? 'bg-learning-primary text-white shadow-lg scale-105'
                  : 'bg-white text-learning-primary border-2 border-learning-primary hover:bg-learning-accent'
              }`}
              whileHover={{ scale: currentPhase === phase.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-1">{phase.icon}</div>
              <div className="font-bold">{phase.label}</div>
              <div className="text-xs opacity-75">{phase.desc}</div>
              {isPhaseComplete(phase.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1 w-2 h-2 bg-green-400 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Phase 1: Auto-évaluation des forces */}
        {currentPhase === 'assessment' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Identifiez vos forces personnelles
              </h3>
              <p className="text-gray-600 mb-8">
                Évaluez-vous sur ces différentes dimensions, puis sélectionnez vos 3 forces principales.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {strengthsOptions.map((strength, index) => (
                  <motion.div
                    key={strength.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedStrengths.includes(strength.id)
                        ? 'border-learning-primary bg-learning-accent bg-opacity-20 ring-2 ring-learning-primary'
                        : 'border-gray-200 hover:border-learning-primary'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-learning-primary mb-2">{strength.label}</h4>
                        <p className="text-sm text-gray-600">{strength.description}</p>
                      </div>
                      <motion.button
                        onClick={() => toggleStrength(strength.id)}
                        className={`ml-4 w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          selectedStrengths.includes(strength.id)
                            ? 'bg-learning-primary border-learning-primary text-white'
                            : 'border-gray-300 hover:border-learning-primary'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {selectedStrengths.includes(strength.id) ? '✓' : ''}
                      </motion.button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Faible</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <motion.button
                            key={rating}
                            onClick={() => rateStrength(strength.id, rating)}
                            className={`w-8 h-8 rounded-full transition-all duration-300 ${
                              strengths[strength.id] >= rating
                                ? 'bg-learning-primary text-white'
                                : 'bg-gray-200 hover:bg-learning-accent'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {rating}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Fort</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedStrengths.length === 3 && Object.keys(strengths).length >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-learning-primary bg-opacity-10 rounded-xl text-center"
                >
                  <h4 className="font-bold text-learning-primary mb-3">Vos 3 forces principales :</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedStrengths.map(strengthId => {
                      const strength = strengthsOptions.find(s => s.id === strengthId);
                      return (
                        <motion.div
                          key={strengthId}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-learning-primary text-white px-4 py-2 rounded-full font-medium"
                        >
                          {strength?.label}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Phase 2: Réussites passées */}
        {currentPhase === 'successes' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Reconnaissez vos réussites passées
              </h3>
              <p className="text-gray-600 mb-8">
                Identifiez au moins 3 réussites dont vous êtes fier(e), dans différents domaines de votre vie.
              </p>

              {/* Ajout de nouvelles réussites */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <input
                  type="text"
                  value={newSuccess}
                  onChange={(e) => setNewSuccess(e.target.value)}
                  placeholder="Décrivez une réussite..."
                  className="col-span-2 p-3 border-2 border-gray-200 rounded-lg focus:border-learning-primary focus:outline-none"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-3 border-2 border-gray-200 rounded-lg focus:border-learning-primary focus:outline-none"
                >
                  <option value="">Choisir catégorie</option>
                  {successCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="text-center mb-8">
                <motion.button
                  onClick={addSuccess}
                  disabled={!newSuccess.trim() || !selectedCategory}
                  className="learning-button-secondary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: newSuccess.trim() && selectedCategory ? 1.05 : 1 }}
                >
                  Ajouter cette réussite
                </motion.button>
              </div>

              {/* Liste des réussites */}
              <div className="grid md:grid-cols-2 gap-6">
                {successes.map((success, index) => {
                  const category = successCategories.find(c => c.id === success.category);
                  return (
                    <motion.div
                      key={success.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-2 ${category?.color}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-learning-primary mb-2">{success.text}</h4>
                          <span className="text-xs px-2 py-1 bg-white rounded-full">{category?.label}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Niveau de fierté :</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <motion.button
                              key={level}
                              onClick={() => updateSuccessPride(success.id, level)}
                              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                                success.pride >= level
                                  ? 'bg-yellow-400 text-white'
                                  : 'bg-gray-200 hover:bg-yellow-200'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ⭐
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}

        {/* Phase 3: Zone de confort */}
        {currentPhase === 'comfort-zone' && (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Explorez votre zone de confort
              </h3>
              <p className="text-gray-600 mb-8">
                Évaluez votre niveau de confort actuel et choisissez des actions pour l'étendre progressivement.
              </p>

              {/* Échelle de confort */}
              <div className="mb-8">
                <h4 className="font-semibold text-learning-primary mb-4">Votre niveau de prise de risque actuel :</h4>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Très prudent(e)</span>
                  <span className="text-sm text-gray-500">Très audacieux(se)</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={comfortZoneLevel}
                    onChange={(e) => setComfortZoneLevel(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <span key={num} className={comfortZoneLevel >= num ? 'text-learning-primary font-bold' : ''}>
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions hors zone de confort */}
              <div>
                <h4 className="font-semibold text-learning-primary mb-4">
                  Actions pour sortir de votre zone de confort (choisissez-en 2) :
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {comfortZoneActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setComfortZoneActions(prev =>
                          prev.includes(action)
                            ? prev.filter(a => a !== action)
                            : prev.length < 2 ? [...prev, action] : prev
                        );
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        comfortZoneActions.includes(action)
                          ? 'border-learning-primary bg-learning-accent bg-opacity-20'
                          : 'border-gray-200 hover:border-learning-primary'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!comfortZoneActions.includes(action) && comfortZoneActions.length >= 2}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">{action}</span>
                        {comfortZoneActions.includes(action) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-learning-primary rounded-full flex items-center justify-center text-white text-sm"
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Résultat final */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-card p-8 text-center"
          >
            <h3 className="text-3xl font-bold text-learning-primary mb-6">
              Votre profil de confiance
            </h3>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-learning-primary to-learning-accent flex items-center justify-center"
            >
              <span className="text-3xl font-bold text-white">{confidenceScore}%</span>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-learning-primary mb-2">Forces identifiées</h4>
                <p className="text-sm text-gray-600">{selectedStrengths.length} forces principales</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-bold text-learning-primary mb-2">Réussites célébrées</h4>
                <p className="text-sm text-gray-600">{successes.length} réussites reconnues</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <h4 className="font-bold text-learning-primary mb-2">Zone de croissance</h4>
                <p className="text-sm text-gray-600">Niveau {comfortZoneLevel}/5</p>
              </div>
            </div>

            <button
              onClick={() => {
                onComplete();
                onNavigate(5);
              }}
              className="learning-button text-lg px-8 py-4"
            >
              Continuer vers le système de suivi
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Placeholder Section Component
function PlaceholderSection({ sectionId, title, description }: any) {
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
          <div className="w-16 h-16 bg-learning-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">{sectionId}</span>
          </div>
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
