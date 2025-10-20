import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Heart, BookOpen, Globe } from "lucide-react";

const About = () => {
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
            Ku Saabsan Mareegtan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ujeedada iyo sababta loo abuuray mareegtan taariikhiga ah
          </p>
        </motion.div>

        {/* Purpose Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Ujeedada Mareegtan</h2>
              </div>
              
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Mareegtan waxa loo abuuray si loo ilaaliyo taariikhda muhiimka ah ee Soomaaliya, 
                  gaar ahaan xilligii Madaxweyne Maxamed Siyaad Barre (1969-1991). 
                </p>
                <p>
                  Muddo dheer, ma jirin meel loogu talagalay barashada iyo fahamka taariikhdan 
                  muhiimka ah. Mareegtan waxay ka dhigan tahay maktabad dhijitaal ah oo qof walba 
                  ku baran karo taariikhda wadankiisa, guulihii la gaadhay, iyo dhibaatooyinkii 
                  la soo maray.
                </p>
                <p>
                  Ujeedadeenna waa in aan dhowrno taariikhda runta ah, aan u fududayno dadka 
                  cusub in ay fahmaan waxa dhacay, iyo sida loo barato wax ka qaldan iyo wax 
                  ka hagaagsan.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Abuuraha Mareegtan</h2>
              </div>
              
              <div className="space-y-4 text-foreground leading-relaxed">
                <p className="text-2xl font-semibold text-primary">
                  Khalid Abdulkadir Diriye
                </p>
                <p>
                  Aniga, Khalid Abdulkadir Diriye, ayaa abuuray mareegtan, waxaanan ahay qof 
                  jecel taariikhda Soomaaliya oo dareemay in ay tahay wax muhiim ah in la 
                  dhowro taariikhda mudane Maxamed Siyaad Barre.
                </p>
                <p>
                  Siyaad Barre waxa uu ahaa shakhsiyad weyn oo taariikhda siyaasadda Soomaaliya 
                  saameyn weyn ku yeelatay. In kasta oo ay jiraan aragtiyo kala duwan oo ku saabsan 
                  xilligaas, muhiim weeye in la xuso taariikhda oo aan la ilaawiin.
                </p>
                <p>
                  Mareegtan waxay u taagan tahay waxbarashada iyo ilaalinta taariikhda, ma aha 
                  meel lagu doodayo ama lagu dooro dhinac. Waa maktabad loogu talagalay dadka 
                  doonaya in ay bartaan iyo kuwa doonaya in ay la wadaagaan xasuustooda.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="shadow-card border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Maxay Muhiim u Tahay</h2>
              </div>
              
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Taariikhda waa dhaxal aan ka heli karno wax badan. Waa muhiim in jiilasha 
                  cusub ay fahmaan halka ay ka yimaadeen iyo waxa uu jiilkii ka horreeyay soo 
                  maray.
                </p>
                <p>
                  Maxamed Siyaad Barre waxa uu ahaa hoggaamiyihii ugu mudada dheeraa xukumay 
                  Soomaaliya tan iyo markii ay xoroobatay. Xilligaas waxa dhacay isbedello 
                  badan - waxbarashada, dhaqaalaha, dhismaha, iyo arrimaha dibadda.
                </p>
                <p>
                  Iyadoo aan laga hadlaynin dhinacyada wanaagsan ama kuwa xun, muhiim weeye 
                  in taariikhda la qoro oo la dhowro. Mareegtan waxay u adeegaysaa inay noqoto 
                  meel lagu barto, lagu falanqeeyo, lagu kala sooco runta iyo been-beenka.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center bg-primary/5 p-8 rounded-lg border border-primary/10"
        >
          <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold mb-4">
            Ka Qayb Qaado Ilaalinta Taariikhda
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Haddii aad leedahay xasuus, sawiro, ama warbixin ku saabsan xilligaas, 
            fadlan nala soo wadaag bogga Bulshada. Taariikhda waa dhaxalkeenna oo dhan.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
