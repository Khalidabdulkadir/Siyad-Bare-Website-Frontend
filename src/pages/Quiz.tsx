import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, RotateCcw, Loader2, AlertCircle } from "lucide-react";
import { apiService, QuizQuestion } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await apiService.getQuiz();
        setQuestions(data);
        setAnswers(new Array(data.length).fill(null));
        setError(null);
      } catch (err) {
        setError('Failed to load quiz questions. Please try again later.');
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmit = () => {
    const calculatedScore = answers.reduce((acc, answer, index) => {
      if (answer === questions[index].correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(calculatedScore);
    setShowResult(true);

    toast({
      title: "Quiz Completed!",
      description: `You scored ${calculatedScore} out of ${questions.length}`,
    });
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No quiz questions available at the moment.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Iska Tijaabi Aqoontaada
          </h1>
          <p className="text-xl text-muted-foreground">
            Is-cabbir su'aalo ku saabsan taariikhda Soomaaliya
          </p>
        </motion.div>

        {!showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    Su'aal {currentQuestion + 1} ee {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {Math.round(progress)}% Dhamays
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <CardTitle className="text-2xl mt-6">{currentQ.question}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex-1"
                  >
                    Hore
                  </Button>

                  {currentQuestion < questions.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="flex-1"
                    >
                      Xiga
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={answers.some(a => a === null)}
                      className="flex-1"
                    >
                      Soo Dir Imtixaanka
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-serif mb-4">Imtixaanka Dhammaystiran!</CardTitle>
                <div className="text-6xl font-bold text-primary mb-2">
                  {score} / {questions.length}
                </div>
                <p className="text-muted-foreground">
                  {score === questions.length
                    ? "Dhibco kaamil ah! Aqoon fiican ayaad leedahay!"
                    : score >= questions.length * 0.7
                    ? "Shaqo wanaagsan! Taariikhda aad baad u taqaanaa!"
                    : "Dedaal wanaagsan! Sii wad barashada!"}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {questions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.correct_answer;

                  return (
                    <div key={q.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold mb-2">{q.question}</p>
                          <p className="text-sm text-muted-foreground">
                            Jawaabkaaga: {userAnswer !== null ? q.options[userAnswer] : "Lama jawaaban"}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600">
                              Jawaabta saxda ah: {q.options[q.correct_answer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Button onClick={handleReset} className="w-full" size="lg">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Ku Celi Imtixaanka
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
