import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Search, Lightbulb, Palette, Camera, Settings } from 'lucide-react';

const PromptAnalyzer = () => {
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzePrompt = () => {
    if (!prompt.trim()) return;

    // Remove /imagine prompt prefix if present
    const cleanPrompt = prompt.replace(/^\/imagine\s+prompt\s+/i, '');
    
    // Split by parameters (anything starting with --)
    const parts = cleanPrompt.split(/\s+--/);
    const mainPrompt = parts[0];
    const parameters = parts.slice(1).map(p => '--' + p);

    // Analyze main prompt components
    const words = mainPrompt.split(/[,\s]+/).filter(w => w.length > 0);
    
    // Categorize words
    const subjects = [];
    const adjectives = [];
    const styles = [];
    const lighting = [];
    const camera = [];
    const other = [];

    // Style keywords
    const styleKeywords = [
      '3d', 'pixar', 'anime', 'watercolor', 'photorealistic', 'hyperrealistic',
      'oil painting', 'digital art', 'sketch', 'cartoon', 'realistic', 'abstract',
      'impressionist', 'surreal', 'cyberpunk', 'steampunk', 'art nouveau'
    ];

    // Lighting keywords
    const lightingKeywords = [
      'lighting', 'light', 'golden hour', 'sunset', 'sunrise', 'dramatic',
      'soft', 'hard', 'natural', 'studio', 'neon', 'backlit', 'rim light',
      'chiaroscuro', 'volumetric', 'ambient', 'diffused', 'cinematic'
    ];

    // Camera keywords
    const cameraKeywords = [
      'shot', 'angle', 'close-up', 'wide', 'macro', 'telephoto', 'fisheye',
      'bokeh', 'depth of field', 'f/', 'mm', 'lens', 'camera', 'photography'
    ];

    // Common adjectives
    const commonAdjectives = [
      'beautiful', 'stunning', 'majestic', 'cute', 'adorable', 'mysterious',
      'ancient', 'modern', 'futuristic', 'vintage', 'elegant', 'rustic',
      'vibrant', 'colorful', 'dark', 'bright', 'small', 'large', 'tiny',
      'huge', 'detailed', 'simple', 'complex', 'smooth', 'rough', 'shiny'
    ];

    words.forEach(word => {
      const lowerWord = word.toLowerCase().replace(/[^\w]/g, '');
      
      if (styleKeywords.some(style => lowerWord.includes(style))) {
        styles.push(word);
      } else if (lightingKeywords.some(light => lowerWord.includes(light))) {
        lighting.push(word);
      } else if (cameraKeywords.some(cam => lowerWord.includes(cam))) {
        camera.push(word);
      } else if (commonAdjectives.includes(lowerWord)) {
        adjectives.push(word);
      } else if (word.length > 2 && !['the', 'and', 'with', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'men', 'put', 'say', 'she', 'too', 'use'].includes(lowerWord)) {
        if (subjects.length < 3) { // Limit subjects to avoid clutter
          subjects.push(word);
        } else {
          other.push(word);
        }
      }
    });

    // Analyze parameters
    const parameterAnalysis = parameters.map(param => {
      const [key, value] = param.split(/\s+/);
      let description = '';
      
      switch (key) {
        case '--ar':
          description = `Aspect ratio: ${value} (controls image shape)`;
          break;
        case '--s':
          description = `Stylize: ${value} (controls artistic interpretation, 0-1000)`;
          break;
        case '--v':
          description = `Version: ${value} (Midjourney model version)`;
          break;
        case '--q':
          description = `Quality: ${value} (rendering quality and speed)`;
          break;
        case '--no':
          description = `Negative prompt: ${value} (elements to avoid)`;
          break;
        case '--chaos':
          description = `Chaos: ${value} (variation in results, 0-100)`;
          break;
        case '--seed':
          description = `Seed: ${value} (for reproducible results)`;
          break;
        case '--style':
          description = `Style: ${value} (style modifier)`;
          break;
        default:
          description = `${key}: ${value}`;
      }
      
      return { param: key, value, description };
    });

    // Generate suggestions
    const suggestions = [];
    
    if (subjects.length === 0) {
      suggestions.push("Consider adding a clear main subject (e.g., 'a cat', 'a castle', 'a person')");
    }
    
    if (adjectives.length === 0) {
      suggestions.push("Add descriptive adjectives to make your subject more specific (e.g., 'majestic', 'cute', 'ancient')");
    }
    
    if (styles.length === 0) {
      suggestions.push("Specify an art style (e.g., '3D Pixar style', 'watercolor painting', 'photorealistic')");
    }
    
    if (lighting.length === 0) {
      suggestions.push("Consider adding lighting description (e.g., 'golden hour lighting', 'soft natural light')");
    }
    
    if (!parameters.some(p => p.startsWith('--ar'))) {
      suggestions.push("Add aspect ratio parameter (e.g., '--ar 16:9' for widescreen, '--ar 1:1' for square)");
    }

    setAnalysis({
      subjects,
      adjectives,
      styles,
      lighting,
      camera,
      other,
      parameters: parameterAnalysis,
      suggestions,
      wordCount: words.length,
      complexity: words.length > 20 ? 'High' : words.length > 10 ? 'Medium' : 'Low'
    });
  };

  const examplePrompts = [
    "/imagine prompt a majestic dragon perched on a mountain peak, 3D Pixar style, golden hour lighting, cinematic shot --ar 16:9 --s 300",
    "/imagine prompt a cozy coffee shop interior, photorealistic, warm lighting, steam rising from coffee cup, bokeh background --ar 4:3 --v 5.2",
    "/imagine prompt a cute robot holding a flower, watercolor painting, soft pastel colors, dreamy atmosphere --ar 1:1 --s 400"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Prompt Analyzer</CardTitle>
          <CardDescription className="text-center">
            Analyze your Midjourney prompts to understand their components and get improvement suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter your Midjourney prompt:</label>
            <Textarea
              placeholder="Paste your prompt here... (e.g., /imagine prompt a majestic lion, 3D Pixar style, golden hour lighting --ar 16:9)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] font-mono text-sm"
            />
          </div>

          <Button onClick={analyzePrompt} disabled={!prompt.trim()} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Analyze Prompt
          </Button>

          {/* Example prompts */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Try these example prompts:</label>
            <div className="space-y-2">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(example)}
                  className="w-full text-left justify-start h-auto p-3 font-mono text-xs"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Components Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Prompt Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Word Count:</span> {analysis.wordCount}
                </div>
                <div>
                  <span className="font-medium">Complexity:</span> {analysis.complexity}
                </div>
              </div>

              <Separator />

              {analysis.subjects.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Main Subjects:</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.subjects.map((subject, index) => (
                      <Badge key={index} variant="default">{subject}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.adjectives.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Descriptive Words:</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.adjectives.map((adj, index) => (
                      <Badge key={index} variant="secondary">{adj}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.styles.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Art Styles:</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.styles.map((style, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800">{style}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.lighting.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Lighting:</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.lighting.map((light, index) => (
                      <Badge key={index} className="bg-yellow-100 text-yellow-800">{light}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.camera.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Camera/Photography:</h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.camera.map((cam, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">{cam}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Parameters and Suggestions */}
          <div className="space-y-6">
            {/* Parameters */}
            {analysis.parameters.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.parameters.map((param, index) => (
                    <div key={index} className="space-y-1">
                      <div className="font-mono text-sm font-medium">{param.param} {param.value}</div>
                      <div className="text-xs text-muted-foreground">{param.description}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.suggestions.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600">Great prompt! It has all the essential components.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptAnalyzer;

