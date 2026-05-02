"use client";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  return (
    <nav className="fixed left-1/2 top-0 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-4 rounded-b-2xl bg-black/80 backdrop-blur-md px-6 py-2 sm:gap-8 md:gap-10 md:rounded-b-3xl md:px-10 lg:gap-12 border-x border-b border-white/10 shadow-2xl">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const targetId = item.href.replace("#", "");
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-[10px] transition-colors sm:text-xs md:text-sm tracking-wide font-medium"
            style={{ color: "rgba(245, 208, 218, 0.75)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#f5d0da")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245, 208, 218, 0.75)")
            }
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
