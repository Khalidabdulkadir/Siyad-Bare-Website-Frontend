import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Send, MessageCircle, Loader2, AlertCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService, CommunityPost } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCommunityPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load community posts.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      
      if (selectedFile) {
        submitData.append('photo', selectedFile);
      }

      await apiService.submitCommunityPost(submitData);
      
      toast({
        title: "Thank you for sharing!",
        description: "Your submission has been added to our community collection.",
      });

      setFormData({ name: "", email: "", message: "" });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh posts
      fetchPosts();
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your post. Please try again.",
        variant: "destructive",
      });
      console.error('Error submitting post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Wax Ka Qayb Qaadashada Bulshada
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La wadaag sheekooyinkaaga, xasuusahaaga, iyo sawirrada taariikhiga ah si aad u caawiso ilaalinta dhaxalkan muhiimka ah
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="shadow-card h-full">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold">La Wadaag Sheekaadaada</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Magaca</Label>
                    <Input
                      id="name"
                      placeholder="Magacaaga oo buuxa"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="emailkaaga@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Sheekaadaada ama Xasuustaada</Label>
                    <Textarea
                      id="message"
                      placeholder="La wadaag xasuusahaaga, waayo-aragnadaada, ama aragtiyadaada taariikhiga ah..."
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full group" size="lg" disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    )}
                    {submitting ? "Soo diraya..." : "Soo Dir Sheekaadaada"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Photo Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="shadow-card h-full">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold">Soo Geli Sawirrada Taariikhiga ah</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Ma haysaa sawiro taariikhi ah ama dukumeenti ka yimid xilligaas?
                    Na caawi si aan u ilaalino taariikhda adigoo la wadaagaya bulshadeenna.
                  </p>

                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedFile ? selectedFile.name : "Guji si aad u geliso ama soo dhig"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, PDF ilaa 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Waxaad soo gelaysaa:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Sawirrada taariikhiga ah 1969-1991</li>
                      <li>• Sawirrada qoyska ama gaarka ah ee xilligaas</li>
                      <li>• Dukumeentiyada, wargaysyada, ama xasuus-qoryo</li>
                      <li>• Fiidiyowyada</li>
                    </ul>
                  </div>

                </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Community Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12"
      >
        <h2 className="font-serif text-3xl font-bold mb-6 text-center">Sheekooyinka Bulshada</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : posts.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Weli ma jiraan qoraalada bulshada. Noqo kii ugu horreeya ee wadaaga sheekadiisa!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{post.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {post.photo && (
                      <img 
                        src={post.photo} 
                        alt={post.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <p className="text-foreground leading-relaxed">{post.message}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12"
        >
          <Card className="shadow-card">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">Tilmaamaha Bulshada</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Ixtiraam U Yeel</h4>
                  <p>Tani waa goob waxbarasho oo diirada saareysa dukumentiga taariikhiga ah iyo barashada.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Wadaag Xaqiiqooyinka</h4>
                  <p>Fadlan hubi in macluumaadka la soo gudbiyay uu yahay mid sax ah oo la xaqiijin karo marka ay suurtogal tahay.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Ixtiraam Xuquuqda</h4>
                  <p>Kaliya soo geli sawirro iyo qalabka aad leedahay ama aad ogolaansho u heshay inaad wadaagto.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Ujeeddada Waxbarashada</h4>
                  <p>Dhammaan wax ka qaybgalka waa inay u adeegaan ujeedooyinka waxbarashada iyo ilaalinta taariikhda.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
