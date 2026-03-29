import { useState } from "react";
import { Plus, ThumbsUp, ThumbsDown, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  category: "skin" | "body" | "hair" | "tools";
  benefits: string[];
  cons: string[];
  alternatives: { name: string; reason: string }[];
  usage: string;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "SOLAwave Red Light Mask",
    category: "tools",
    benefits: [
      "Stimulates collagen production",
      "Reduces fine lines & wrinkles",
      "Improves skin texture & tone",
      "Non-invasive LED therapy",
      "Covers face and neck",
    ],
    cons: [
      "Requires consistent use (5x/week) for visible results",
      "Limited to 3-minute sessions",
      "Can cause mild warmth or sensitivity initially",
    ],
    alternatives: [
      { name: "CurrentBody Skin LED Mask", reason: "FDA-cleared, longer treatment area" },
      { name: "Omnilux Contour Face", reason: "Medical-grade LEDs, clinically proven" },
    ],
    usage: "5 times a week, 3 min face and neck",
  },
  {
    id: "2",
    name: "Yiclick Heavy Exfoliating Gloves",
    category: "body",
    benefits: [
      "Deep physical exfoliation removes dead skin",
      "Improves skin texture and smoothness",
      "Enhances absorption of lotions and serums",
      "Affordable and reusable",
    ],
    cons: [
      "Can be too harsh for sensitive skin",
      "Risk of micro-tears if used too aggressively",
      "Not ideal for face or delicate areas",
      "Should be replaced regularly for hygiene",
    ],
    alternatives: [
      { name: "Dermasuri Deep Exfoliating Mitt", reason: "Gentler material, better for sensitive areas" },
      { name: "Baiden Mitten", reason: "Finer weave for controlled exfoliation" },
    ],
    usage: "2-3 times per week in shower",
  },
  {
    id: "3",
    name: "AmLactin Intensive Healing Body Lotion (15% Lactic Acid)",
    category: "body",
    benefits: [
      "15% lactic acid for chemical exfoliation",
      "Contains ceramides for barrier repair",
      "Excellent for KP and rough/bumpy skin",
      "Deeply moisturizes extremely dry skin",
      "No need to scrub — works passively",
    ],
    cons: [
      "Can sting on freshly shaved or broken skin",
      "Strong smell initially",
      "May cause purging in first 1-2 weeks",
      "Not suitable for face",
    ],
    alternatives: [
      { name: "Gold Bond Rough & Bumpy", reason: "Similar AHA formula, less stinging" },
      { name: "CeraVe SA Cream", reason: "Salicylic acid alternative with ceramides" },
    ],
    usage: "Daily after shower on damp skin",
  },
  {
    id: "4",
    name: "Strawberry Brand Lotion (for KP)",
    category: "body",
    benefits: [
      "Targets keratosis pilaris specifically",
      "Helps soften bumpy skin texture",
      "Pleasant scent",
    ],
    cons: [
      "May not be strong enough alone for severe KP",
      "Limited clinical backing compared to AHA lotions",
      "Fragrance may irritate sensitive skin",
    ],
    alternatives: [
      { name: "First Aid Beauty KP Bump Eraser", reason: "Clinically tested, AHA + PHA formula" },
      { name: "Touch KP Treatment", reason: "Contains glycolic & lactic acid" },
    ],
    usage: "Daily on affected areas",
  },
  {
    id: "5",
    name: "Anti-Aging Face Moisturizer (Retinol, Collagen, Hyaluronic Acid)",
    category: "skin",
    benefits: [
      "Retinol boosts cell turnover",
      "Hyaluronic acid provides deep hydration",
      "Collagen supports skin firmness",
      "Dual day/night formula",
    ],
    cons: [
      "Generic brand — retinol % may be low",
      "Collagen molecules too large to penetrate topically",
      "May cause irritation when combined with other actives",
      "Fragrance in some formulations",
    ],
    alternatives: [
      { name: "CeraVe Skin Renewing Retinol Serum", reason: "Encapsulated retinol, gentle + effective" },
      { name: "Neutrogena Rapid Wrinkle Repair", reason: "Proven retinol SA formula" },
    ],
    usage: "Nightly after cleansing",
  },
  {
    id: "6",
    name: "Aveeno Skin Relief Fragrance-Free Body Wash",
    category: "body",
    benefits: [
      "Fragrance-free — ideal for sensitive skin",
      "Triple Oat Complex soothes itchy skin",
      "Gentle daily cleanser that won't strip moisture",
      "Dermatologist recommended",
    ],
    cons: [
      "May not lather as much as expected",
      "Not deeply moisturizing on its own",
      "Some formulations contain sulfates",
    ],
    alternatives: [
      { name: "Vanicream Gentle Body Wash", reason: "Even fewer irritants, dye-free" },
      { name: "La Roche-Posay Lipikar Wash", reason: "Niacinamide + shea butter, ultra-gentle" },
    ],
    usage: "Daily in shower",
  },
  {
    id: "7",
    name: "BAIMEI Gua Sha & Jade Roller Set",
    category: "tools",
    benefits: [
      "Promotes lymphatic drainage, reduces puffiness",
      "Can improve product absorption",
      "Relaxing self-care ritual",
      "May help with facial tension",
    ],
    cons: [
      "Results are mostly temporary (de-puffing)",
      "Won't replace professional facial massage",
      "Jade quality varies — may not be real jade",
      "Requires proper technique to avoid bruising",
    ],
    alternatives: [
      { name: "Mount Lai Gua Sha", reason: "Certified gemstone, better ergonomic shape" },
      { name: "Sacheu Stainless Steel Gua Sha", reason: "Stays cold longer, more hygienic" },
    ],
    usage: "Daily, 3-5 min with serum or oil",
  },
  {
    id: "8",
    name: "Handcraft Blends Organic Jojoba Oil",
    category: "skin",
    benefits: [
      "USDA Organic, cold-pressed, hexane-free",
      "Closest oil to skin's natural sebum",
      "Non-comedogenic — won't clog pores",
      "Multi-use: face, hair, body, massage",
      "Helps balance oil production",
    ],
    cons: [
      "Can feel greasy if over-applied",
      "May not be moisturizing enough alone for very dry skin",
      "Slow to absorb compared to lighter oils",
    ],
    alternatives: [
      { name: "The Ordinary 100% Organic Jojoba Oil", reason: "Budget-friendly, same quality" },
      { name: "Drunk Elephant Virgin Marula Oil", reason: "Richer in antioxidants, faster absorption" },
    ],
    usage: "2-3 drops mixed with moisturizer or alone",
  },
  {
    id: "9",
    name: "Nature Republic Aloe Vera Watery Gel",
    category: "skin",
    benefits: [
      "Lightweight, fast-absorbing hydration",
      "Soothes sunburn and irritation",
      "Good aftershave / after-sun gel",
      "Multi-use for face, body, and hair",
    ],
    cons: [
      "Contains alcohol and fragrance",
      "Aloe content may be lower than marketed",
      "Not deeply moisturizing for very dry skin",
    ],
    alternatives: [
      { name: "Holika Holika 99% Aloe Vera Gel", reason: "Higher aloe concentration" },
      { name: "Seven Minerals Organic Aloe Vera Gel", reason: "USDA Organic, no additives" },
    ],
    usage: "As needed for soothing/hydration",
  },
  {
    id: "10",
    name: "NIVEA Cocoa Butter Body Cream",
    category: "body",
    benefits: [
      "Rich deep nourishing formula",
      "Cocoa butter locks in moisture",
      "Great for very dry skin patches",
      "Affordable, generous 16oz size",
    ],
    cons: [
      "Heavy fragrance may irritate sensitive skin",
      "Contains mineral oil (occlusive, not nourishing)",
      "Very thick — may feel greasy",
      "Contains parabens in some formulations",
    ],
    alternatives: [
      { name: "Palmer's Cocoa Butter Formula", reason: "Vitamin E enriched, similar price" },
      { name: "SheaMoisture Raw Shea Butter", reason: "Natural, fair-trade ingredients" },
    ],
    usage: "Daily on dry areas",
  },
  {
    id: "11",
    name: "Naturium Bio-Lipid Body Lotion (Fragrance Free)",
    category: "body",
    benefits: [
      "Fragrance-free, great for sensitive skin",
      "Bio-lipid complex restores skin barrier",
      "Shea butter for deep moisture",
      "Lightweight yet nourishing",
    ],
    cons: [
      "May not be rich enough for extremely dry skin in winter",
      "Newer brand — less long-term data",
    ],
    alternatives: [
      { name: "Vanicream Moisturizing Cream", reason: "Dermatologist gold standard, no irritants" },
      { name: "CeraVe Moisturizing Cream", reason: "Ceramides + MVE delivery technology" },
    ],
    usage: "Daily, full body after shower",
  },
  {
    id: "12",
    name: "Aquaphor Healing Ointment",
    category: "body",
    benefits: [
      "Excellent occlusive — seals in moisture",
      "Heals dry, cracked, irritated skin",
      "Multi-purpose: lips, cuticles, minor cuts",
      "Dermatologist recommended classic",
    ],
    cons: [
      "Very greasy texture",
      "Contains lanolin — allergen for some",
      "Not a moisturizer — works best over one",
      "Contains mineral oil/petrolatum",
    ],
    alternatives: [
      { name: "CeraVe Healing Ointment", reason: "Ceramides added, similar occlusive effect" },
      { name: "Dr. Dan's Cortibalm", reason: "Better for lip-specific healing" },
    ],
    usage: "As needed on dry patches, lips, etc.",
  },
];

