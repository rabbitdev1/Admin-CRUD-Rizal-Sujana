export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pembelian",
      href: "/purchase",
    },
    {
      label: "Produk",
      href: "/product",
    },
    {
      label: "Stok",
      href: "/stock",
    },
  ],
};
