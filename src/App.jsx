import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import PromptBuilder from './components/PromptBuilder.jsx';
import Quiz from './components/Quiz.jsx';
import Gallery from './components/Gallery.jsx';
import PromptAnalyzer from './components/PromptAnalyzer.jsx';
import { 
  Palette, 
  Brain, 
  Images, 
  Search, 
  BookOpen, 
  Sparkles, 
  Camera, 
  Brush,
  Zap,
  Users
} from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Interactive Prompt Builder",
      description: "Build perfect Midjourney prompts with our step-by-step tool",
      color: "text-blue-500"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Prompt Analyzer",
      description: "Analyze existing prompts to understand their components",
      color: "text-green-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with module-based quizzes",
      color: "text-purple-500"
    },
    {
      icon: <Images className="w-8 h-8" />,
      title: "Student Gallery",
      description: "Share your creations and get inspired by others",
      color: "text-pink-500"
    }
  ];

  const modules = [
    {
      number: 1,
      title: "Welcome to Midjourney!",
      description: "Learn the basics of AI art generation",
      topics: ["What is Midjourney?", "Basic prompting", "Community guidelines"],
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      number: 2,
      title: "The Power of Words",
      description: "Master advanced prompt engineering",
      topics: ["Descriptive language", "Parameters", "Multi-prompts", "Negative prompting"],
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      number: 3,
      title: "3D Pixar Style",
      description: "Create charming animated characters",
      topics: ["Pixar characteristics", "Character design", "Emotions and poses"],
      icon: <Users className="w-6 h-6" />
    },
    {
      number: 4,
      title: "Photorealism",
      description: "Generate lifelike images",
      topics: ["Realism techniques", "Camera terms", "Lighting control"],
      icon: <Camera className="w-6 h-6" />
    },
    {
      number: 5,
      title: "Watercolor Art",
      description: "Create beautiful flowing artwork",
      topics: ["Watercolor characteristics", "Artistic elements", "Soft techniques"],
      icon: <Brush className="w-6 h-6" />
    },
    {
      number: 6,
      title: "Fine-Tuning Styles",
      description: "Blend styles and develop your voice",
      topics: ["Style blending", "Iteration", "Personal style"],
      icon: <Palette className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Midjourney Mastery
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              An Interactive AI Art Adventure for Young Creators
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              7th Grade Level Course
            </Badge>
          </div>

          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Builder</span>
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-8">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <CardHeader className="text-center py-12">
                <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                  Transform Your Imagination into Art
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Learn to create stunning 3D Pixar characters, photorealistic images, and beautiful watercolor art using the power of AI and advanced prompt engineering.
                </CardDescription>
                <div className="mt-6">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => setActiveTab('builder')}
                    className="mr-4"
                  >
                    Start Creating
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setActiveTab('quiz')}
                    className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    Take a Quiz
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`mx-auto mb-4 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Course Modules */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Course Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <Card key={module.number} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                          {module.icon}
                        </div>
                        <Badge variant="outline">Module {module.number}</Badge>
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {module.topics.map((topic, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setActiveTab('quiz')}
                      >
                        Take Module {module.number} Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-0">
              <CardHeader className="text-center py-8">
                <CardTitle className="text-2xl font-bold mb-2">
                  Ready to Start Your AI Art Journey?
                </CardTitle>
                <CardDescription className="text-green-100 mb-4">
                  Use our interactive tools to build prompts, analyze techniques, and share your creations!
                </CardDescription>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => setActiveTab('builder')}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Prompt Builder
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setActiveTab('gallery')}
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Images className="w-4 h-4 mr-2" />
                    View Gallery
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="builder">
            <PromptBuilder />
          </TabsContent>

          <TabsContent value="analyzer">
            <PromptAnalyzer />
          </TabsContent>

          <TabsContent value="quiz">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Test Your Knowledge</h2>
                <p className="text-gray-600">Choose a module to quiz yourself on:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-auto p-6 flex flex-col items-center gap-2"
                  onClick={() => {/* Could implement module selection */}}
                >
                  <BookOpen className="w-6 h-6" />
                  <span className="font-medium">Module 1 Quiz</span>
                  <span className="text-sm text-gray-500">Midjourney Basics</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-auto p-6 flex flex-col items-center gap-2"
                  onClick={() => {/* Could implement module selection */}}
                >
                  <Sparkles className="w-6 h-6" />
                  <span className="font-medium">Module 2 Quiz</span>
                  <span className="text-sm text-gray-500">Prompt Engineering</span>
                </Button>
              </div>
              <Quiz module={1} />
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <Gallery />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;

