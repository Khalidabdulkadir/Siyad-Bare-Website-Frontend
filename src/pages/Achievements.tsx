import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GraduationCap, Building, Plane, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { apiService, Achievement } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const categoryIcons: Record<string, React.ReactNode> = {
  education: <GraduationCap className="w-8 h-8" />,
  economy: <TrendingUp className="w-8 h-8" />,
  infrastructure: <Building className="w-8 h-8" />,
  foreign_policy: <Plane className="w-8 h-8" />,
};

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAchievements();
        setAchievements(data);
        setError(null);
      } catch (err) {
        setError('Failed to load achievements. Please try again later.');
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Group achievements by category
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

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
            Guulaha Waaweyn
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Baro hindisaha isbeddelka ah iyo guulaha lagu gaadhay inta lagu guda jiray xilligaas muhiimka ah ee taariikhda Soomaaliya
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedAchievements).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-bold mb-6 capitalize flex items-center gap-3">
                <span className="text-primary">
                  {categoryIcons[category] || <GraduationCap className="w-8 h-8" />}
                </span>
                {category.replace('_', ' ')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (index * 0.05), duration: 0.3 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">{achievement.title}</CardTitle>
                        {achievement.year && (
                          <p className="text-sm text-muted-foreground">{achievement.year}</p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">
                          {achievement.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {selectedAchievement?.title}
              </DialogTitle>
              {selectedAchievement?.year && (
                <DialogDescription>{selectedAchievement.year}</DialogDescription>
              )}
            </DialogHeader>
            <div className="mt-4">
              <p className="text-foreground leading-relaxed">
                {selectedAchievement?.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Achievements;
