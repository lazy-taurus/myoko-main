export var artisans = [
  {
    id: '1',
    name: 'Lakshmi Devi',
    profileImage: '',
    shortBio:
      'A master weaver from Sualkuchi, Assam, specializing in traditional Muga silk weaving with intricate motifs that tell stories of Assamese culture.',
    fullBio:
      "Lakshmi Devi has been weaving exquisite Muga silk for over three decades, preserving a tradition passed down through generations in her family. Born and raised in Sualkuchi, known as the 'Manchester of Assam,' she learned the art of silk weaving from her mother at the age of 12. Her designs feature traditional Assamese motifs like the kingkhap (geometric patterns), gos phool (floral designs), and dhol (drum shapes) that represent the rich cultural heritage of the region. Each piece she creates takes anywhere from one week to three months to complete, depending on the complexity of the design.",
    location: {
      village: 'Sualkuchi',
      district: 'Kamrup',
      state: 'Assam',
    },
    craftTypes: ['Weaving', 'Muga Silk', 'Traditional Textiles'],
    yearsOfExperience: 32,
    joinedDate: 'January 2023',
    productsCount: 24,
    salesCount: 156,
    familyTradition:
      'Lakshmi comes from a family of weavers who have been practicing this craft for seven generations. Her grandmother was recognized by the state government for her contribution to preserving traditional Assamese weaving techniques.',
    awards: [
      'National Award for Master Craftsperson by Ministry of Textiles (2015)',
      'State Merit Award for Excellence in Silk Weaving (2010)',
      'Craftsperson of the Year, Assam Handloom Festival (2018)',
    ],
    craftDetails: [
      {
        name: 'Muga Silk Weaving',
        description:
          'Muga silk is a variety of wild silk geographically exclusive to Assam. It has a natural golden-yellow gloss which improves with washing and exposure to sunlight.',
        culturalSignificance:
          'Muga silk is deeply intertwined with Assamese identity and is traditionally worn during Bihu festivals and weddings. The craft is protected under the Geographical Indication of Goods Act.',
        materials: ['Muga Silk Yarn', 'Natural Dyes', 'Traditional Handloom'],
      },
      {
        name: 'Mekhela Chador Weaving',
        description:
          'The traditional Assamese two-piece saree consists of a bottom piece (mekhela) and a top piece (chador), featuring intricate border designs and motifs.',
        culturalSignificance:
          "The Mekhela Chador is the traditional attire for Assamese women, worn during cultural celebrations and representing the wearer's social status and regional identity.",
        materials: ['Muga Silk', 'Pat Silk', 'Cotton', 'Zari (Gold Thread)'],
      },
    ],
    products: [
      {
        id: 'p1',
        name: 'Golden Muga Silk Mekhela Chador with Traditional Motifs',
        description:
          'Handwoven Muga silk two-piece saree featuring traditional Assamese kingkhap patterns and gos phool motifs on the borders.',
        price: 15000,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p2',
        name: 'Muga Silk Stole with Jaapi Motifs',
        description:
          'Elegant hand-woven stole made from pure Muga silk featuring traditional Jaapi (Assamese hat) motifs along the borders.',
        price: 4500,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p3',
        name: 'Pat Silk Gamosa with Tribal Designs',
        description:
          'Traditional Assamese scarf/towel woven in Pat silk with tribal motifs representing the indigenous communities of Assam.',
        price: 2200,
        image: '/placeholder.svg?height=300&width=300',
        isLimited: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Mohan Rabha',
    profileImage: '',
    shortBio:
      'A skilled bamboo and cane craftsman from Goalpara, creating sustainable household items and furniture using traditional techniques passed down for generations.',
    fullBio:
      'Mohan Rabha belongs to the Rabha tribe of Assam and has been practicing bamboo and cane craftsmanship for over 25 years. Growing up in a village surrounded by bamboo groves, he developed a deep connection with this versatile material from an early age. Mohan specializes in creating a wide range of products from furniture to household items, all using sustainable harvesting practices. His work combines traditional Rabha tribal designs with contemporary functionality, making his creations both culturally significant and practically useful in modern homes.',
    location: {
      village: 'Dudhnoi',
      district: 'Goalpara',
      state: 'Assam',
    },
    craftTypes: ['Bamboo Craft', 'Cane Furniture', 'Eco-friendly Products'],
    yearsOfExperience: 25,
    joinedDate: 'March 2023',
    productsCount: 35,
    salesCount: 89,
    familyTradition:
      "In Mohan's Rabha community, bamboo craft is not just an occupation but a way of life. His father and grandfather were known for their skill in creating bamboo fishing equipment and storage containers that were traded throughout the region.",
    craftDetails: [
      {
        name: 'Bamboo Furniture Making',
        description:
          'Creating durable and aesthetically pleasing furniture items like chairs, tables, and shelves using locally sourced bamboo.',
        culturalSignificance:
          'Bamboo furniture represents the sustainable lifestyle of Northeast Indian communities who have lived in harmony with their forest environments for centuries.',
        materials: ['Bamboo', 'Cane', 'Natural Fibers', 'Eco-friendly Varnish'],
      },
      {
        name: 'Traditional Bamboo Utility Items',
        description:
          'Crafting everyday use items like baskets, winnowing trays, fishing traps, and storage containers using traditional techniques.',
        culturalSignificance:
          'These items reflect the self-sufficient agrarian lifestyle of tribal communities and their ingenious use of natural materials.',
        materials: ['Bamboo', 'Cane Strips', 'Natural Dyes', 'Jute'],
      },
    ],
    products: [
      {
        id: 'p4',
        name: 'Handcrafted Bamboo Coffee Table',
        description:
          'Elegant coffee table made from mature bamboo with a glass top, featuring traditional Rabha tribal patterns on the legs.',
        price: 8500,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p5',
        name: 'Set of 3 Bamboo Storage Baskets',
        description:
          'Beautifully woven storage baskets in three sizes, perfect for organizing while adding a natural aesthetic to your home.',
        price: 2200,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p6',
        name: 'Bamboo and Cane Room Divider',
        description:
          'Foldable room divider screen made from bamboo frame and intricate cane weaving, inspired by traditional tribal homes.',
        price: 12000,
        image: '/placeholder.svg?height=300&width=300',
        isLimited: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Thangi Muivah',
    profileImage: '',
    shortBio:
      'A renowned potter from Manipur who creates distinctive black pottery using traditional Longpi techniques that have been practiced for centuries.',
    fullBio:
      "Thangi Muivah hails from the Tangkhul Naga community of Manipur and is a master of the ancient art of Longpi pottery (also known as Longpi Hampai). This unique black pottery is made from a special mixture of serpentine stone and clay, without using a potter's wheel. Thangi learned this craft from her mother-in-law and has been practicing it for over 20 years. Her work is characterized by sleek, minimalist designs that honor traditional forms while appealing to contemporary tastes. Each piece is hand-beaten, shaped, and then fired in an open pit, resulting in the distinctive black finish that Longpi pottery is famous for.",
    location: {
      village: 'Longpi',
      district: 'Ukhrul',
      state: 'Manipur',
    },
    craftTypes: ['Pottery', 'Longpi Black Pottery', 'Traditional Cookware'],
    yearsOfExperience: 22,
    joinedDate: 'February 2023',
    productsCount: 42,
    salesCount: 127,
    awards: [
      'Manipur State Award for Craftsmanship (2019)',
      'Recognition of Excellence for Handicrafts, Eastern Region (2017)',
    ],
    craftDetails: [
      {
        name: 'Longpi Black Pottery',
        description:
          "A unique form of pottery made from a mixture of weathered serpentine stone and clay, without using a potter's wheel, and fired to achieve a distinctive black finish.",
        culturalSignificance:
          "Longpi pottery has been integral to Tangkhul Naga culture for centuries, traditionally used for cooking and serving food. The black color symbolizes the earth and the community's connection to it.",
        materials: [
          'Serpentine Stone',
          'Black Clay',
          'Natural Burnishing Tools',
        ],
      },
      {
        name: 'Traditional Cooking Vessels',
        description:
          'Crafting heat-resistant cooking pots and vessels that naturally enhance the flavor of food and retain heat for long periods.',
        culturalSignificance:
          'These vessels are prized for their ability to slow-cook traditional tribal dishes and are often passed down as family heirlooms.',
        materials: ['Stone-Clay Mixture', 'Natural Polishing Agents'],
      },
    ],
    products: [
      {
        id: 'p7',
        name: 'Longpi Black Pottery Serving Bowl Set',
        description:
          'Set of three nesting serving bowls made using traditional Longpi pottery techniques, perfect for modern dining tables.',
        price: 3800,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p8',
        name: 'Traditional Longpi Cooking Pot',
        description:
          'Authentic cooking vessel that enhances flavor and retains heat, ideal for slow-cooking stews and traditional dishes.',
        price: 2500,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p9',
        name: 'Longpi Tea Set with Bamboo Tray',
        description:
          'Elegant tea set including teapot and four cups made from Longpi black pottery, served on a handcrafted bamboo tray. Perfect for tea ceremonies and special occasions.',
        price: 5500,
        image: '/placeholder.svg?height=300&width=300',
        isLimited: true,
      },
    ],
  },
  {
    id: '4',
    name: 'Tashi Wangchuk',
    profileImage: '',
    shortBio:
      'A master wood carver from Sikkim who creates intricate Buddhist religious artifacts and masks using traditional Himalayan techniques and sustainable wood.',
    fullBio:
      'Tashi Wangchuk is a third-generation wood carver from the Bhutia community of Sikkim. For over 28 years, he has been creating exquisite wooden masks, religious artifacts, and decorative items that reflect the Buddhist cultural heritage of the Eastern Himalayas. Tashi specializes in the ancient technique of negative relief carving, where the background is carved away to make the main design stand out. His workshop uses only sustainably sourced Himalayan woods like walnut, cedar, and maple. Each piece he creates combines spiritual significance with artistic excellence, making his work sought after by collectors and Buddhist practitioners alike.',
    location: {
      village: 'Rumtek',
      district: 'East Sikkim',
      state: 'Sikkim',
    },
    craftTypes: ['Wood Carving', 'Mask Making', 'Religious Artifacts'],
    yearsOfExperience: 28,
    joinedDate: 'April 2023',
    productsCount: 18,
    salesCount: 63,
    familyTradition:
      "Tashi's family has been creating wooden masks and religious artifacts for Buddhist monasteries across Sikkim and Darjeeling for three generations. His grandfather was one of the master craftsmen who worked on the restoration of Rumtek Monastery in the 1960s.",
    awards: [
      'National Merit Certificate for Traditional Craftsmanship (2012)',
      'Sikkim State Award for Preservation of Cultural Heritage (2016)',
    ],
    craftDetails: [
      {
        name: 'Buddhist Mask Carving',
        description:
          'Creating ceremonial masks used in Cham dances (religious Buddhist dance dramas) performed in monasteries during festivals.',
        culturalSignificance:
          'These masks represent various deities, demons, and animals from Buddhist mythology and are essential components of sacred dance ceremonies that are believed to bring blessings and ward off evil spirits.',
        materials: [
          'Himalayan Cedar',
          'Walnut Wood',
          'Natural Pigments',
          'Gold Leaf',
        ],
      },
      {
        name: 'Religious Artifact Carving',
        description:
          'Crafting prayer wheels, altarpieces, and decorative panels featuring Buddhist symbols and deities.',
        culturalSignificance:
          'These items serve both devotional and decorative purposes, bringing spiritual elements into homes and sacred spaces.',
        materials: [
          'Maple Wood',
          'Himalayan Pine',
          'Vegetable Dyes',
          'Beeswax Polish',
        ],
      },
    ],
    products: [
      {
        id: 'p10',
        name: 'Hand-carved Mahakala Wooden Mask',
        description:
          'Intricately carved ceremonial mask representing Mahakala, a wrathful deity and protector of Buddhist teachings.',
        price: 18500,
        image: '/placeholder.svg?height=300&width=300',
        isLimited: true,
      },
      {
        id: 'p11',
        name: 'Wooden Prayer Wheel with Mantra Inscription',
        description:
          'Traditional hand-carved prayer wheel with the Om Mani Padme Hum mantra inscribed in Tibetan script.',
        price: 4200,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p12',
        name: 'Ashtamangala Panel Carving',
        description:
          'Decorative wooden panel featuring the Eight Auspicious Symbols of Buddhism, intricately carved in relief.',
        price: 7800,
        image: '/placeholder.svg?height=300&width=300',
      },
    ],
  },
  {
    id: '5',
    name: 'Rengma Jamir',
    profileImage: '',
    shortBio:
      'A talented textile artist from Nagaland who creates vibrant Naga shawls and fabrics using traditional looms and natural dyes derived from local plants.',
    fullBio:
      'Rengma Jamir belongs to the Ao Naga tribe of Nagaland and has been weaving traditional textiles for over 15 years. She specializes in creating authentic Naga shawls, wraparounds, and modern adaptations that feature the distinctive geometric patterns and vibrant colors characteristic of Naga tribal textiles. Rengma is particularly known for her use of natural dyes extracted from local plants, roots, and minerals, following ancient recipes passed down through generations. Her work not only preserves the textile traditions of her community but also tells the stories of Naga culture through symbolic motifs and patterns that represent tribal identity, social status, and achievements.',
    location: {
      village: 'Mokokchung',
      district: 'Mokokchung',
      state: 'Nagaland',
    },
    craftTypes: ['Textile Weaving', 'Natural Dyeing', 'Tribal Textiles'],
    yearsOfExperience: 15,
    joinedDate: 'May 2023',
    productsCount: 29,
    salesCount: 74,
    familyTradition:
      'In Naga culture, weaving is traditionally taught to girls by their mothers and grandmothers. Rengma learned the art from her grandmother, who was known in their village for her knowledge of natural dyeing techniques using indigenous plants.',
    craftDetails: [
      {
        name: 'Naga Tribal Weaving',
        description:
          'Creating traditional shawls, wraparounds, and modern adaptations featuring distinctive geometric patterns and vibrant colors characteristic of Naga tribal textiles.',
        culturalSignificance:
          'Each pattern and color in Naga textiles has specific meanings related to tribal identity, social status, and achievements. Traditionally, only those who have performed certain rituals could wear specific designs.',
        materials: [
          'Cotton',
          'Wool',
          'Natural Dyes',
          'Traditional Backstrap Loom',
        ],
      },
      {
        name: 'Natural Dyeing',
        description:
          'Extracting colors from local plants, roots, bark, and minerals using ancient techniques to create vibrant, eco-friendly dyes.',
        culturalSignificance:
          "Natural dyeing connects the craft to the land and environment, representing the Naga people's deep relationship with nature and sustainable living practices.",
        materials: [
          'Indigo Leaves',
          'Turmeric Root',
          'Tree Bark',
          'Mineral Pigments',
        ],
      },
    ],
    products: [
      {
        id: 'p13',
        name: 'Traditional Ao Naga Warrior Shawl',
        description:
          'Authentic hand-woven cotton shawl featuring traditional warrior motifs in black, red, and white, symbolizing bravery and status.',
        price: 9500,
        image: '/placeholder.svg?height=300&width=300',
        isLimited: true,
      },
      {
        id: 'p14',
        name: 'Naturally Dyed Table Runner with Naga Patterns',
        description:
          'Modern table runner featuring traditional Naga geometric patterns, woven with cotton and colored using natural indigo and turmeric dyes.',
        price: 3200,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p15',
        name: 'Contemporary Naga-inspired Cushion Covers (Set of 2)',
        description:
          'Fusion design cushion covers combining traditional Naga patterns with contemporary aesthetics, perfect for modern home decor.',
        price: 2800,
        image: '/placeholder.svg?height=300&width=300',
      },
    ],
  },
  {
    id: '6',
    name: 'Bimal Debbarma',
    profileImage: '',
    shortBio:
      'An expert bamboo craftsman from Tripura who creates innovative bamboo furniture, musical instruments, and architectural elements combining traditional techniques with modern design.',
    fullBio:
      "Bimal Debbarma comes from the Tripuri community of Tripura, where bamboo craft has been an integral part of daily life for centuries. With 18 years of experience, Bimal has mastered the art of transforming bamboo into everything from furniture and musical instruments to architectural elements. What sets his work apart is his innovative approach that combines traditional tribal techniques with contemporary design sensibilities. Bimal is particularly known for his sustainable furniture designs that showcase bamboo's strength and flexibility while appealing to modern aesthetic preferences. He also conducts workshops to pass on his knowledge to younger generations, ensuring this sustainable craft continues to thrive.",
    location: {
      village: 'Jampuijala',
      district: 'Sepahijala',
      state: 'Tripura',
    },
    craftTypes: ['Bamboo Craft', 'Furniture Design', 'Musical Instruments'],
    yearsOfExperience: 18,
    joinedDate: 'June 2023',
    productsCount: 31,
    salesCount: 82,
    awards: [
      'Tripura State Handicraft Award (2018)',
      'Recognition for Innovative Bamboo Design, Northeast Handicraft Exhibition (2020)',
    ],
    craftDetails: [
      {
        name: 'Bamboo Furniture Design',
        description:
          "Creating contemporary furniture pieces that showcase bamboo's strength and flexibility while appealing to modern aesthetic preferences.",
        culturalSignificance:
          'Bamboo has been the primary building and crafting material for tribal communities in Tripura for centuries, representing their sustainable relationship with the forest.',
        materials: [
          'Mature Bamboo',
          'Cane',
          'Natural Adhesives',
          'Eco-friendly Finishes',
        ],
      },
      {
        name: 'Traditional Musical Instruments',
        description:
          'Crafting traditional tribal musical instruments like the Sarinda (string instrument), Lebang Boomani (bamboo flute), and Kham (drum) using authentic techniques.',
        culturalSignificance:
          'These instruments are integral to tribal cultural expressions, used in traditional dances, festivals, and rituals that maintain community bonds.',
        materials: ['Bamboo', 'Animal Hide', 'Natural Fibers', 'Local Wood'],
      },
    ],
    products: [
      {
        id: 'p16',
        name: 'Contemporary Bamboo Lounge Chair',
        description:
          'Ergonomically designed lounge chair made from treated bamboo with a minimalist aesthetic that combines traditional craftsmanship with modern design.',
        price: 12500,
        image: '/placeholder.svg?height=300&width=300',
      },
      {
        id: 'p17',
        name: 'Traditional Tripuri Sarinda (String Instrument)',
        description:
          'Authentic bamboo and wood string instrument traditionally played during festivals and ceremonies in Tripura.',
        price: 4800,
        image: '/placeholder.svg?height=300&width=300',
        isLimited: true,
      },
      {
        id: 'p18',
        name: 'Bamboo Room Divider with Tribal Motifs',
        description:
          'Decorative yet functional room divider featuring traditional Tripuri tribal patterns woven into the bamboo structure.',
        price: 8900,
        image: '/placeholder.svg?height=300&width=300',
      },
    ],
  },
];

export var categories = [
  {
    id: '1',
    name: 'Jewelry',
    slug: 'jewelry',
    description:
      'Showcase exquisite handcrafted jewelry from Northeast India, featuring traditional designs and sustainable materials. Each piece embodies the rich cultural heritage and artisanal craftsmanship of the region.',
    bannerImage: '/img/jwelery.jpg',
    culturalContext:
      'Jewelry from Northeast India is more than an accessory – it is a story of tradition, natural beauty, and the resilience of local artisans.',
    artisanQuote:
      'Our jewelry carries the legacy of our land – each design is a celebration of nature and tradition.',
    quoteAuthor: 'Ananya Deka',
    quoteLocation: 'Silversmith, Sualkuchi, Assam',
    materials: [
      'Silver',
      'Gold',
      'Gemstones',
      'Traditional Beads',
      'Natural Dyes',
    ],
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description:
      'Discover traditional and contemporary clothing that blends modern style with ancient techniques, reflecting the vibrant cultures of Northeast India.',
    bannerImage: '/img/clothing.jpg',
    culturalContext:
      'The clothing line celebrates indigenous weaving techniques and fabric artistry, preserving traditional motifs and sustainable practices.',
    artisanQuote:
      'Our fabrics tell tales of heritage, weaving history and innovation into every thread.',
    quoteAuthor: 'Lalhmingpuii Fanai',
    quoteLocation: 'Weaver, Aizawl, Mizoram',
    materials: [
      'Silk',
      'Cotton',
      'Handloom Fabrics',
      'Natural Dyes',
      'Embroidered Details',
    ],
  },
  {
    id: '3',
    name: 'Home Decor',
    slug: 'home-decor',
    description:
      'Enhance your living spaces with artisanal home decor that brings a touch of Northeast Indian tradition and sustainable design to your home.',
    bannerImage: '/img/home-decour.jpg',
    culturalContext:
      'Each home decor piece is a blend of functionality and art, crafted by local artisans using time-honored techniques.',
    artisanQuote:
      'Every decor item is a piece of our heart, transforming homes with a touch of our culture.',
    quoteAuthor: 'Tenzing Lepcha',
    quoteLocation: 'Wood Carver, Gangtok, Sikkim',
    materials: [
      'Wood',
      'Ceramics',
      'Handwoven Textiles',
      'Natural Fibers',
      'Eco-friendly Finishes',
    ],
  },
  {
    id: '4',
    name: 'Art',
    slug: 'art',
    description:
      'Explore captivating artworks that reflect the diverse cultural narratives of Northeast India. Each piece fuses tradition with modern creative expression.',
    bannerImage: '/img/art.png',
    culturalContext:
      'Art is a powerful medium for storytelling in the region, preserving folklore and traditions through innovative expression.',
    artisanQuote:
      'Through art, we share our stories and the beauty of our heritage with the world.',
    quoteAuthor: 'Rajbala Thapa',
    quoteLocation: 'Thangka Painter, Tawang, Arunachal Pradesh',
    materials: [
      'Canvas',
      'Oil Paint',
      'Watercolors',
      'Mixed Media',
      'Hand-carved Wood',
    ],
  },
  {
    id: '5',
    name: 'Accessories',
    slug: 'accessories',
    description:
      'Find unique accessories that reflect the ingenuity of Northeast Indian artisans. From bags to belts, every item is crafted with care and cultural pride.',
    bannerImage: '/img/accessories.jpg',
    culturalContext:
      'Accessories blend utility with aesthetics, embodying sustainable practices and local creative flair.',
    artisanQuote:
      'Our accessories are designed to complement your style while preserving timeless traditions.',
    quoteAuthor: 'Pema Choden',
    quoteLocation: 'Bag Maker, Kohima, Nagaland',
    materials: [
      'Leather',
      'Handwoven Fabrics',
      'Recycled Materials',
      'Natural Dyes',
    ],
  },
  {
    id: '6',
    name: 'Other',
    slug: 'other',
    description:
      'A curated collection of diverse handcrafted items that defy traditional categories yet celebrate innovation and cultural heritage.',
    bannerImage: '/img/others.png',
    culturalContext:
      'These unique pieces reflect the innovative spirit of Northeast Indian artisans, merging tradition with modern techniques.',
    artisanQuote:
      'Innovation and tradition come together in every piece, creating something truly special.',
    quoteAuthor: 'Mohan Rabha',
    quoteLocation: 'Bamboo Artisan, Goalpara, Assam',
    materials: [
      'Recycled Materials',
      'Mixed Media',
      'Upcycled Elements',
      'Natural Finishes',
    ],
  },
];

// Extend the existing artisans array from your previous code
export var artisanData = {
  profileImage: '/img/basket.jpg',
  name: 'Vardan Rastogi',
  location: 'Tripura, India',
  joinedDate: 'March 2025',
  stats: {
    totalSales: 0,
    totalEarnings: 0,
    pendingOrders: 0,
    averageRating: 0,
    reviewCount: 0,
  },
  recentOrders: [],
  messages: [],
  reviews: [],
  products: [
    {
      id: 'p3',
      name: 'Hand-Painted Bamboo Tribal Masks',
      shortDescription:
        'Traditional handcrafted bamboo masks with intricate tribal designs.',
      description:
        "These stunning hand-painted bamboo masks are crafted by skilled artisans using sustainable materials. Inspired by Northeast India's tribal culture, the masks feature bold colors, intricate patterns, and symbolic elements like feathers and metal earrings. Each piece is a unique representation of indigenous artistic heritage.",
      price: 3200,
      image: '/img/mask.jpg',
      additionalImages: [],
      category: 'Handcrafted Decor',
      artisanId: '2',
      isEcoFriendly: true,
    },
  ],
};

// Add products array
export var products = [
  // Textile Products
  {
    id: 'p1',
    name: 'Golden Muga Silk Mekhela Chador with Traditional Motifs',
    shortDescription:
      'Handwoven traditional Assamese two-piece saree with intricate motifs',
    description:
      'Handwoven Muga silk two-piece saree featuring traditional Assamese kingkhap patterns and gos phool motifs on the borders. Each piece takes approximately one month to complete using traditional techniques.',
    price: 15000,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    category: 'Handwoven Textiles',
    artisanId: '1',
    isLimited: true,
    isAwardWinning: true,
    culturalSignificance:
      'The Mekhela Chador is the traditional attire for Assamese women, worn during Bihu festivals and weddings. The motifs represent prosperity and fertility.',
  },
  {
    id: 'p2',
    name: 'Muga Silk Stole with Jaapi Motifs',
    shortDescription:
      'Elegant hand-woven stole with traditional Assamese hat motifs',
    description:
      'Elegant hand-woven stole made from pure Muga silk featuring traditional Jaapi (Assamese hat) motifs along the borders. The natural golden sheen of Muga silk improves with each wash.',
    price: 4500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Handwoven Textiles',
    artisanId: '1',
    isEcoFriendly: true,
  },
  {
    id: 'p13',
    name: 'Traditional Ao Naga Warrior Shawl',
    shortDescription: 'Authentic hand-woven cotton shawl with warrior motifs',
    description:
      'Authentic hand-woven cotton shawl featuring traditional warrior motifs in black, red, and white, symbolizing bravery and status. In Naga tradition, these shawls could only be worn by men who had proven their valor.',
    price: 9500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Handwoven Textiles',
    artisanId: '5',
    isLimited: true,
    culturalSignificance:
      'In Naga tradition, each pattern and color has specific meanings related to tribal identity and achievements. Only those who had performed certain rituals could wear specific designs.',
  },
  {
    id: 'p14',
    name: 'Naturally Dyed Table Runner with Naga Patterns',
    shortDescription: 'Modern table runner with traditional geometric patterns',
    description:
      'Modern table runner featuring traditional Naga geometric patterns, woven with cotton and colored using natural indigo and turmeric dyes. A beautiful way to bring tribal artistry into contemporary homes.',
    price: 3200,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Handwoven Textiles',
    artisanId: '5',
    isEcoFriendly: true,
  },

  // Bamboo & Cane Products
  {
    id: 'p4',
    name: 'Handcrafted Bamboo Coffee Table',
    shortDescription:
      'Elegant coffee table with traditional Rabha tribal patterns',
    description:
      'Elegant coffee table made from mature bamboo with a glass top, featuring traditional Rabha tribal patterns on the legs. Each piece is treated with eco-friendly preservatives for durability.',
    price: 8500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Bamboo & Cane Crafts',
    artisanId: '2',
  },
  {
    id: 'p5',
    name: 'Set of 3 Bamboo Storage Baskets',
    shortDescription: 'Beautifully woven storage baskets in three sizes',
    description:
      'Beautifully woven storage baskets in three sizes, perfect for organizing while adding a natural aesthetic to your home. Each basket features a unique weaving pattern traditional to the Rabha tribe.',
    price: 2200,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Bamboo & Cane Crafts',
    artisanId: '2',
    isEcoFriendly: true,
  },
  {
    id: 'p16',
    name: 'Contemporary Bamboo Lounge Chair',
    shortDescription:
      'Ergonomically designed chair combining tradition with modern design',
    description:
      'Ergonomically designed lounge chair made from treated bamboo with a minimalist aesthetic that combines traditional craftsmanship with modern design. Comfortable, sustainable, and stylish.',
    price: 12500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Bamboo & Cane Crafts',
    artisanId: '6',
    isAwardWinning: true,
  },
  {
    id: 'p18',
    name: 'Bamboo Room Divider with Tribal Motifs',
    shortDescription:
      'Decorative yet functional room divider with traditional patterns',
    description:
      'Decorative yet functional room divider featuring traditional Tripuri tribal patterns woven into the bamboo structure. Perfect for creating separate spaces while maintaining an open feel.',
    price: 8900,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Bamboo & Cane Crafts',
    artisanId: '6',
    isEcoFriendly: true,
  },

  // Pottery Products
  {
    id: 'p7',
    name: 'Longpi Black Pottery Serving Bowl Set',
    shortDescription:
      'Set of three nesting serving bowls with distinctive black finish',
    description:
      'Set of three nesting serving bowls made using traditional Longpi pottery techniques, perfect for modern dining tables. The distinctive black finish is achieved through a special firing process without glazes.',
    price: 3800,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Traditional Pottery',
    artisanId: '3',
    culturalSignificance:
      "Longpi pottery has been integral to Tangkhul Naga culture for centuries. The black color symbolizes the earth and the community's connection to it.",
  },
  {
    id: 'p8',
    name: 'Traditional Longpi Cooking Pot',
    shortDescription:
      'Authentic cooking vessel that enhances flavor and retains heat',
    description:
      "Authentic cooking vessel that enhances flavor and retains heat, ideal for slow-cooking stews and traditional dishes. Made from a mixture of serpentine stone and clay without using a potter's wheel.",
    price: 2500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Traditional Pottery',
    artisanId: '3',
    isEcoFriendly: true,
  },
  {
    id: 'p9',
    name: 'Longpi Tea Set with Bamboo Tray',
    shortDescription:
      'Elegant tea set including teapot and four cups on bamboo tray',
    description:
      'Elegant tea set including teapot and four cups made from Longpi black pottery, served on a handcrafted bamboo tray. Perfect for tea ceremonies and special occasions.',
    price: 5500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Traditional Pottery',
    artisanId: '3',
    isLimited: true,
    isAwardWinning: true,
  },

  // Wood Carving Products
  {
    id: 'p10',
    name: 'Hand-carved Mahakala Wooden Mask',
    shortDescription:
      'Intricately carved ceremonial mask representing a Buddhist deity',
    description:
      'Intricately carved ceremonial mask representing Mahakala, a wrathful deity and protector of Buddhist teachings. Each mask takes several weeks to complete and is used in traditional Cham dance ceremonies.',
    price: 18500,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Wood Carving',
    artisanId: '4',
    isLimited: true,
    isAwardWinning: true,
    culturalSignificance:
      'These masks are essential components of sacred dance ceremonies that are believed to bring blessings and ward off evil spirits.',
  },
  {
    id: 'p11',
    name: 'Wooden Prayer Wheel with Mantra Inscription',
    shortDescription:
      'Traditional hand-carved prayer wheel with Tibetan script',
    description:
      'Traditional hand-carved prayer wheel with the Om Mani Padme Hum mantra inscribed in Tibetan script. Spinning the wheel is believed to spread spiritual blessings and good karma.',
    price: 4200,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Wood Carving',
    artisanId: '4',
    isEcoFriendly: true,
  },
  {
    id: 'p12',
    name: 'Ashtamangala Panel Carving',
    shortDescription:
      'Decorative wooden panel featuring the Eight Auspicious Symbols',
    description:
      'Decorative wooden panel featuring the Eight Auspicious Symbols of Buddhism, intricately carved in relief. A beautiful piece of spiritual art for your home or meditation space.',
    price: 7800,
    image: '/placeholder.svg?height=300&width=300',
    additionalImages: ['/placeholder.svg?height=300&width=300'],
    category: 'Wood Carving',
    artisanId: '4',
    culturalSignificance:
      'The Ashtamangala symbols represent offerings made to Buddha and are considered highly auspicious in Buddhist traditions across the Himalayan region.',
  },
];
