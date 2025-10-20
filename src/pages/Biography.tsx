import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Calendar, Star, Loader2, AlertCircle } from "lucide-react";
import { apiService, BiographyEntry } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Biography = () => {
  const [biographyData, setBiographyData] = useState<BiographyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBiography = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBiography();
        setBiographyData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load biography data. Please try again later.');
        console.error('Error fetching biography:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBiography();
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
        <div className="container mx-auto px-4 max-w-4xl">
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
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Taariikh-Nololeed & Jadwalka Waqtiga
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
  Raac safarka taariikhiga ah ee uu ka soo bilaabay nolol reer guuraa 
  una soo maray hogaaminta qaranka Soomaaliya muddo  badan.
</p>

        </motion.div>

        <VerticalTimeline lineColor="hsl(var(--primary))">
          {biographyData.map((event, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                boxShadow: "var(--shadow-card)",
                borderRadius: "0.5rem",
              }}
              contentArrowStyle={{ borderRight: "7px solid hsl(var(--card))" }}
              date={event.year}
              iconStyle={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              icon={index === biographyData.length - 1 ? <Star /> : <Calendar />}
            >
              <h3 className="vertical-timeline-element-title font-serif text-2xl font-bold mb-2">
                {event.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle text-primary font-semibold mb-3">
                {event.category}
              </h4>
              <p className="text-muted-foreground">{event.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 bg-card p-8 rounded-lg shadow-card"
        >
          <h2 className="font-serif text-3xl font-bold mb-4">Xaalada Taariikheed</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Xilligii Maxamed Siyaad Barre waxa uu ku calaamad saarnaa dadaalladii casriyeynta ee 
            hammiyadda badnaa, isbeddelada bulshada oo muhiim ah, iyo caqabadaha geopolitical oo 
            adag. Hogaankiisu waxa uu bedelay dusha sare ee waxbarashada Soomaaliya, waxa uu soo 
            bandhigay midowga luqadeed iyada oo la adeegsanayo qoraal hal qaab ah, waxa uuna raacay 
            siyaasado dhaqaale oo hanti-wadaag ah.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Inkasta oo xukunkiisu uu ku guuleystay guulo muhiim ah oo ku saabsan aqoonsiga, 
            horumarka kaabayaasha, iyo sharaftii qaranka, waxa sidoo kale wajihi cambareyn 
            ugu dambayntii burburay dagaal sokeeye 1991. Fahamka xilligaas waxa loo baahan yahay 
            in la eego labadaba guulaha iyo muranada iyada oo la raacayo xaaladooda taariikhi ah.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Biography;
