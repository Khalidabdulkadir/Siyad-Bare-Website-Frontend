import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle } from "lucide-react";
import { apiService, GalleryItem } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GalleryImage from "@/components/GalleryImage";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await apiService.getGallery();
        setGalleryItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load gallery. Please try again later.');
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = ["all", ...Array.from(new Set(galleryItems.map((img) => img.category)))];
  const filteredImages = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter((img) => img.category === selectedCategory);

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
        <div className="container mx-auto px-4 max-w-7xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Card className="mt-6 bg-muted/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Sababta:</strong> Ma aadan ku xidhiidhin backend-ka Django ee https://siyad-bare-website-backend.onrender.com
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Fadlan hubi in backend-ku socdo oo URL-ku sax yahay.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Sawir & Fiidiyow Galari
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dukuminti muuqaal ah oo ku saabsan taariikhda qaranka iyada oo loo marayo sawiro iyo fiidiyowyada
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm capitalize"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <GalleryImage 
                src={image.image || 'https://via.placeholder.com/600x450/4189DD/FFFFFF?text=No+Image'}
                title={image.title}
                category={image.category}
                year={image.year}
                description={image.title}
              />
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <Card className="p-12 text-center">
            <CardContent>
              <p className="text-muted-foreground">Ma jiraan sawiro lagu helay qaybtan.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Gallery;
