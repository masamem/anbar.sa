export type CategoryId = "oud" | "perfume" | "bakhoor" | "gifts";

export interface Category {
  id: CategoryId;
  label: string;
  latin: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  latin: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  short: string;
  description: string;
  notes?: { top: string[]; heart: string[]; base: string[] };
  sizes: string[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
}

export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/99af50d6-4b00-4884-ba72-8b3ba43fa937/_result.png",
  oudOil: "https://image.qwenlm.ai/generated-images/5ebbfb97-45f8-44e2-8c97-755bcb8bd8d0/_result.png",
  amber: "https://image.qwenlm.ai/generated-images/f52fe253-8a14-406f-973e-11da1961fb95/_result.png",
  musk: "https://image.qwenlm.ai/generated-images/bba11650-05ce-4fde-8b79-ba6b188ae2fc/_result.png",
  bakhoor: "https://image.qwenlm.ai/generated-images/7eed8d02-9331-4186-80c1-5fbb1ecf1e1d/_result.png",
  mabkhara: "https://image.qwenlm.ai/generated-images/28af8c56-11c0-420a-9c54-7b286788f137/_result.png",
  rose: "https://image.qwenlm.ai/generated-images/8deb419f-87f7-4f11-b811-4604fe430714/_result.png",
  saffron: "https://image.qwenlm.ai/generated-images/2ea3fe4b-969e-47b3-8a79-ae87242291e9/_result.png",
  giftSet: "https://image.qwenlm.ai/generated-images/4e311e32-d83a-4ed6-986c-26f46dde71b9/_result.png",
  oudWood: "https://image.qwenlm.ai/generated-images/fa77d750-b95f-4b93-ac2d-a94f3814339b/_result.png",
};

