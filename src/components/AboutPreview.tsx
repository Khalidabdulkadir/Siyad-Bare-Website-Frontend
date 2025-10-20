import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, BookOpen, ArrowRight, Underline } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Ku Saabsan Mareegtan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ujeedada iyo sababta loo abuuray mareegtan taariikhiga ah
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Purpose Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="h-full hover-lift shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Ujeedada</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Mareegtan waxa loo abuuray si loo ilaaliyo taariikhda muhiimka ah ee Soomaaliya, 
                  gaar ahaan xilligii Madaxweyne Maxamed Siyaad Barre (1969-1991). Muddo dheer, 
                  ma jirin meel loogu talagalay barashada iyo fahamka taariikhdan muhiimka ah.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  "Taariikhda waa dhaxal aan ka heli karno wax badan"
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Creator Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="h-full hover-lift shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Abuuraha</h3>
                </div>
                <p className="text-xl font-semibold text-primary mb-4">
                  Khalid Abdulkadir Diriye
                </p>
               <p className="text-muted-foreground leading-relaxed mb-6">
  Aniga oo ah <strong>Khalid Abdulkadir Diriye</strong>, ayaan abuuray mareegtan, 
  anigoo aaminsan in ay muhiim tahay in la dhowro taariikhda shaqsiyaadka 
  muhiimka ah ee Soomaaliyeed. Waxaan hore u sameeyay mareeg kale 
  <a 
    href="https://hadrawi.sominnovations.xyz" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ textDecoration: "underline", color: "inherit", marginLeft: "4px" }}
  >
    hadrawi.sominnovations.xyz
  </a>
  , oo aan ku keydiyo gabayadii Abwaan Hadraawi.
</p>

              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/about">
            <Button size="lg" className="group">
              Akhri Dhammaan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
