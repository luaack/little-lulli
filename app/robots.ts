import type { MetadataRoute } from "next";

// AMBIENTE DE TESTES: bloqueia todos os buscadores.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
