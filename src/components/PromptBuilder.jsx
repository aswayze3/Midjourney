import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Copy, Trash2, Plus } from 'lucide-react';

const PromptBuilder = () => {
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('');
  const [adjectives, setAdjectives] = useState([]);
  const [lighting, setLighting] = useState('');
  const [parameters, setParameters] = useState({
    aspectRatio: '',
    stylize: '',
    version: '',
    quality: ''
  });
  const [negativePrompts, setNegativePrompts] = useState([]);
  const [newAdjective, setNewAdjective] = useState('');
  const [newNegative, setNewNegative] = useState('');

  const styleOptions = [
    { value: '3d-pixar', label: '3D Pixar Style' },
    { value: 'photorealistic', label: 'Photorealistic' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'anime', label: 'Anime' },
    { value: 'oil-painting', label: 'Oil Painting' },
    { value: 'digital-art', label: 'Digital Art' }
  ];

  const lightingOptions = [
    'golden hour lighting',
    'dramatic chiaroscuro lighting',
    'soft diffused light',
    'neon glow',
    'backlit',
    'studio lighting',
    'natural light',
    'cinematic lighting'
  ];

  const addAdjective = () => {
    if (newAdjective.trim() && !adjectives.includes(newAdjective.trim())) {
      setAdjectives([...adjectives, newAdjective.trim()]);
      setNewAdjective('');
    }
  };

  const removeAdjective = (adj) => {
    setAdjectives(adjectives.filter(a => a !== adj));
  };

  const addNegativePrompt = () => {
    if (newNegative.trim() && !negativePrompts.includes(newNegative.trim())) {
      setNegativePrompts([...negativePrompts, newNegative.trim()]);
      setNewNegative('');
    }
  };

  const removeNegativePrompt = (neg) => {
    setNegativePrompts(negativePrompts.filter(n => n !== neg));
  };

  const generatePrompt = () => {
    let prompt = '/imagine prompt ';
    
    // Add subject with adjectives
    if (subject) {
      const adjectiveString = adjectives.length > 0 ? adjectives.join(', ') + ' ' : '';
      prompt += adjectiveString + subject;
    }

    // Add style
    if (style) {
      const styleMap = {
        '3d-pixar': '3D Pixar style',
        'photorealistic': 'photorealistic, hyperrealistic',
        'watercolor': 'watercolor painting, soft colors',
        'anime': 'anime style',
        'oil-painting': 'oil painting',
        'digital-art': 'digital art'
      };
      prompt += ', ' + styleMap[style];
    }

    // Add lighting
    if (lighting) {
      prompt += ', ' + lighting;
    }

    // Add parameters
    const paramArray = [];
    if (parameters.aspectRatio) paramArray.push(`--ar ${parameters.aspectRatio}`);
    if (parameters.stylize) paramArray.push(`--s ${parameters.stylize}`);
    if (parameters.version) paramArray.push(`--v ${parameters.version}`);
    if (parameters.quality) paramArray.push(`--q ${parameters.quality}`);

    // Add negative prompts
    if (negativePrompts.length > 0) {
      paramArray.push(`--no ${negativePrompts.join(', ')}`);
    }

    if (paramArray.length > 0) {
      prompt += ' ' + paramArray.join(' ');
    }

    return prompt;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePrompt());
  };

  const clearAll = () => {
    setSubject('');
    setStyle('');
    setAdjectives([]);
    setLighting('');
    setParameters({ aspectRatio: '', stylize: '', version: '', quality: '' });
    setNegativePrompts([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Midjourney Prompt Builder</CardTitle>
          <CardDescription className="text-center">
            Build your perfect Midjourney prompt step by step!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Main Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., a majestic lion, a cozy cottage, a futuristic robot"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Adjectives */}
          <div className="space-y-2">
            <Label>Descriptive Adjectives</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add descriptive words..."
                value={newAdjective}
                onChange={(e) => setNewAdjective(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAdjective()}
              />
              <Button onClick={addAdjective} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {adjectives.map((adj, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeAdjective(adj)}>
                  {adj} <Trash2 className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="space-y-2">
            <Label>Art Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an art style..." />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lighting */}
          <div className="space-y-2">
            <Label>Lighting</Label>
            <Select value={lighting} onValueChange={setLighting}>
              <SelectTrigger>
                <SelectValue placeholder="Choose lighting..." />
              </SelectTrigger>
              <SelectContent>
                {lightingOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Parameters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={parameters.aspectRatio} onValueChange={(value) => setParameters({...parameters, aspectRatio: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="--ar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="3:2">3:2 (Photo)</SelectItem>
                  <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                  <SelectItem value="2:3">2:3 (Portrait)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Stylize</Label>
              <Input
                placeholder="--s (0-1000)"
                value={parameters.stylize}
                onChange={(e) => setParameters({...parameters, stylize: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Version</Label>
              <Select value={parameters.version} onValueChange={(value) => setParameters({...parameters, version: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="--v" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5.2">5.2</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="6.1">6.1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quality</Label>
              <Select value={parameters.quality} onValueChange={(value) => setParameters({...parameters, quality: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="--q" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.25">0.25</SelectItem>
                  <SelectItem value="0.5">0.5</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Negative Prompts */}
          <div className="space-y-2">
            <Label>Negative Prompts (Things to avoid)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add things to exclude..."
                value={newNegative}
                onChange={(e) => setNewNegative(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNegativePrompt()}
              />
              <Button onClick={addNegativePrompt} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {negativePrompts.map((neg, index) => (
                <Badge key={index} variant="destructive" className="cursor-pointer" onClick={() => removeNegativePrompt(neg)}>
                  {neg} <Trash2 className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Generated Prompt */}
          <div className="space-y-2">
            <Label>Generated Prompt</Label>
            <Textarea
              value={generatePrompt()}
              readOnly
              className="min-h-[100px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompt
              </Button>
              <Button onClick={clearAll} variant="outline">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptBuilder;