export const CATEGORIES: Category[] = [
  {
    id: "oud",
    label: "العود",
    latin: "OUD",
    tagline: "دهنٌ فاخر وقطع معمّقة تختارها الدار يداً بيد",
    image: IMG.oudWood,
  },
  {
    id: "perfume",
    label: "العطور الشرقية",
    latin: "PARFUMS",
    tagline: "تراكيب مركّزة بثباتٍ يتجاوز اليومين",
    image: IMG.amber,
  },
  {
    id: "bakhoor",
    label: "البخور والمباخر",
    latin: "BAKHOOR",
    tagline: "طقوس الضيافة العربية منذ أول مجلس",
    image: IMG.bakhoor,
  },
  {
    id: "gifts",
    label: "مجموعات الهدايا",
    latin: "COFFRETS",
    tagline: "تغليفٌ ملكي جاهز يُغني عن الكلام",
    image: IMG.giftSet,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "royal-oud-elixir",
    name: "دهن عود ملكي",
    latin: "Royal Oud Elixir",
    category: "oud",
    price: 480,
    oldPrice: 560,
    rating: 4.9,
    reviews: 212,
    badge: "الأكثر مبيعاً",
    image: IMG.oudOil,
    short: "دهن عود كمبودي معتّق ٢٥ عاماً، تقطير تقليدي بطيء بتركيز كامل.",
    description:
      "من أعرق مزارع العود في كمبوديا، تُنتقى قطع الراتنج الداكنة يدوياً ثم تُقطّر على نارٍ هادئة لأسابيع حتى يتكثّف الدهن الملكي. نقطة واحدة تكفي ليومٍ كامل؛ افتتاحية خشبية عميقة تذوب إلى وردٍ طائفي ومسكٍ أسود يبقى أثراً على الجلد والملابس.",
    notes: {
      top: ["عود كمبودي معتّق"],
      heart: ["ورد طائفي", "زعفران حرّ"],
      base: ["مسك أسود", "عنبر رمادي"],
    },
    sizes: ["٣ مل", "٦ مل", "١٢ مل"],
    stock: 14,
    featured: true,
  },
  {
    id: "amber-nocturne",
    name: "عنبر الليل",
    latin: "Amber Nocturne",
    category: "perfume",
    price: 320,
    oldPrice: 380,
    rating: 4.8,
    reviews: 164,
    badge: "خصم خاص",
    image: IMG.amber,
    short: "بارفان شرقي كثيف؛ عنبر وفانيليا مدغشقر بفوحانٍ يسبق دخولك.",
    description:
      "تركيبة ليلية صيغت لسهرات الشتاء ومجالس القهوة المختصة. يبدأ العطر بلمعة برغموت وفلفل وردي، ثم ينفتح على قلبٍ عنبري دافئ تلفّه القرفة، ليستقر على قاعدة فانيليا مدغشقر وخشب صندل مايسوري تدوم حتى صباح اليوم التالي.",
    notes: {
      top: ["برغموت", "فلفل وردي"],
      heart: ["عنبر رمادي", "قرفة سيلانية"],
      base: ["فانيليا مدغشقر", "خشب الصندل"],
    },
    sizes: ["٥٠ مل", "١٠٠ مل"],
    stock: 32,
    featured: true,
  },
  {
    id: "dusk-musk",
    name: "مسك الغسق",
    latin: "Dusk Musk",
    category: "perfume",
    price: 180,
    rating: 4.7,
    reviews: 98,
    badge: "جديد",
    image: IMG.musk,
    short: "مسكٌ أبيض نقي بنعومة البودرة، توقيع يومي هادئ لا يزعج أحداً.",
    description:
      "مسك الطهارة الأبيض بلمسة عصرية: نقاء قطني يفتح على إيريس ناعم، وقلبٌ من خشب الأرز الأبيض، وقاعدة مسكٍ دافئة تلازمك كهدوء ما بعد الغروب. خيارٌ مثالي للدوام والمساجد وللطبقات تحت أي عطرٍ آخر.",
    notes: {
      top: ["نقاء قطني", "ندى الفجر"],
      heart: ["إيريس", "أرز أبيض"],
      base: ["مسك أبيض", "فانيليا جافة"],
    },
    sizes: ["٣٠ مل", "٥٠ مل"],
    stock: 50,
    featured: true,
    isNew: true,
  },
  {
    id: "morning-bakhoor",
    name: "بخور الضحى",
    latin: "Morning Bakhoor",
    category: "bakhoor",
    price: 145,
    rating: 4.6,
    reviews: 76,
    image: IMG.bakhoor,
    short: "معمول بخور يومي بعطر العود والورد، دخانٌ خفيف يريّح البيت.",
    description:
      "خلطة الدار اليومية المعمولة يدوياً من دهن العود وماء الورد الطائفي وسكر النبات، على قاعدة خشبية متوازنة لا تثقل الرأس. مثالي لبدء اليوم وتبخير المجالس والمفروشات، ويمنح البيت رائحة «البيت الطيّب» التي يسأل عنها الضيوف.",
    sizes: ["٤٠ غرام", "٨٠ غرام"],
    stock: 40,
  },
  {
    id: "brass-majlis-burner",
    name: "مبخرة الدار النحاسية",
    latin: "Brass Majlis Burner",
    category: "bakhoor",
    price: 260,
    rating: 4.9,
    reviews: 54,
    badge: "حصري",
    image: IMG.mabkhara,
    short: "مبخرة نحاس أصفر محفورة يدوياً بزخارف أرابيسك، قطعة مجلس تدوم.",
    description:
      "صُنعت في ورش النحاسين التقليدية وحُفرت بزخارف أرابيسك على يد حرفيين توارثوا المهنة. جسمٌ ثقيل ثابت بقاعدة خشبية عازلة للحرارة، وفوهة واسعة توزّع الدخان بانسيابية. تأتي في صندوق هدية مخملي مع ملقط فحم ومجموعة بخور الضحى.",
    sizes: ["قطعة واحدة"],
    stock: 9,
  },
  {
    id: "taif-rose-privee",
    name: "ورد الطائف الخاص",
    latin: "Taif Rosé Privée",
    category: "perfume",
    price: 350,
    oldPrice: 410,
    rating: 4.8,
    reviews: 143,
    image: IMG.rose,
    short: "ثلاثون وردة طائفية في القارورة، قطاف الفجر من مزارع الهدا.",
    description:
      "يُقطّف الورد الطائفي قبل شروق الشمس حين تبلغ الزيوت ذروتها، ويُقطّر خلال ساعات ليحتفظ بنضارة الندى. عطرٌ وردي فاخر يفتتح بالليتشي والزعفران، وقلبٌ من الورد الطائفي المطلق، على قاعدة باتشولي وعنبر تمنحه عمقاً شرقياً لا يذبل.",
    notes: {
      top: ["ليتشي", "زعفران"],
      heart: ["ورد طائفي مطلق", "فاوانيا"],
      base: ["باتشولي", "عنبر ناعم"],
    },
    sizes: ["٥٠ مل", "١٠٠ مل"],
    stock: 21,
    featured: true,
  },
  {
    id: "saffron-ember",
    name: "جمر الزعفران",
    latin: "Saffron Ember",
    category: "perfume",
    price: 295,
    rating: 4.5,
    reviews: 61,
    badge: "جديد",
    image: IMG.saffron,
    short: "زعفران حرّ على جلدٍ مدخّن؛ تركيبة جريئة لعشّاق الحضور.",
    description:
      "لعشّاق التميّز: خيوط زعفران حرّ من قلب آسيا تُحمّص عطرياً فوق قاعدة جلدٍ مدخّن وخشب الأرز الأطلسي. افتتاحية توابل دافئة تليق بالمناسبات الكبرى، وثباتٌ يتحدى أطول السهرات. يُنصح به لمن جرّب كل شيء وملّ التشابه.",
    notes: {
      top: ["زعفران حرّ", "هيل أسود"],
      heart: ["ورد مجفّف", "خشب الأرز"],
      base: ["جلد مدخّن", "نجيل الهند"],
    },
    sizes: ["٥٠ مل", "١٠٠ مل"],
    stock: 27,
    isNew: true,
  },
  {
    id: "royal-coffret",
    name: "المجموعة الملكية",
    latin: "The Royal Coffret",
    category: "gifts",
    price: 640,
    oldPrice: 780,
    rating: 5.0,
    reviews: 38,
    badge: "حصري",
    image: IMG.giftSet,
    short: "صندوق هدايا مخملي يضم ثلاث قوارير توقيع الدار ومبخرة سفر نحاسية.",
    description:
      "تجربة عنبر الكاملة في صندوقٍ واحد: قارورات مصغّرة من عنبر الليل وورد الطائف الخاص ومسك الغسق (١٥ مل لكلٍ منها)، مع مبخرة سفر نحاسية وعلبة بخور الضحى. صندوق مخملي أخضر بختم الدار الذهبي وكرت إهداء يُكتب بخط اليد — الهدية التي تُحفظ لا تُستهلك.",
    sizes: ["صندوق كامل"],
    stock: 6,
    featured: true,
  },
  {
    id: "aged-khmer-oud",
    name: "عود كمبودي معمول",
    latin: "Aged Khmer Oud",
    category: "oud",
    price: 720,
    rating: 4.9,
    reviews: 87,
    badge: "الأكثر مبيعاً",
    image: IMG.oudWood,
    short: "قطع سوبر كمبودي بتعمير ٣٠ عاماً، تُبخّر مباشرة أو تُقتنى كنزاً.",
    description:
      "قطع منتقاة من أشجار الأكويلايا المعمّرة في مرتفعات كمبوديا، عُمّرت ثلاثين عاماً حتى اسودّ قلبها وتشبّع راتنجاً. رائحة التبخير مباشرةً: خشبٌ رطب حلو يتصاعد إلى عنبرٍ عميق يملأ المجلس ساعات. تُشحن في علبة خشبية محكمة مع شهادة مصدر.",
    sizes: ["١٠ غرام", "٢٥ غرام"],
    stock: 11,
    featured: true,
  },
];

