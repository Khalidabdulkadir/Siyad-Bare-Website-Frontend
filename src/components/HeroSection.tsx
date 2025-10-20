import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import portraitImage from "@/assets/siad-barre-portrait.png";
import somaliaFlag from "@/assets/somalia-flag.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative Flag Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 opacity-20">
        <img src={somaliaFlag} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 opacity-20">
        <img src={somaliaFlag} alt="" className="w-full h-full object-contain" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary-foreground space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
             Sooyaalkii iyo Dhaxalkii Maxamed Siyaad Barre
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl font-light italic opacity-90"
            >
              "Aqoontu waa nuurka haga quruumaha"
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg opacity-90 max-w-xl"
            >
              Baro nolosha iyo guulihii hoggaamiyihii Kacaanka Soomaaliya (1969–1991) adigoo dhex maraya bog taariikhi ah oo waxbarasho iyo wacyigelin leh.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link to="/biography">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg group font-semibold">
                  Baaro Dhaxalkiisa
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" className="bg-secondary text-white hover:bg-secondary/90 shadow-lg font-semibold">
                  Imtixaanka Iska Tijaabi
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-lg font-semibold">
                  Ku Saabsan Mareegtan
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative"
          >
            {/* Somalia Flag Corner */}
            <div className="absolute -top-4 -right-4 w-20 h-20 z-20">
              <img src={somaliaFlag} alt="Somalia Flag" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-elegant border-4 border-white/20">
              <img
                src={portraitImage}
                alt="Mohamed Siad Barre - Historical Portrait"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Timeline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg shadow-elegant"
            >
              <p className="text-sm font-medium">Xilligii Xukunka</p>
              <p className="text-2xl font-bold">1969 - 1991</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