const Skincare = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "skin", label: "Face" },
    { id: "body", label: "Body" },
    { id: "hair", label: "Hair" },
    { id: "tools", label: "Tools" },
  ];

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-2">Skincare Routine</h2>
        <p className="text-muted-foreground">
          Your complete product breakdown with benefits, concerns, and better alternatives.
        </p>
      </div>

      {/* Add Product */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new product (e.g. CeraVe Moisturizing Cream)..."
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="flex-1"
            />
            <Button size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="space-y-4">
        {filtered.map((product) => (
          <Card key={product.id} className="card-hover overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-wellness to-ocean" />
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-serif">{product.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="capitalize text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {product.usage}
                    </Badge>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="benefits" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="cons">Concerns</TabsTrigger>
                  <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                </TabsList>
                <TabsContent value="benefits" className="mt-4">
                  <ul className="space-y-2">
                    {product.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ThumbsUp className="w-3.5 h-3.5 text-wellness shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="cons" className="mt-4">
                  <ul className="space-y-2">
                    {product.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ThumbsDown className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="alternatives" className="mt-4">
                  <ul className="space-y-3">
                    {product.alternatives.map((alt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm p-3 rounded-lg bg-secondary">
                        <ArrowRight className="w-3.5 h-3.5 text-ocean shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{alt.name}</span>
                          <p className="text-muted-foreground text-xs mt-0.5">{alt.reason}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Skincare;