export interface Testimonial {
  name: string;
  city: string;
  text: string;
  rating: number;
  bought: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "نورة العتيبي",
    city: "الرياض",
    text: "دهن العود الملكي شيءٌ آخر؛ ثباته يتجاوز اليومين والرائحة تفتح النفس. صار توقيع مجلسنا الأسبوعي.",
    rating: 5,
    bought: "دهن عود ملكي",
  },
  {
    name: "محمد القحطاني",
    city: "جدة",
    text: "طلبت المجموعة الملكية هديةً لوالدي، والتغليف وحده تحفة. وصل خلال يومين ومعها كرت مكتوب بخط اليد.",
    rating: 5,
    bought: "المجموعة الملكية",
  },
  {
    name: "سارة الدوسري",
    city: "الدمام",
    text: "عنبر الليل أثبت عطرٍ جرّبته في ثباته؛ فوحانٌ أول ساعة ثم هدوءٌ يلازمك حتى اليوم الثاني.",
    rating: 4,
    bought: "عنبر الليل",
  },
  {
    name: "عبدالله الشمري",
    city: "مكة المكرمة",
    text: "بخور الضحى ريّح البيت كله، والمبخرة النحاسية صارت قطعة ديكور يسأل عنها كل ضيف يدخل المجلس.",
    rating: 5,
    bought: "مبخرة الدار النحاسية",
  },
  {
    name: "ريم الحربي",
    city: "المدينة المنورة",
    text: "التعامل راقٍ جداً؛ استبدلوا لي القارورة بدون أسئلة لمّا غيّرت رأيي. هذه تُسمى خدمة عملاء.",
    rating: 5,
    bought: "ورد الطائف الخاص",
  },
  {
    name: "فهد المطيري",
    city: "الخبر",
    text: "جرّبت عشرات المتاجر، وعندي عنبر الوحيد اللي ريحته تصير أعمق بعد ساعات… لا أخف ولا تختفي.",
    rating: 4,
    bought: "جمر الزعفران",
  },
];

export const PROMO_CODE = "ANBAR10";
export const PROMO_RATE = 0.1;
export const FREE_SHIPPING_THRESHOLD = 200;
export const SHIPPING_FEE = 25;

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
export const arNum = (v: number | string): string =>
  String(v).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);

export const money = (n: number): string =>
  `${arNum(n.toLocaleString("en-US"))} ر.س`;

export const productById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const categoryById = (id: string): Category | undefined =>
  CATEGORIES.find((c) => c.id === id);
