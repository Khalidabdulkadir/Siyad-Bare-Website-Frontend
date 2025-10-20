import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpeg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.webp";

const images = [
  { src: gallery1, caption: "Jaanarel Siyaad Barre 1960-aadkii", year: "1960s" },
  { src: gallery2, caption: "Madaxweynaha Soomaaliya", year: "1970s" },
  { src: gallery3, caption: "Siyaasiga Soomaaliya", year: "1970s" },
  { src: gallery4, caption: "Sawirka Rasmiga ah", year: "1969" },
  { src: gallery5, caption: "Booqasho Caalami ah", year: "1980s" },
  { src: gallery6, caption: "Madaxweynaha Soomaaliya", year: "1981" },
];

const HistoricalGallery = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Sawiro Taariikhi ah
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Muuqaallo muhiim ah oo ku saabsan taariikhda iyo noloshii Jaanarel Maxamed Siyaad Barre
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover-lift group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-lg font-semibold mb-1">{image.caption}</p>
                      <p className="text-sm text-white/80">{image.year}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoricalGallery;
