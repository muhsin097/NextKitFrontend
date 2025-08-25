/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Brain,
  User,
  Clock,
  Award,
  Star,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

const IQTesterApp = () => {
  const [currentStep, setCurrentStep] = useState("welcome"); // welcome, userInfo, test, results
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<any>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const shuffleArray = (
    array: {
      id: number;
      question: string;
      options: string[];
      correct: number;
      type: string;
      difficulty: string;
      marks: number;
    }[]
  ) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const unShuffled = [
    // Pattern Recognition - Easy to Hard
    {
      id: 1,
      question: "What comes next in the sequence: 2, 4, 8, 16, ?",
      options: ["24", "32", "20", "28"],
      correct: 1,
      type: "Pattern Recognition",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 2,
      question: "Complete the pattern: □ ○ △ □ ○ ?",
      options: ["□", "○", "△", "◇"],
      correct: 2,
      type: "Pattern Recognition",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 3,
      question: "What comes next: A, D, G, J, ?",
      options: ["K", "L", "M", "N"],
      correct: 2,
      type: "Pattern Recognition",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 4,
      question: "Complete the sequence: 1, 4, 9, 16, 25, ?",
      options: ["30", "35", "36", "49"],
      correct: 2,
      type: "Pattern Recognition",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 5,
      question: "What number completes the pattern? 2, 6, 18, 54, ?",
      options: ["108", "162", "216", "120"],
      correct: 1,
      type: "Pattern Recognition",
      difficulty: "Hard",
      marks: 3,
    },

    // Logic - Easy to Hard
    {
      id: 6,
      question:
        "If all roses are flowers and some flowers are red, which statement is definitely true?",
      options: [
        "All roses are red",
        "Some roses might be red",
        "No roses are red",
        "All flowers are roses",
      ],
      correct: 1,
      type: "Logic",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 7,
      question:
        "If 5 machines make 5 widgets in 5 minutes, how long would it take 100 machines to make 100 widgets?",
      options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
      correct: 0,
      type: "Logic",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 8,
      question:
        "In a race, you overtake the person in 2nd place. What position are you in now?",
      options: ["1st place", "2nd place", "3rd place", "It depends"],
      correct: 1,
      type: "Logic",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 9,
      question:
        "A bat and ball cost $1.10 total. The bat costs $1 more than the ball. How much does the ball cost?",
      options: ["$0.10", "$0.05", "$0.55", "$1.05"],
      correct: 1,
      type: "Logic",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 10,
      question:
        "You have 12 balls, 11 identical and 1 different weight. Using a balance scale only 3 times, how can you find the different ball?",
      options: [
        "Impossible",
        "Divide into groups of 4",
        "Weigh all at once",
        "Random selection",
      ],
      correct: 1,
      type: "Logic",
      difficulty: "Hard",
      marks: 3,
    },

    // Mathematical
    {
      id: 11,
      question: "What is 15% of 80?",
      options: ["10", "12", "15", "20"],
      correct: 1,
      type: "Mathematical",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 12,
      question: "If x + 3 = 12, what is x?",
      options: ["6", "9", "15", "3"],
      correct: 1,
      type: "Mathematical",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 13,
      question:
        "What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "13", "15", "12"],
      correct: 1,
      type: "Mathematical",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 14,
      question:
        "A car travels 60 miles in 1.5 hours. What is its average speed?",
      options: ["30 mph", "40 mph", "45 mph", "50 mph"],
      correct: 1,
      type: "Mathematical",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 15,
      question: "If log₂(x) = 5, what is x?",
      options: ["10", "25", "32", "64"],
      correct: 2,
      type: "Mathematical",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 16,
      question: "What is the derivative of x³ + 2x² - 5x + 7?",
      options: [
        "3x² + 4x - 5",
        "x⁴ + 2x³ - 5x²",
        "3x² + 4x + 7",
        "3x² + 2x - 5",
      ],
      correct: 0,
      type: "Mathematical",
      difficulty: "Hard",
      marks: 3,
    },

    // Verbal Reasoning
    {
      id: 17,
      question: "Complete the analogy: Book is to Reading as Fork is to ?",
      options: ["Kitchen", "Eating", "Metal", "Plate"],
      correct: 1,
      type: "Verbal Reasoning",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 18,
      question: "Which word does NOT belong with the others?",
      options: ["Triangle", "Rectangle", "Circle", "Angle"],
      correct: 3,
      type: "Verbal Reasoning",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 19,
      question: "Ocean is to Water as Desert is to ?",
      options: ["Hot", "Sand", "Dry", "Camel"],
      correct: 1,
      type: "Verbal Reasoning",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 20,
      question:
        "Choose the word that best completes the analogy: Ephemeral is to Permanent as ? is to Certain",
      options: ["Doubtful", "Confident", "Probable", "Absolute"],
      correct: 0,
      type: "Verbal Reasoning",
      difficulty: "Hard",
      marks: 3,
    },

    // Spatial Reasoning
    {
      id: 21,
      question:
        "If you rotate a square 45 degrees, what shape does it appear to be?",
      options: ["Rectangle", "Diamond", "Circle", "Triangle"],
      correct: 1,
      type: "Spatial Reasoning",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 22,
      question: "How many faces does a cube have?",
      options: ["4", "6", "8", "12"],
      correct: 1,
      type: "Spatial Reasoning",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 23,
      question:
        "If you fold a piece of paper in half twice, then cut a hole in the center, how many holes will there be when unfolded?",
      options: ["1", "2", "4", "8"],
      correct: 2,
      type: "Spatial Reasoning",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 24,
      question:
        "A cube is painted red on all faces, then cut into 27 smaller cubes. How many small cubes have exactly 2 red faces?",
      options: ["8", "12", "6", "4"],
      correct: 1,
      type: "Spatial Reasoning",
      difficulty: "Hard",
      marks: 3,
    },

    // Classification
    {
      id: 25,
      question: "Which one doesn't belong: Apple, Orange, Banana, Carrot?",
      options: ["Apple", "Orange", "Banana", "Carrot"],
      correct: 3,
      type: "Classification",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 26,
      question:
        "Which word is the odd one out: Whisper, Shout, Mumble, Silence?",
      options: ["Whisper", "Shout", "Mumble", "Silence"],
      correct: 3,
      type: "Classification",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 27,
      question: "Which number is different from the others: 49, 36, 64, 50?",
      options: ["49", "36", "64", "50"],
      correct: 3,
      type: "Classification",
      difficulty: "Medium",
      marks: 2,
    },

    // Complex Logic
    {
      id: 28,
      question:
        "If some Bloops are Razzles and all Razzles are Lazzles, then some Bloops are definitely what?",
      options: ["Lazzles", "Not Lazzles", "Razzles", "Cannot be determined"],
      correct: 0,
      type: "Complex Logic",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 29,
      question:
        "In a group of 100 people, 70 like chocolate, 80 like vanilla. What's the minimum number who like both?",
      options: ["50", "60", "70", "30"],
      correct: 0,
      type: "Complex Logic",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 30,
      question:
        "You're in a room with 3 light switches. One controls a light in another room. You can flip switches but only visit the other room once. How do you determine which switch controls the light?",
      options: [
        "Impossible",
        "Flip first switch, wait, flip second, go check",
        "Random guessing",
        "Flip all switches",
      ],
      correct: 1,
      type: "Complex Logic",
      difficulty: "Hard",
      marks: 3,
    },

    // Advanced Math
    {
      id: 31,
      question:
        "What is the sum of the infinite series: 1 + 1/2 + 1/4 + 1/8 + ... ?",
      options: ["1", "2", "∞", "1.5"],
      correct: 1,
      type: "Advanced Math",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 32,
      question: "If f(x) = 2x + 3 and g(x) = x², what is f(g(2))?",
      options: ["11", "14", "19", "7"],
      correct: 0,
      type: "Advanced Math",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 33,
      question:
        "What is the probability of getting exactly 2 heads in 4 coin flips?",
      options: ["1/4", "3/8", "1/2", "1/8"],
      correct: 1,
      type: "Advanced Math",
      difficulty: "Hard",
      marks: 3,
    },

    // Memory & Attention
    {
      id: 34,
      question:
        "Study this sequence for 5 seconds: 7, 3, 9, 1, 5, 8, 2. What was the 4th number?",
      options: ["9", "1", "5", "3"],
      correct: 1,
      type: "Memory",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 35,
      question: "How many letters are in the word 'ENCYCLOPEDIA'?",
      options: ["11", "12", "13", "14"],
      correct: 1,
      type: "Attention",
      difficulty: "Medium",
      marks: 2,
    },

    // Abstract Reasoning
    {
      id: 36,
      question: "If ◆ + ◆ = ◇ and ◇ + ◆ = ▲, then ◆ + ▲ = ?",
      options: ["◆◆◆", "◇◇", "◆◇", "Cannot determine"],
      correct: 1,
      type: "Abstract Reasoning",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 37,
      question: "In the pattern ★☆★☆★?, what comes next?",
      options: ["★", "☆", "★☆", "Nothing"],
      correct: 1,
      type: "Abstract Reasoning",
      difficulty: "Medium",
      marks: 2,
    },

    // Word Problems
    {
      id: 38,
      question:
        "A train leaves Station A at 9 AM traveling 60 mph. Another train leaves Station B at 10 AM traveling 80 mph toward Station A. If the stations are 280 miles apart, when do they meet?",
      options: ["11 AM", "12 PM", "1 PM", "2 PM"],
      correct: 1,
      type: "Word Problems",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 39,
      question:
        "If it takes 6 people 6 hours to dig 6 holes, how long does it take 12 people to dig 12 holes?",
      options: ["6 hours", "12 hours", "3 hours", "24 hours"],
      correct: 0,
      type: "Word Problems",
      difficulty: "Medium",
      marks: 2,
    },

    // Logical Sequences
    {
      id: 40,
      question: "What comes next: Monday, Wednesday, Friday, ?",
      options: ["Saturday", "Sunday", "Tuesday", "Thursday"],
      correct: 1,
      type: "Logical Sequences",
      difficulty: "Medium",
      marks: 2,
    },
    {
      id: 41,
      question: "Continue the pattern: Z, Y, X, W, V, ?",
      options: ["U", "T", "S", "R"],
      correct: 0,
      type: "Logical Sequences",
      difficulty: "Easy",
      marks: 1,
    },
    {
      id: 42,
      question: "What's next: 2, 3, 5, 7, 11, 13, ?",
      options: ["15", "17", "19", "21"],
      correct: 1,
      type: "Logical Sequences",
      difficulty: "Medium",
      marks: 2,
    },

    // Advanced Logic Puzzles
    {
      id: 43,
      question:
        "Three friends have ages that multiply to 36 and add to 13. The oldest is only 1 year older than the middle. What are their ages?",
      options: ["2, 6, 6", "1, 4, 9", "3, 3, 4", "2, 2, 9"],
      correct: 3,
      type: "Logic Puzzles",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 44,
      question:
        "You have 9 balls that look identical. 8 weigh the same, 1 is heavier. Using a balance scale only twice, how do you find the heavy ball?",
      options: [
        "Impossible",
        "Divide into groups of 3",
        "Weigh 4 vs 4",
        "Random selection",
      ],
      correct: 1,
      type: "Logic Puzzles",
      difficulty: "Hard",
      marks: 3,
    },

    // Pattern Completion
    {
      id: 45,
      question: "If the pattern is: 1, 11, 21, 1211, 111221, what comes next?",
      options: ["312211", "13112221", "1113213211", "31121211"],
      correct: 0,
      type: "Pattern Completion",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 46,
      question: "Complete: AZ, BY, CX, DW, ?",
      options: ["EV", "FU", "EW", "FV"],
      correct: 0,
      type: "Pattern Completion",
      difficulty: "Medium",
      marks: 2,
    },

    // Lateral Thinking
    {
      id: 47,
      question:
        "A man lives on the 20th floor. Every morning he takes the elevator down. When he comes home, he takes the elevator to the 10th floor and walks the rest, except on rainy days when he takes it all the way up. Why?",
      options: [
        "Exercise routine",
        "He's short and needs umbrella to reach button",
        "Elevator maintenance",
        "He likes the view",
      ],
      correct: 1,
      type: "Lateral Thinking",
      difficulty: "Hard",
      marks: 3,
    },

    // Number Theory
    {
      id: 48,
      question: "What is the next prime number after 97?",
      options: ["99", "101", "103", "107"],
      correct: 1,
      type: "Number Theory",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 49,
      question:
        "If you multiply all numbers from 1 to 100, how many trailing zeros will the result have?",
      options: ["20", "24", "25", "30"],
      correct: 1,
      type: "Number Theory",
      difficulty: "Hard",
      marks: 3,
    },
    {
      id: 50,
      question: "What is the greatest common divisor of 48 and 18?",
      options: ["2", "6", "12", "3"],
      correct: 1,
      type: "Number Theory",
      difficulty: "Medium",
      marks: 2,
    },
  ];

  const [questions, setQuestions] = useState(() =>
    shuffleArray(unShuffled).slice(0, 20)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (currentStep === "test" && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep, startTime]);

  const calculateIQ = () => {
    let correctAnswers = 0;

    Object.entries(answers).forEach(([qIndex, answer]) => {
      if (questions[Number(qIndex)].correct === answer) {
        correctAnswers++;
      }
    });

    const percentage = (correctAnswers / questions.length) * 100;
    const baseIQ = 100;
    const iqScore = Math.round(baseIQ + (percentage - 60) * 0.8);

    return {
      score: Math.max(70, Math.min(160, iqScore)),
      correctAnswers,
      totalQuestions: questions.length,
      percentage: Math.round(percentage),
    };
  };

  const getIQCategory = (score: number) => {
    if (score >= 130)
      return {
        category: "Superior",
        color: "text-purple-600",
        description: "Exceptional intelligence",
      };
    if (score >= 120)
      return {
        category: "Above Average",
        color: "text-blue-600",
        description: "Well above average",
      };
    if (score >= 110)
      return {
        category: "High Average",
        color: "text-green-600",
        description: "Above average intelligence",
      };
    if (score >= 90)
      return {
        category: "Average",
        color: "text-gray-600",
        description: "Average intelligence",
      };
    if (score >= 80)
      return {
        category: "Low Average",
        color: "text-yellow-600",
        description: "Below average",
      };
    return {
      category: "Below Average",
      color: "text-red-600",
      description: "Significantly below average",
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep("results");
    }
  };

  const startTest = () => {
    setQuestions(shuffleArray(unShuffled).slice(0, 20));
    setCurrentStep("test");
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setAnswers({});
    setTimeElapsed(0);
  };

  const restartTest = () => {
    setCurrentStep("welcome");
    setUserInfo({ name: "", age: "", gender: "" });
    setCurrentQuestion(0);
    setAnswers({});
    setTimeElapsed(0);
    setStartTime(null);
  };

  if (currentStep === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-full">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              IQ Tester
            </h1>

            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Discover your cognitive abilities with our comprehensive
              intelligence assessment. Test your logical reasoning, pattern
              recognition, and problem-solving skills.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8 text-purple-100">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-300" />
                <div className="font-semibold">15 Questions</div>
                <div className="text-sm opacity-80">Comprehensive test</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Star className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="font-semibold">Multiple Categories</div>
                <div className="text-sm opacity-80">Logic, math, patterns</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Award className="w-8 h-8 mx-auto mb-2 text-green-300" />
                <div className="font-semibold">Instant Results</div>
                <div className="text-sm opacity-80">Get your IQ score</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("userInfo")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
            >
              Begin Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "userInfo") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-3 rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Tell us about yourself
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-purple-200 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2 font-medium">
                  Age
                </label>
                <input
                  type="number"
                  value={userInfo.age}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, age: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-2 font-medium">
                  Gender
                </label>
                <select
                  value={userInfo.gender}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, gender: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <button
              onClick={startTest}
              disabled={!userInfo.name || !userInfo.age || !userInfo.gender}
              className="w-full mt-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300"
            >
              Start IQ Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "test") {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <span className="text-sm opacity-80">Question</span>
                <span className="text-2xl font-bold ml-2">
                  {currentQuestion + 1}
                </span>
                <span className="text-lg opacity-80">/{questions.length}</span>
              </div>
              <div className="text-white text-right">
                <div className="text-sm opacity-80">Time Elapsed</div>
                <div className="text-xl font-bold">
                  {formatTime(timeElapsed)}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="mb-4">
              <span className="inline-block bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                {currentQ.type}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-8 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="grid gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`p-4 rounded-xl text-left text-lg font-medium transition-all duration-200 border-2 ${
                    answers[currentQuestion] === index
                      ? "bg-purple-500/30 border-purple-400 text-white"
                      : "bg-white/5 border-white/20 text-purple-100 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="font-bold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() =>
                  currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)
                }
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={answers[currentQuestion] === undefined}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Test"
                  : "Next Question"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "results") {
    const results = calculateIQ();
    const category = getIQCategory(results.score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-full">
                  <Award className="w-16 h-16 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-2">
                Test Complete!
              </h1>
              <p className="text-purple-200 text-lg">
                Congratulations {userInfo.name}, here are your results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* IQ Score */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Your IQ Score
                </h3>
                <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-2">
                  {results.score}
                </div>
                <div className={`text-lg font-semibold mb-2 ${category.color}`}>
                  {category.category}
                </div>
                <p className="text-purple-200 text-sm">
                  {category.description}
                </p>
              </div>

              {/* Performance Stats */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Performance Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Correct Answers:</span>
                    <span className="text-white font-semibold">
                      {results.correctAnswers}/{results.totalQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Accuracy:</span>
                    <span className="text-white font-semibold">
                      {results.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Time Taken:</span>
                    <span className="text-white font-semibold">
                      {formatTime(timeElapsed)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Age:</span>
                    <span className="text-white font-semibold">
                      {userInfo.age} years
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <button
                onClick={restartTest}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Take Test Again
              </button>

              <p className="text-purple-200 text-sm mt-4">
                This is an informal assessment for entertainment purposes and
                should not be considered a professional evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default IQTesterApp;
