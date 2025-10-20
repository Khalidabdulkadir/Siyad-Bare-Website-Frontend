import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, FileText, Loader2, AlertCircle } from "lucide-react";
import { apiService, Speech } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Speeches = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);

  useEffect(() => {
    const fetchSpeeches = async () => {
      try {
        setLoading(true);
        const data = await apiService.getSpeeches();
        setSpeeches(data);
        setError(null);
      } catch (err) {
        setError('Failed to load speeches. Please try again later.');
        console.error('Error fetching speeches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeeches();
  }, []);

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
        <div className="container mx-auto px-4 max-w-6xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Khudbaduhu Taariikhiga ah & Xigashada
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dhagayso oo akhri erayada xooggan ee qaabay qaran
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {speeches.map((speech, index) => (
            <motion.div
              key={speech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-4">
                    <span className="font-serif text-2xl">{speech.title}</span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {speech.year}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-4">
                    {speech.transcript}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      onClick={() => setSelectedSpeech(speech)}
                      className="flex-1"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Akhri Qoraalka Buuxa
                    </Button>
                    
                    {speech.audio && (
                      <Button variant="secondary" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Ciyaar Codka
                    </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedSpeech} onOpenChange={() => setSelectedSpeech(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {selectedSpeech?.title}
              </DialogTitle>
              <p className="text-muted-foreground">{selectedSpeech?.year}</p>
            </DialogHeader>
            
            {selectedSpeech?.audio && (
              <div className="my-4">
                <audio controls className="w-full">
                  <source src={selectedSpeech.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            
            <div className="mt-4 space-y-4">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedSpeech?.transcript}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Speeches;
