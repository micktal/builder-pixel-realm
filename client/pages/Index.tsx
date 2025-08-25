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
  { id: 4, title: "Gestion du stress" },
  { id: 5, title: "Simulation stress extrême" },
  { id: 6, title: "Réseau de soutien" },
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
      
      <StressManagementSection
        progress={progress}
        onComplete={() => completeSection(4)}
        onNavigate={navigateToSection}
      />
      
      <StressSimulationSection
        progress={progress}
        onComplete={() => completeSection(5)}
        onNavigate={navigateToSection}
      />
      
      <RelationalMapSection
        progress={progress}
        onComplete={() => completeSection(6)}
        onNavigate={navigateToSection}
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

// Stress Management Section Component
function StressManagementSection({ progress, onComplete, onNavigate }: any) {
  const [currentPhase, setCurrentPhase] = useState<'theory' | 'techniques' | 'scenarios' | 'evaluation'>('theory');
  const [stressFactors, setStressFactors] = useState<Record<string, number>>({});
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [scenarioResults, setScenarioResults] = useState<Record<string, string>>({});
  const [personalPlan, setPersonalPlan] = useState<string[]>([]);

  const stressTypes = [
    { id: 'workload', label: 'Surcharge de travail', description: 'Trop de tâches à accomplir dans un temps limité' },
    { id: 'deadlines', label: 'Pression temporelle', description: 'Stress lié aux échéances et délais serrés' },
    { id: 'conflict', label: 'Conflits relationnels', description: 'Tensions avec collègues, famille ou amis' },
    { id: 'uncertainty', label: 'Incertitude', description: 'Manque de clarté sur l\'avenir ou les attentes' },
    { id: 'perfectionism', label: 'Perfectionnisme', description: 'Exigences personnelles trop élevées' },
    { id: 'change', label: 'Résistance au changement', description: 'Difficulté à s\'adapter aux nouveautés' }
  ];

  const stressTechniques = [
    {
      id: 'cognitive',
      name: 'Restructuration cognitive',
      description: 'Identifier et modifier les pensées négatives automatiques',
      steps: [
        'Identifier la pensée stressante',
        'Questionner sa validité',
        'Rechercher des preuves contradictoires',
        'Formuler une pensée plus réaliste'
      ],
      example: 'Pensée: "Je vais échouer" → "J\'ai les compétences nécessaires et je peux demander de l\'aide"'
    },
    {
      id: 'anchoring',
      name: 'Technique d\'ancrage 5-4-3-2-1',
      description: 'Recentrage immédiat par stimulation sensorielle',
      steps: [
        '5 choses que vous voyez',
        '4 choses que vous touchez',
        '3 choses que vous entendez',
        '2 choses que vous sentez',
        '1 chose que vous goûtez'
      ],
      example: 'Utilisée en cas d\'anxiété soudaine pour revenir au moment présent'
    },
    {
      id: 'planning',
      name: 'Planification adaptative',
      description: 'Organiser ses tâches pour réduire la surcharge mentale',
      steps: [
        'Lister toutes les tâches',
        'Estimer le temps réaliste',
        'Prioriser selon l\'urgence/importance',
        'Prévoir des marges de sécurité'
      ],
      example: 'Bloquer 15min entre chaque réunion pour décompresser'
    },
    {
      id: 'boundaries',
      name: 'Définition des limites',
      description: 'Apprendre à dire non et protéger son énergie',
      steps: [
        'Identifier ses valeurs prioritaires',
        'Reconnaître ses signaux de surcharge',
        'Formuler un "non" bienveillant',
        'Proposer des alternatives si possible'
      ],
      example: '"Je ne peux pas prendre ce projet maintenant, mais je serai disponible la semaine prochaine"'
    }
  ];

  const stressScenarios = [
    {
      id: 'meeting-overload',
      title: 'Journée surchargée de réunions',
      situation: 'Vous avez 6 réunions consécutives programmées aujourd\'hui. Vous sentez déjà l\'anxiété monter en regardant votre agenda.',
      options: [
        { id: 'A', text: 'Annuler certaines réunions non-critiques', technique: 'boundaries' },
        { id: 'B', text: 'Prendre 2 minutes entre chaque réunion pour la technique 5-4-3-2-1', technique: 'anchoring' },
        { id: 'C', text: 'Recadrer positivement: "C\'est une journée intense mais productive"', technique: 'cognitive' }
      ]
    },
    {
      id: 'project-deadline',
      title: 'Projet en retard',
      situation: 'Un projet important a pris du retard et l\'échéance approche. Votre manager commence à s\'impatienter.',
      options: [
        { id: 'A', text: 'Refaire une planification réaliste avec des étapes micro', technique: 'planning' },
        { id: 'B', text: 'Communiquer proactivement les défis et négocier l\'échéance', technique: 'boundaries' },
        { id: 'C', text: 'Remplacer "Je n\'y arriverai jamais" par "Je progresse étape par étape"', technique: 'cognitive' }
      ]
    },
    {
      id: 'conflict-colleague',
      title: 'Conflit avec un collègue',
      situation: 'Un collègue critique systématiquement vos propositions en réunion. Vous commencez à redouter ces moments.',
      options: [
        { id: 'A', text: 'Avant la réunion, visualiser une interaction positive', technique: 'cognitive' },
        { id: 'B', text: 'Utiliser l\'ancrage sensoriel si la tension monte', technique: 'anchoring' },
        { id: 'C', text: 'Définir des limites claires sur le type de feedback acceptable', technique: 'boundaries' }
      ]
    }
  ];

  const rateStressFactor = (factorId: string, level: number) => {
    setStressFactors(prev => ({ ...prev, [factorId]: level }));
  };

  const toggleTechnique = (techniqueId: string) => {
    setSelectedTechniques(prev =>
      prev.includes(techniqueId)
        ? prev.filter(t => t !== techniqueId)
        : [...prev, techniqueId]
    );
  };

  const handleScenarioChoice = (scenarioId: string, choice: string) => {
    setScenarioResults(prev => ({ ...prev, [scenarioId]: choice }));
  };

  const generatePersonalPlan = () => {
    const plan = [];

    // Techniques sélectionnées
    selectedTechniques.forEach(techId => {
      const technique = stressTechniques.find(t => t.id === techId);
      if (technique) {
        plan.push(`Pratiquer la ${technique.name.toLowerCase()} quotidiennement`);
      }
    });

    // Facteurs de stress les plus élevés
    const highStressFactors = Object.entries(stressFactors)
      .filter(([_, level]) => level >= 4)
      .map(([factorId]) => stressTypes.find(t => t.id === factorId))
      .filter(Boolean);

    highStressFactors.forEach(factor => {
      plan.push(`Développer des stratégies spécifiques pour ${factor?.label.toLowerCase()}`);
    });

    setPersonalPlan(plan);
  };

  const isPhaseComplete = (phase: string) => {
    switch (phase) {
      case 'theory': return true; // Toujours considéré comme lu
      case 'techniques': return selectedTechniques.length >= 2;
      case 'scenarios': return Object.keys(scenarioResults).length >= 2;
      case 'evaluation': return Object.keys(stressFactors).length >= 4;
      default: return false;
    }
  };

  const isCompleted = isPhaseComplete('techniques') && isPhaseComplete('scenarios') && isPhaseComplete('evaluation');

  useEffect(() => {
    if (isCompleted) {
      generatePersonalPlan();
    }
  }, [stressFactors, selectedTechniques, scenarioResults]);

  return (
    <section id="section-4" className="min-h-screen py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Notre stress et notre adaptation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            le stress avec des techniques concrètes
            et des stratégies personnalisées pour votre bien-être durable.
          </p>
        </motion.div>

        {/* Objectifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="learning-card p-6 mb-12"
        >
          <h3 className="text-xl font-bold text-learning-primary mb-4">Objectifs de cette section :</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-learning-primary rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5">1</div>
              <span>Adapter sa réponse aux mécanismes physiologiques et psychologiques du stress</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-learning-primary rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5">2</div>
              <span>Maîtriser 4 techniques concrètes de gestion du stress</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-learning-primary rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5">3</div>
              <span>Appliquer ces techniques dans des situations réelles</span>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-learning-primary rounded-full flex items-center justify-center text-white text-sm mr-3 mt-0.5">4</div>
              <span>Élaborer votre plan personnel de gestion du stress</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation des phases */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'theory', label: 'Adapter', desc: 'Théorie' },
            { id: 'techniques', label: 'Apprendre', desc: 'Techniques' },
            { id: 'scenarios', label: 'Pratiquer', desc: 'Scénarios' },
            { id: 'evaluation', label: 'Personnaliser', desc: 'Mon profil' }
          ].map(phase => (
            <motion.button
              key={phase.id}
              onClick={() => {
                setCurrentPhase(phase.id as any);
                setTimeout(() => {
                  const targetElement = document.getElementById(`stress-${phase.id}`);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    // Fallback vers la section principale
                    const section = document.getElementById('section-4');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
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

        {/* Phase Théorie */}
        {currentPhase === 'theory' && (
          <div id="stress-theory" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Adapter sa réponse au stress : Mécanismes et impact
              </h3>

              <div className="prose max-w-none text-gray-700 space-y-6">
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-learning-primary mb-3">Qu'est-ce que le stress ?</h4>
                  <p>
                    Le stress est une <strong>réaction d'adaptation naturelle</strong> de notre organisme face à une situation
                    perçue comme menaçante ou exigeante. Il se manifeste par une cascade de réactions physiologiques,
                    émotionnelles et comportementales destinées à nous préparer à l'action.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-red-50 rounded-xl">
                    <h4 className="font-semibold text-learning-primary mb-3">Phase d'alarme</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Libération d'adrénaline et cortisol</li>
                      <li>• Accélération cardiaque et respiratoire</li>
                      <li>• Tension musculaire</li>
                      <li>• Hypervigilance</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-yellow-50 rounded-xl">
                    <h4 className="font-semibold text-learning-primary mb-3">Phase de résistance</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Adaptation à la situation</li>
                      <li>• Mobilisation des ressources</li>
                      <li>• Maintien de la performance</li>
                      <li>• Fatigue progressive</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-learning-accent bg-opacity-20 p-6 rounded-xl">
                  <h4 className="font-semibold text-learning-primary mb-3">Stress aigu vs chronique</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-learning-primary mb-2">Stress aigu (positif)</h5>
                      <p className="text-sm">Réaction ponctuelle qui améliore les performances et disparaît rapidement.
                      Exemple : présentation importante, entretien d'embauche.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-learning-primary mb-2">Stress chronique (nocif)</h5>
                      <p className="text-sm">Exposition prolongée aux facteurs stressants qui épuise l'organisme
                      et peut mener au burnout, anxiété et problèmes de santé.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-learning-primary bg-opacity-10 rounded-xl">
                  <h4 className="font-semibold text-learning-primary mb-3">Impact sur la performance</h4>
                  <p>
                    La <strong>courbe de performance de Yerkes-Dodson</strong> montre qu'un niveau modéré de stress
                    optimise nos capacités, mais qu'au-delà d'un seuil, la performance chute drastiquement.
                    L'objectif n'est donc pas d'éliminer tout stress, mais de le maintenir dans une zone optimale.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Phase Techniques */}
        {currentPhase === 'techniques' && (
          <div id="stress-techniques" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                4 Techniques essentielles de gestion du stress
              </h3>
              <p className="text-gray-600 mb-8">
                Sélectionnez au moins 2 techniques que vous souhaitez intégrer dans votre quotidien.
              </p>

              <div className="space-y-6">
                {stressTechniques.map((technique, index) => (
                  <motion.div
                    key={technique.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedTechniques.includes(technique.id)
                        ? 'border-learning-primary bg-learning-accent bg-opacity-20 ring-2 ring-learning-primary'
                        : 'border-gray-200 hover:border-learning-primary'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-learning-primary mb-2">{technique.name}</h4>
                        <p className="text-gray-600 mb-4">{technique.description}</p>

                        <div className="mb-4">
                          <h5 className="font-semibold text-learning-primary mb-2">Étapes :</h5>
                          <ol className="space-y-1">
                            {technique.steps.map((step, i) => (
                              <li key={i} className="flex items-start">
                                <span className="bg-learning-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                                  {i + 1}
                                </span>
                                <span className="text-sm text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold text-learning-primary mb-1">Exemple concret :</h5>
                          <p className="text-sm text-gray-700 italic">{technique.example}</p>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => toggleTechnique(technique.id)}
                        className={`ml-4 w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          selectedTechniques.includes(technique.id)
                            ? 'bg-learning-primary border-learning-primary text-white'
                            : 'border-gray-300 hover:border-learning-primary'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {selectedTechniques.includes(technique.id) ? '✓' : '+'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedTechniques.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-learning-primary bg-opacity-10 rounded-xl text-center"
                >
                  <h4 className="font-bold text-learning-primary mb-3">Techniques sélectionnées :</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedTechniques.map(techId => {
                      const technique = stressTechniques.find(t => t.id === techId);
                      return (
                        <motion.div
                          key={techId}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-learning-primary text-white px-4 py-2 rounded-full font-medium"
                        >
                          {technique?.name}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Phase Scénarios */}
        {currentPhase === 'scenarios' && (
          <div id="stress-scenarios" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Scénarios pratiques d'application
              </h3>
              <p className="text-gray-600 mb-8">
                Choisissez la meilleure stratégie pour chaque situation stressante.
              </p>

              <div className="space-y-8">
                {stressScenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 border-2 border-gray-200 rounded-xl"
                  >
                    <h4 className="text-xl font-semibold text-learning-primary mb-4">{scenario.title}</h4>
                    <div className="p-4 bg-orange-50 rounded-lg mb-6">
                      <p className="text-gray-700 italic">{scenario.situation}</p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-learning-primary">Quelle stratégie choisissez-vous ?</h5>
                      {scenario.options.map(option => {
                        const technique = stressTechniques.find(t => t.id === option.technique);
                        const isSelected = scenarioResults[scenario.id] === option.id;

                        return (
                          <motion.button
                            key={option.id}
                            onClick={() => handleScenarioChoice(scenario.id, option.id)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                              isSelected
                                ? 'border-learning-primary bg-learning-accent bg-opacity-20'
                                : 'border-gray-200 hover:border-learning-primary'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="bg-learning-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    {option.id}
                                  </span>
                                  <span className="font-medium">{option.text}</span>
                                </div>
                                <div className="ml-9">
                                  <span className="text-xs px-2 py-1 bg-learning-primary text-white rounded-full">
                                    Technique: {technique?.name}
                                  </span>
                                </div>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm"
                                >
                                  ✓
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {scenarioResults[scenario.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-50 rounded-lg"
                      >
                        <p className="text-green-700">
                          <strong>Excellent choix !</strong> Cette approche vous permettra de gérer efficacement
                          la situation en utilisant une technique concrète.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Phase Évaluation */}
        {currentPhase === 'evaluation' && (
          <div id="stress-evaluation" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="learning-card p-8"
            >
              <h3 className="text-2xl font-bold text-learning-primary mb-6">
                Votre profil de stress personnel
              </h3>
              <p className="text-gray-600 mb-8">
                Évaluez l'intensité de ces facteurs de stress dans votre quotidien (1 = faible, 5 = très élevé).
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {stressTypes.map((stressType, index) => (
                  <motion.div
                    key={stressType.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-learning-primary transition-colors"
                  >
                    <h4 className="font-semibold text-learning-primary mb-2">{stressType.label}</h4>
                    <p className="text-sm text-gray-600 mb-4">{stressType.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Faible</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <motion.button
                            key={level}
                            onClick={() => rateStressFactor(stressType.id, level)}
                            className={`w-8 h-8 rounded-full transition-all duration-300 ${
                              stressFactors[stressType.id] >= level
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 hover:bg-orange-200'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {level}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Élevé</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Résultat final */}
        {isCompleted && personalPlan.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-card p-8 text-center"
          >
            <h3 className="text-3xl font-bold text-learning-primary mb-6">
              Votre plan personnel de gestion du stress
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-orange-50 rounded-xl">
                <h4 className="font-bold text-learning-primary mb-2">Techniques maîtrisées</h4>
                <p className="text-sm text-gray-600">{selectedTechniques.length} techniques sélectionnées</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-bold text-learning-primary mb-2">Scénarios pratiqués</h4>
                <p className="text-sm text-gray-600">{Object.keys(scenarioResults).length} situations résolues</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-learning-primary mb-2">Profil évalué</h4>
                <p className="text-sm text-gray-600">{Object.keys(stressFactors).length} facteurs identifiés</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-learning-primary mb-4">Actions recommandées :</h4>
              <div className="space-y-2">
                {personalPlan.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-3 bg-learning-accent bg-opacity-20 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-learning-primary rounded-full flex items-center justify-center text-white text-sm mr-3">
                      {index + 1}
                    </div>
                    <span>{action}</span>
                  </motion.div>
                ))}
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

// Stress Simulation Section Component
function StressSimulationSection({ progress, onComplete, onNavigate }: any) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [responses, setResponses] = useState<Array<{scenarioId: number, choice: string, responseTime: number, type: 'resilient' | 'reactive'}>>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [resilienceScore, setResilienceScore] = useState(0);
  const [totalPressure, setTotalPressure] = useState(0);

  const stressScenarios = [
    {
      id: 0,
      situation: "UN CLIENT HURLE AU TÉLÉPHONE",
      context: "Il est furieux car sa commande n'est pas arrivée. Votre manager vous regarde. Que faites-vous ?",
      urgency: "RÉACTION IMMÉDIATE REQUISE !",
      choices: [
        { id: 'A', text: "Je lui dis de se calmer ou je raccroche", type: 'reactive' as const },
        { id: 'B', text: "J'écoute activement et reformule son problème", type: 'resilient' as const },
        { id: 'C', text: "Je transfère immédiatement à mon manager", type: 'reactive' as const }
      ]
    },
    {
      id: 1,
      situation: "DEADLINE IMPOSSIBLE",
      context: "Votre manager vous demande un rapport complet pour dans 30 minutes. C'est physiquement impossible.",
      urgency: "DÉCISION RAPIDE !",
      choices: [
        { id: 'A', text: "Je dis oui et je panique en silence", type: 'reactive' as const },
        { id: 'B', text: "J'explique les contraintes et propose une alternative", type: 'resilient' as const },
        { id: 'C', text: "Je fais semblant de comprendre et j'improvise", type: 'reactive' as const }
      ]
    },
    {
      id: 2,
      situation: "CONFLIT ÉQUIPE EN RÉUNION",
      context: "Deux collègues se disputent violemment devant tout le monde. L'atmosphère est électrique.",
      urgency: "INTERVENTION NÉCESSAIRE !",
      choices: [
        { id: 'A', text: "Je sors de la réunion discrètement", type: 'reactive' as const },
        { id: 'B', text: "Je propose une pause et recentre sur l'objectif", type: 'resilient' as const },
        { id: 'C', text: "Je prends parti pour le plus convaincant", type: 'reactive' as const }
      ]
    },
    {
      id: 3,
      situation: "PROBLÈME TECHNIQUE CRITIQUE",
      context: "Le système plante 1h avant une présentation majeure. Tout le monde compte sur vous.",
      urgency: "PRESSION MAXIMALE !",
      choices: [
        { id: 'A', text: "Je panique et cherche quelqu'un d'autre", type: 'reactive' as const },
        { id: 'B', text: "Je respire, évalue les options et communique", type: 'resilient' as const },
        { id: 'C', text: "J'essaie tout et n'importe quoi rapidement", type: 'reactive' as const }
      ]
    },
    {
      id: 4,
      situation: "CRITIQUE PUBLIQUE INATTENDUE",
      context: "En pleine présentation, un participant critique violemment votre travail devant 20 personnes.",
      urgency: "TOUS LES REGARDS SUR VOUS !",
      choices: [
        { id: 'A', text: "Je contre-attaque et défends mon travail", type: 'reactive' as const },
        { id: 'B', text: "J'accueille la critique et demande des précisions", type: 'resilient' as const },
        { id: 'C', text: "Je minimise et passe rapidement au suivant", type: 'reactive' as const }
      ]
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('results');
            calculateResults();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const startSimulation = () => {
    setGameState('playing');
    setStartTime(Date.now());
    setCurrentScenario(0);
    setTimeLeft(120);
    setResponses([]);
    setResilienceScore(0);
    setTotalPressure(0);
  };

  const handleChoice = (choice: any) => {
    const responseTime = (Date.now() - startTime) / 1000;
    const newResponse = {
      scenarioId: currentScenario,
      choice: choice.id,
      responseTime,
      type: choice.type
    };

    setResponses(prev => [...prev, newResponse]);

    // Calcul de la pression (plus on répond vite sous stress, plus c'est intense)
    const pressureBonus = responseTime < 10 ? 20 : responseTime < 20 ? 10 : 5;
    setTotalPressure(prev => prev + pressureBonus);

    if (currentScenario < stressScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setStartTime(Date.now()); // Reset timer for next scenario
    } else {
      setGameState('results');
      calculateResults();
    }
  };

  const calculateResults = () => {
    const resilientResponses = responses.filter(r => r.type === 'resilient').length;
    const totalResponses = responses.length || stressScenarios.length;
    const baseScore = (resilientResponses / totalResponses) * 100;

    // Bonus pour la rapidité sous pression
    const speedBonus = totalPressure > 80 ? 20 : totalPressure > 50 ? 10 : 0;

    setResilienceScore(Math.min(100, Math.round(baseScore + speedBonus)));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'RÉSISTANT AU STRESS';
    if (score >= 60) return 'RÉSILIENCE MODÉRÉE';
    return 'RÉACTIF SOUS PRESSION';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="section-5" className="min-h-screen py-20 px-4 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Simulation de Stress Extrême
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Testez votre résilience dans des situations de haute pression.
            Vous avez 2 minutes pour gérer 5 crises consécutives !
          </p>
        </motion.div>

        {/* Phase Introduction */}
        {gameState === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-card p-8 text-center"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-learning-primary mb-4">
                Prêt(e) pour le défi ?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-red-50 rounded-xl">
                  <h4 className="font-bold text-red-600 mb-2">⏱️ 2 Minutes</h4>
                  <p className="text-sm text-gray-600">Chronomètre impitoyable</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h4 className="font-bold text-orange-600 mb-2">🔥 5 Crises</h4>
                  <p className="text-sm text-gray-600">Situations extrêmes</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <h4 className="font-bold text-yellow-600 mb-2">⚡ Pression</h4>
                  <p className="text-sm text-gray-600">Choix rapides requis</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8">
                Chaque seconde compte ! Vos réactions seront analysées pour déterminer
                si vous êtes <strong className="text-green-600">résilient</strong> ou
                <strong className="text-red-600"> réactif</strong> sous pression.
              </p>
            </div>

            <motion.button
              onClick={startSimulation}
              className="learning-button text-xl px-12 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 LANCER LA SIMULATION
            </motion.button>
          </motion.div>
        )}

        {/* Phase Jeu */}
        {gameState === 'playing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="learning-card p-8"
          >
            {/* Timer et Progress */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <motion.div
                  className={`text-3xl font-bold ${timeLeft <= 30 ? 'text-red-500' : 'text-learning-primary'}`}
                  animate={timeLeft <= 30 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: timeLeft <= 30 ? Infinity : 0, duration: 1 }}
                >
                  {formatTime(timeLeft)}
                </motion.div>
                <div className="text-sm text-gray-500">
                  Crise {currentScenario + 1}/{stressScenarios.length}
                </div>
              </div>
              <div className="flex space-x-2">
                {stressScenarios.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${
                      index < currentScenario ? 'bg-green-500' :
                      index === currentScenario ? 'bg-red-500 animate-pulse' :
                      'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Scénario actuel */}
            <div className="text-center mb-8">
              <motion.div
                key={currentScenario}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-red-600 mb-2">
                    {stressScenarios[currentScenario].situation}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {stressScenarios[currentScenario].context}
                  </p>
                  <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                    {stressScenarios[currentScenario].urgency}
                  </div>
                </div>

                <div className="grid gap-4 max-w-2xl mx-auto">
                  {stressScenarios[currentScenario].choices.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="p-4 text-left border-2 border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                          {choice.id}
                        </span>
                        <span className="text-gray-700">{choice.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Phase Résultats */}
        {gameState === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-card p-8 text-center"
          >
            <h3 className="text-3xl font-bold text-learning-primary mb-6">
              Analyse de votre résilience
            </h3>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
            >
              <span className={`text-3xl font-bold text-white`}>
                {resilienceScore}%
              </span>
            </motion.div>

            <div className={`text-2xl font-bold mb-8 ${getScoreColor(resilienceScore)}`}>
              {getScoreLabel(resilienceScore)}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-blue-600 mb-2">Choix résilients</h4>
                <div className="text-2xl font-bold">
                  {responses.filter(r => r.type === 'resilient').length}/{responses.length}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-bold text-green-600 mb-2">Pression gérée</h4>
                <div className="text-2xl font-bold">{totalPressure} pts</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <h4 className="font-bold text-purple-600 mb-2">Temps moyen</h4>
                <div className="text-2xl font-bold">
                  {responses.length > 0 ?
                    (responses.reduce((sum, r) => sum + r.responseTime, 0) / responses.length).toFixed(1)
                    : '0'}s
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 bg-learning-accent bg-opacity-20 rounded-xl">
              <h4 className="font-semibold text-learning-primary mb-3">Feedback personnalisé</h4>
              <p className="text-gray-700">
                {resilienceScore >= 80 ?
                  "Excellent ! Vous gardez votre sang-froid même sous pression extrême. Votre capacité à prendre du recul et choisir des réponses constructives est remarquable." :
                  resilienceScore >= 60 ?
                  "Bien ! Vous montrez une résilience correcte, mais vous pourriez encore améliorer votre gestion du stress en vous entraînant à prendre du recul avant de réagir." :
                  "À améliorer ! Sous pression, vous tendez vers des réactions impulsives. Pratiquez les techniques de respiration et de recadrage cognitif pour développer plus de résilience."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startSimulation}
                className="learning-button-secondary px-6 py-3"
              >
                🔄 Rejouer
              </button>
              <button
                onClick={() => {
                  onComplete();
                  onNavigate(6);
                }}
                className="learning-button px-6 py-3"
              >
                Continuer vers le quiz final
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Relational Map Section Component
function RelationalMapSection({ progress, onComplete, onNavigate }: any) {
  const [contacts, setContacts] = useState<Array<{id: string, name: string, relationship: string, supportType: 'emotional' | 'practical' | 'professional', zone: 'unassigned' | 'family' | 'close-friends' | 'colleagues' | 'professionals', position?: {x: number, y: number}}>>([
    { id: '1', name: 'Marie', relationship: 'Mère', supportType: 'emotional', zone: 'unassigned' },
    { id: '2', name: 'Paul', relationship: 'Conjoint(e)', supportType: 'emotional', zone: 'unassigned' },
    { id: '3', name: 'Sophie', relationship: 'Meilleure amie', supportType: 'emotional', zone: 'unassigned' },
    { id: '4', name: 'David', relationship: 'Collègue', supportType: 'professional', zone: 'unassigned' },
    { id: '5', name: 'Dr. Martin', relationship: 'Médecin', supportType: 'professional', zone: 'unassigned' },
    { id: '6', name: 'Lisa', relationship: 'Coach', supportType: 'professional', zone: 'unassigned' },
    { id: '7', name: 'Tom', relationship: 'Ami proche', supportType: 'practical', zone: 'unassigned' },
    { id: '8', name: 'Julie', relationship: 'Manager', supportType: 'professional', zone: 'unassigned' },
    { id: '9', name: 'Alex', relationship: 'Frère/Sœur', supportType: 'emotional', zone: 'unassigned' },
    { id: '10', name: 'Emma', relationship: 'Voisine', supportType: 'practical', zone: 'unassigned' }
  ]);

  const [draggedContact, setDraggedContact] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const supportZones = [
    {
      id: 'family',
      title: 'Famille',
      description: 'Soutien inconditionnel et émotionnel',
      color: 'bg-red-100 border-red-300 text-red-700',
      radius: 120,
      centerOffset: 0
    },
    {
      id: 'close-friends',
      title: 'Amis proches',
      description: 'Complicité et partage',
      color: 'bg-blue-100 border-blue-300 text-blue-700',
      radius: 160,
      centerOffset: 40
    },
    {
      id: 'colleagues',
      title: 'Collègues',
      description: 'Soutien professionnel et collaboration',
      color: 'bg-green-100 border-green-300 text-green-700',
      radius: 200,
      centerOffset: 80
    },
    {
      id: 'professionals',
      title: 'Professionnels',
      description: 'Expertise et conseils spécialisés',
      color: 'bg-purple-100 border-purple-300 text-purple-700',
      radius: 240,
      centerOffset: 120
    }
  ];

  const supportTypeColors = {
    emotional: 'bg-pink-200 border-pink-400 text-pink-800',
    practical: 'bg-orange-200 border-orange-400 text-orange-800',
    professional: 'bg-indigo-200 border-indigo-400 text-indigo-800'
  };

  const handleDragStart = (contactId: string) => {
    setDraggedContact(contactId);
  };

  const handleDragEnd = () => {
    setDraggedContact(null);
    setHoveredZone(null);
  };

  const handleDrop = (zoneId: string) => {
    if (draggedContact) {
      setContacts(prev => prev.map(contact =>
        contact.id === draggedContact
          ? { ...contact, zone: zoneId as any }
          : contact
      ));
    }
    setDraggedContact(null);
    setHoveredZone(null);
  };

  const getContactsInZone = (zoneId: string) => {
    return contacts.filter(contact => contact.zone === zoneId);
  };

  const getUnassignedContacts = () => {
    return contacts.filter(contact => contact.zone === 'unassigned');
  };

  const isCompleted = getUnassignedContacts().length === 0;

  const resetMap = () => {
    setContacts(prev => prev.map(contact => ({ ...contact, zone: 'unassigned' })));
  };

  return (
    <section id="section-6" className="min-h-screen py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-learning-primary mb-6">
            Votre Réseau de Soutien
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cartographiez visuellement votre réseau de soutien en glissant vos contacts
            dans les cercles appropriés selon leur proximité et le type de soutien qu'ils vous apportent.
          </p>
        </motion.div>

        {/* Légende des types de soutien */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="learning-card p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-learning-primary mb-4 text-center">Types de soutien</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-200 border border-pink-400 rounded-full"></div>
              <span className="text-sm font-medium">Émotionnel</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded-full"></div>
              <span className="text-sm font-medium">Pratique</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-indigo-200 border border-indigo-400 rounded-full"></div>
              <span className="text-sm font-medium">Professionnel</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contacts non assignés */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="learning-card p-6"
          >
            <h3 className="text-xl font-bold text-learning-primary mb-4">
              Contacts à organiser ({getUnassignedContacts().length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getUnassignedContacts().map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  draggable
                  onDragStart={() => handleDragStart(contact.id)}
                  onDragEnd={handleDragEnd}
                  className={`p-3 rounded-lg border-2 cursor-move transition-all duration-300 hover:scale-105 ${
                    supportTypeColors[contact.supportType]
                  } ${draggedContact === contact.id ? 'opacity-50 scale-95' : ''}`}
                >
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-xs opacity-75">{contact.relationship}</div>
                </motion.div>
              ))}
            </div>

            {getUnassignedContacts().length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500"
              >
                <div className="text-4xl mb-2">🎉</div>
                <p>Tous vos contacts sont organisés !</p>
              </motion.div>
            )}
          </motion.div>

          {/* Carte relationnelle - Cercles concentriques */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="learning-card p-8 lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-learning-primary mb-6 text-center">
              Carte de votre réseau de soutien
            </h3>

            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Cercles concentriques */}
              {supportZones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`absolute rounded-full border-2 border-dashed transition-all duration-300 ${
                    zone.color
                  } ${hoveredZone === zone.id ? 'border-solid shadow-lg scale-105' : ''}`}
                  style={{
                    width: zone.radius * 2,
                    height: zone.radius * 2,
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHoveredZone(zone.id);
                  }}
                  onDragLeave={() => setHoveredZone(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(zone.id);
                  }}
                >
                  {/* Label du cercle */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="font-bold text-sm">{zone.title}</div>
                    <div className="text-xs opacity-75">{getContactsInZone(zone.id).length} contacts</div>
                  </div>

                  {/* Contacts dans cette zone */}
                  {getContactsInZone(zone.id).map((contact, contactIndex) => {
                    const angle = (contactIndex * 360) / Math.max(getContactsInZone(zone.id).length, 1);
                    const radian = (angle * Math.PI) / 180;
                    const contactRadius = zone.radius - 60;
                    const x = Math.cos(radian) * contactRadius;
                    const y = Math.sin(radian) * contactRadius;

                    return (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: contactIndex * 0.1 }}
                        className={`absolute w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs font-bold cursor-move transition-all duration-300 hover:scale-110 ${
                          supportTypeColors[contact.supportType]
                        }`}
                        style={{
                          left: `calc(50% + ${x}px - 32px)`,
                          top: `calc(50% + ${y}px - 32px)`,
                        }}
                        draggable
                        onDragStart={() => handleDragStart(contact.id)}
                        onDragEnd={handleDragEnd}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-center leading-tight">
                          {contact.name.split(' ')[0]}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}

              {/* Centre "Vous" */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute w-20 h-20 bg-learning-primary text-white rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg"
              >
                Vous
              </motion.div>
            </div>

            {/* Légende des zones */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {supportZones.map((zone) => (
                <div key={zone.id} className={`p-3 rounded-lg text-center ${zone.color}`}>
                  <div className="font-bold text-sm">{zone.title}</div>
                  <div className="text-xs mt-1">{zone.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetMap}
              className="learning-button-secondary px-6 py-3"
            >
              🔄 Réorganiser
            </button>

            {isCompleted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  onComplete();
                  // Navigation vers la fin ou une section de synthèse
                }}
                className="learning-button px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✅ Terminer le module
              </motion.button>
            )}
          </div>

          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-6 bg-green-50 rounded-xl"
            >
              <h4 className="font-bold text-green-700 mb-2">🎉 Félicitations !</h4>
              <p className="text-green-600">
                Vous avez cartographié votre réseau de soutien. Cette visualisation vous aidera
                à mieux identifier vers qui vous tourner selon vos besoins.
              </p>
            </motion.div>
          )}
        </motion.div>
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
