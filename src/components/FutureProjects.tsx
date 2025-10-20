import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, BookMarked, Feather } from "lucide-react";

const FutureProjects = () => {
  const futurePersonalities = [
    {
      name: "Abwan Hadraawi",
      title: "Gabayaa & Suugaanyahan",
      description: "Mid ka mid ah gabayaaga ugu caansansan ee Soomaaliyeed",
      icon: Feather,
      category: "Suugaan"
    },
    {
      name: "Sayid Maxamed Cabdulle Xasan",
      title: "Hoggaamiye Tariikheed",
      description: "Hogaamiyihii halganka xorriyadda Soomaaliyeed",
      icon: Users,
      category: "Hoggaamiye"
    },
    {
      name: "Gabayaaga Soomaaliyeed",
      title: "Dhaxalka Suugaanta",
      description: "Gabayaaga iyo suugaanyahanada kale ee Soomaaliyeed",
      icon: BookMarked,
      category: "Suugaan"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Mashruucyo Mustaqbalka</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Mareegaha Soo Socda
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Waxaan qorsheynaa inaan abuurno mareegyo kale oo ku saabsan shakhsiyaadka 
            taariikhiga ah ee Soomaaliya, sida gabayaaga, hoggaamiyeyaasha, iyo dadka 
            kale ee saameyn weyn ku yeelatay Soomaaliya iyo afkeeda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {futurePersonalities.map((person, index) => {
            const Icon = person.icon;
            return (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full hover-lift shadow-card border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {person.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">{person.name}</h3>
                    <p className="text-sm font-semibold text-muted-foreground mb-3">
                      {person.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {person.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <Card className="shadow-elegant border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-bold mb-4">
                Ujeedadeenna
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Waxaan rabnaa inaan abuurno maktabad dhijitaal ah oo buuxa oo ku saabsan 
                shakhsiyaadka muhiimka ah ee taariikhda Soomaaliya. Qof walba waa inuu 
                fursad u helaa inuu barto oo fahmayo dhaxalka taariikhi iyo dhaqan ee 
                Soomaaliya. Taariikhda waa dhaxalkeenna oo dhan, waa inaan ilaalino.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-primary">
                  "Aqoontu waa nuurka haga quruumaha"
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureProjects;
