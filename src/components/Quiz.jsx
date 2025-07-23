import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const Quiz = ({ module = 1 }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quizData = {
    1: {
      title: "Module 1: Welcome to Midjourney!",
      questions: [
        {
          question: "What is Midjourney?",
          options: [
            "A photo editing software",
            "An AI program that creates images from text descriptions",
            "A social media platform",
            "A drawing tablet"
          ],
          correct: 1,
          explanation: "Midjourney is an AI program that uses artificial intelligence to generate images from text descriptions (prompts)."
        },
        {
          question: "Which platform does Midjourney use for its interface?",
          options: [
            "Instagram",
            "Twitter",
            "Discord",
            "Facebook"
          ],
          correct: 2,
          explanation: "Midjourney operates through Discord, a chat platform where users can send commands to the Midjourney bot."
        },
        {
          question: "What command do you use to create an image in Midjourney?",
          options: [
            "/create",
            "/imagine",
            "/generate",
            "/draw"
          ],
          correct: 1,
          explanation: "The /imagine command is used to tell Midjourney to create an image based on your prompt."
        },
        {
          question: "What do the 'U' buttons do in Midjourney?",
          options: [
            "Undo the last action",
            "Upload an image",
            "Upscale (make larger) a selected image",
            "Update the prompt"
          ],
          correct: 2,
          explanation: "The U buttons (U1, U2, U3, U4) upscale the corresponding image from the grid, making it larger and more detailed."
        },
        {
          question: "What should you avoid when creating prompts in Midjourney?",
          options: [
            "Using descriptive adjectives",
            "Creating violent or inappropriate content",
            "Adding lighting descriptions",
            "Using specific art styles"
          ],
          correct: 1,
          explanation: "Midjourney has community guidelines that prohibit creating violent, inappropriate, or harmful content."
        }
      ]
    },
    2: {
      title: "Module 2: The Power of Words (Prompt Engineering)",
      questions: [
        {
          question: "What does the '--ar' parameter control?",
          options: [
            "Art style",
            "Aspect ratio (image shape)",
            "Artist reference",
            "Animation rate"
          ],
          correct: 1,
          explanation: "The --ar parameter controls the aspect ratio, which determines the shape of your image (square, wide, tall, etc.)."
        },
        {
          question: "How do you separate different concepts in a multi-prompt?",
          options: [
            "Use commas",
            "Use semicolons",
            "Use double colons (::)",
            "Use periods"
          ],
          correct: 2,
          explanation: "Double colons (::) are used to separate different concepts in multi-prompts, telling Midjourney to treat them as distinct elements."
        },
        {
          question: "What does adding '::2' after a prompt element do?",
          options: [
            "Makes it appear twice",
            "Gives it double weight/importance",
            "Creates two versions",
            "Doubles the image size"
          ],
          correct: 1,
          explanation: "Adding ::2 gives that element double weight, making it more important and prominent in the final image."
        },
        {
          question: "What is the purpose of the '--no' parameter?",
          options: [
            "To say no to generating an image",
            "To remove unwanted elements from the image",
            "To create a negative image",
            "To reduce image quality"
          ],
          correct: 1,
          explanation: "The --no parameter is used for negative prompting, telling Midjourney what you don't want to appear in your image."
        },
        {
          question: "Which of these is a good example of descriptive language for AI?",
          options: [
            "a thing",
            "a majestic, ancient oak tree with golden sunlight filtering through its leaves",
            "tree",
            "plant"
          ],
          correct: 1,
          explanation: "Descriptive language with specific adjectives and details helps Midjourney create more accurate and interesting images."
        }
      ]
    }
  };

  const currentQuiz = quizData[module] || quizData[1];
  const totalQuestions = currentQuiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: parseInt(value)
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return "Excellent work! You've mastered this module!";
    if (percentage >= 60) return "Good job! You might want to review a few concepts.";
    return "Keep studying! Review the module and try again.";
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
            <CardDescription>{currentQuiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {score}/{totalQuestions}
              </div>
              <div className="text-lg text-muted-foreground">
                {Math.round((score / totalQuestions) * 100)}% Correct
              </div>
              <div className="mt-2 text-sm">
                {getScoreMessage()}
              </div>
            </div>

            <div className="space-y-4">
              {currentQuiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{question.question}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Your answer: {question.options[userAnswer]}
                        </div>
                        {!isCorrect && (
                          <div className="text-sm text-green-600 mt-1">
                            Correct answer: {question.options[question.correct]}
                          </div>
                        )}
                        <div className="text-sm text-blue-600 mt-2">
                          {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button onClick={resetQuiz} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = currentQuiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-xl">{currentQuiz.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={handleAnswerSelect}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="w-full"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

