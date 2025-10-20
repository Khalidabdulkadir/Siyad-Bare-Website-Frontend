import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { timelineEvents } from "@/data/mockData";

const TimelinePreview = () => {
  const previewEvents = timelineEvents.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Cinwaan & Hordhac */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Safar Taariikheed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ka bogo dhacdooyinkii waaweynaa ee dalka ka dhacay intii u dhaxaysay 1969 ilaa 1991.
          </p>
        </motion.div>

        {/* Dhacdooyinka taariikhda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {previewEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover-lift shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">{event.date}</p>
                      <span className="text-xs text-muted-foreground">{event.category}</span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Badhamada */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/biography">
            <Button size="lg" className="group">
              Akhri Taariikhda Dhamaystiran
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelinePreview;
