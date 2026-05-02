import { MessageCircle, Instagram } from "lucide-react";

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
                <Instagram className="h-5 w-5" />
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
