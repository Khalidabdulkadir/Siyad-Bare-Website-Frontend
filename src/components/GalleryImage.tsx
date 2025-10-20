import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpeg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.webp";

interface GalleryImageProps {
  src: string;
  title: string;
  category: string;
  year: string;
  description: string;
}

const fallbackImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const GalleryImage = ({ src, title, category, year, description }: GalleryImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Use fallback image based on hash of title for consistency
  const fallbackIndex = Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % fallbackImages.length;
  const fallbackSrc = fallbackImages[fallbackIndex];

  const handleImageError = () => {
    console.log('Using fallback image for:', title);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Card className="overflow-hidden hover-lift shadow-card group">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {imageError ? (
          <img 
            src={fallbackSrc} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <img 
            src={src} 
            alt={title}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        
        {!imageError && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Badge className="absolute top-4 right-4 z-10">{category}</Badge>
          </>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="text-xs text-muted-foreground">Sanadka: {year}</p>
      </CardContent>
    </Card>
  );
};

export default GalleryImage;
