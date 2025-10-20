import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg">Dhaxalka Siyaad Barre</h3>
            <p className="text-sm text-muted-foreground">
              Ilaalinta iyo wadaagista dhaxalka taariikhda Mohamed Siyaad Barre iyada oo loo marayo waxbarasho iyo waayo-aragnimo is-dhexgalka leh.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Abuuraha:</strong> Khalid Abdulkadir Diriye
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Xiriiriyeyaasha Degdegga ah</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/biography" className="text-muted-foreground hover:text-primary transition-colors">
                  Taariikh-Nololeed
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-muted-foreground hover:text-primary transition-colors">
                  Guulaha
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Sawirrada
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  Imtixaan
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Khayraadka</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/speeches" className="text-muted-foreground hover:text-primary transition-colors">
                  Khudbaduhu
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  Bulshada
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Ku Saabsan
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Nala Xiriir</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              "Aqoontu waa nuurka haga quruumaha"
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Dhaxalka Maxamed Siyaad Barre. Ujeedooyinka Waxbarashada Keliya.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
