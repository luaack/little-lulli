import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="bg-background py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-['Playfair_Display'] italic text-2xl font-bold text-primary mb-2">
              Little Lulli
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Laços artesanais feitos com amor para momentos inesquecíveis.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Entre em contato
            </h4>
            <div className="flex gap-4">
              <a
                href="https://wa.me/5561991557493"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/uselittlelulli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="hidden sm:inline">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Little Lulli. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
