import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Heart, MessageCircle, Share2, Plus, Filter } from 'lucide-react';

const Gallery = () => {
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Mystical Forest Guardian",
      prompt: "/imagine prompt a majestic dragon perched on ancient tree, 3D Pixar style, golden hour lighting, magical atmosphere --ar 16:9 --s 300",
      style: "3D Pixar",
      author: "Student Artist",
      likes: 24,
      comments: 8,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "My first attempt at creating a Pixar-style character! I wanted to combine the friendly look of Pixar with the majesty of a dragon."
    },
    {
      id: 2,
      title: "Serene Mountain Lake",
      prompt: "/imagine prompt a peaceful mountain lake at sunrise, watercolor painting, soft pastel colors, misty atmosphere --ar 3:2 --s 400",
      style: "Watercolor",
      author: "Nature Lover",
      likes: 18,
      comments: 5,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "Inspired by a camping trip last summer. I love how the watercolor style captures the peaceful feeling of early morning by the lake."
    },
    {
      id: 3,
      title: "Vintage Coffee Shop",
      prompt: "/imagine prompt cozy vintage coffee shop interior, photorealistic, warm lighting, steam rising from coffee cup, bokeh background --ar 4:3 --v 5.2",
      style: "Photorealistic",
      author: "Coffee Enthusiast",
      likes: 31,
      comments: 12,
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      description: "Trying to capture the perfect coffee shop atmosphere. The challenge was getting the steam and lighting just right!"
    },
    {
      id: 4,
      title: "Cute Robot Friend",
      prompt: "/imagine prompt a friendly small robot, 3D Pixar style, big expressive eyes, holding a flower, pastel colors --ar 1:1 --s 250",
      style: "3D Pixar",
      author: "Robot Fan",
      likes: 42,
      comments: 15,
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      description: "I wanted to create a robot that felt warm and friendly, like it could be a character in a Pixar movie about friendship."
    }
  ]);

  const [filterStyle, setFilterStyle] = useState('all');
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    prompt: '',
    style: '',
    description: '',
    imageUrl: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const styles = ['3D Pixar', 'Photorealistic', 'Watercolor', 'Anime', 'Oil Painting', 'Digital Art'];

  const filteredArtworks = filterStyle === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.style === filterStyle);

  const handleLike = (id) => {
    setArtworks(artworks.map(artwork => 
      artwork.id === id 
        ? { ...artwork, likes: artwork.likes + 1 }
        : artwork
    ));
  };

  const handleSubmitArtwork = () => {
    if (newArtwork.title && newArtwork.prompt && newArtwork.style) {
      const artwork = {
        id: artworks.length + 1,
        ...newArtwork,
        author: "You",
        likes: 0,
        comments: 0,
        imageUrl: newArtwork.imageUrl || "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"
      };
      setArtworks([artwork, ...artworks]);
      setNewArtwork({ title: '', prompt: '', style: '', description: '', imageUrl: '' });
      setIsDialogOpen(false);
    }
  };

  const getStyleColor = (style) => {
    const colors = {
      '3D Pixar': 'bg-blue-100 text-blue-800',
      'Photorealistic': 'bg-green-100 text-green-800',
      'Watercolor': 'bg-purple-100 text-purple-800',
      'Anime': 'bg-pink-100 text-pink-800',
      'Oil Painting': 'bg-orange-100 text-orange-800',
      'Digital Art': 'bg-gray-100 text-gray-800'
    };
    return colors[style] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Gallery</h1>
          <p className="text-muted-foreground">Share and discover amazing Midjourney creations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Share Your Art
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Artwork</DialogTitle>
              <DialogDescription>
                Show off your Midjourney creation to the community!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your artwork a name..."
                  value={newArtwork.title}
                  onChange={(e) => setNewArtwork({...newArtwork, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select value={newArtwork.style} onValueChange={(value) => setNewArtwork({...newArtwork, style: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a style..." />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Midjourney Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Paste your full Midjourney prompt here..."
                  value={newArtwork.prompt}
                  onChange={(e) => setNewArtwork({...newArtwork, prompt: e.target.value})}
                  className="min-h-[80px] font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your creation process..."
                  value={newArtwork.description}
                  onChange={(e) => setNewArtwork({...newArtwork, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/your-image.jpg"
                  value={newArtwork.imageUrl}
                  onChange={(e) => setNewArtwork({...newArtwork, imageUrl: e.target.value})}
                />
              </div>

              <Button onClick={handleSubmitArtwork} className="w-full">
                Share Artwork
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="w-4 h-4" />
        <Select value={filterStyle} onValueChange={setFilterStyle}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {styles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{artwork.title}</CardTitle>
                <Badge className={getStyleColor(artwork.style)}>
                  {artwork.style}
                </Badge>
              </div>
              <CardDescription>by {artwork.author}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {artwork.description && (
                <p className="text-sm text-muted-foreground">{artwork.description}</p>
              )}
              
              <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                {artwork.prompt}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(artwork.id)}
                    className="flex items-center gap-1"
                  >
                    <Heart className="w-4 h-4" />
                    {artwork.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {artwork.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artworks found for the selected style.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;

