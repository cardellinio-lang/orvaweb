import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const PRODUCTS = [
  {
    name: 'Genouillère de Compression pour Ménisque',
    slug: 'genouillere-de-compression-pour-meniscus',
    price: 2900,
    oldPrice: 3700,
    category: 'Genouillères',
    description: 'Genouillère de compression pour le soutien du ménisque\nConfortable et respirante\nIdéale pour la course, le fitness et la rééducation\nDisponible en plusieurs tailles (S/M/L/XL/XXL)',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-knee-brace-compression-sleeve-for-meniscus-tear-149465.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-knee-brace-compression-sleeve-for-meniscus-tear-273810.jpg',
    ],
  },
  {
    name: 'Sangle Rotulienne pour Course et Randonnée',
    slug: 'sangle-rotulienne-pour-course-et-randonnee',
    price: 2500,
    oldPrice: null,
    category: 'Genouillères',
    description: 'Sangle rotulienne pour soulager la douleur\nAbsorption des chocs\nMaintien de la rotule pendant le sport\nTaille unique avec sangle enfant incluse',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-patellar-tendon-strap-knee-brace-for-running-and-hiking-897516.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-patellar-tendon-strap-knee-brace-for-running-and-hiking-928620.jpg',
    ],
  },
  {
    name: 'Genouillère Légère avec Stabilisateur Latéral',
    slug: 'genouillere-legere-avec-stabilisateur-lateral',
    price: 3500,
    oldPrice: null,
    category: 'Genouillères',
    description: 'Genouillère légère avec stabilisateur latéral PMMA\nCompression ciblée pour soulager la douleur\nPèse seulement 75g par paire\nConfortable pour un usage quotidien\nTailles S/M/L/XL',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-lightweight-knee-compression-sleeves-with-side-stabilizer-141058.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-lightweight-knee-compression-sleeves-with-side-stabilizer-670629.jpg',
    ],
  },
  {
    name: 'Manchons de Compression pour Mollets 1 Paire',
    slug: 'manchons-de-compression-pour-mollets-1-paire',
    price: 3200,
    oldPrice: 3900,
    category: 'Compression',
    description: 'Manchons de compression pour mollets\nTraitement des varices et de l\'insuffisance veineuse\nCompression progressive pour une meilleure circulation\nTailles S/M/L/XL/XXL/3XL/4XL',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-calf-compression-sleeve-for-varicose-vein-treatment-520521.png',
      'https://cambivo.com/cdn/shop/files/cambivo-calf-compression-sleeve-for-varicose-vein-treatment-206689.png',
    ],
  },
  {
    name: 'Genouillère avec Stabilisateurs Latéraux et Coussinet Rotulien',
    slug: 'genouillere-avec-stabilisateurs-lateraux-et-coussinet-rotulien',
    price: 2600,
    oldPrice: null,
    category: 'Genouillères',
    description: 'Genouillère avec stabilisateurs latéraux et coussinet rotulien\nSoulagement de la douleur au genou\nStabilisateur breveté à mémoire de forme à 7 crans\nAnti-dérapant avec bandes silicone',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-knee-brace-with-side-stabilizers-patella-pad-for-knee-pain-relief-617258.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-knee-brace-with-side-stabilizers-patella-pad-for-knee-pain-relief-387144.jpg',
    ],
  },
  {
    name: 'Bande de Compression pour Tennis Elbow',
    slug: 'bande-de-compression-pour-tennis-elbow',
    price: 2500,
    oldPrice: 3000,
    category: 'Coudières',
    description: 'Bande de compression pour le tennis elbow\nSoulagement de la douleur du tendon\nCompression optimale de l\'avant-bras\nTaille unique, lot de 2',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-2-x-tennis-elbow-strap-elbow-brace-with-compression-pad-elbow-support-for-golfers-and-other-activities-719949.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-tennis-elbow-brace-with-compression-pad-for-golfers-4342787.png',
    ],
  },
  {
    name: 'Attelle de Poignet pour Canal Carpien',
    slug: 'attelle-de-poignet-pour-canal-carpien',
    price: 3300,
    oldPrice: null,
    category: 'Poignet',
    description: 'Attelle de poignet avec 3 sangles ajustables\nSoulagement du canal carpien et de l\'arthrite\nDeux stabilisateurs amovibles en aluminium\nTailles S/M/L/XL, pour main gauche ou droite',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-carpal-tunnel-wrist-brace-with-3-adjustable-straps-and-2-palm-sided-stabalizers-for-arthritis-3637876.png',
      'https://cambivo.com/cdn/shop/files/cambivo-carpal-tunnel-wrist-brace-with-3-adjustable-straps-and-2-palm-sided-stabalizers-for-arthritis-3041299.png',
    ],
  },
  {
    name: 'Bande de Compression pour le Coude avec Gel',
    slug: 'bande-de-compression-pour-le-coude-avec-gel',
    price: 2500,
    oldPrice: null,
    category: 'Coudières',
    description: 'Bande de compression pour le coude avec gel pad\nSoulagement de la tendinite et du tennis elbow\nDouble stabilisateur PMMA pour un maintien parfait\nLot de 2, tailles XS/S/M/L/XL',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/products/cambivo-elbow-brace-for-tendonitis-and-tennis-elbow-with-gel-pad-and-dual-stabilizers-2-pack-arm-sleeves-for-women-men-458507.jpg',
      'https://cambivo.com/cdn/shop/products/cambivo-elbow-brace-for-tendonitis-and-tennis-elbow-with-gel-pad-and-dual-stabilizers-2-pack-arm-sleeves-for-women-men-444663.jpg',
    ],
  },
  {
    name: 'Manchons de Compression pour Mollets 3 Paires',
    slug: 'manchons-de-compression-pour-mollets-3-paires',
    price: 3900,
    oldPrice: null,
    category: 'Compression',
    description: 'Manchons de compression pour mollets 3 paires\nMaintien de la stabilité musculaire\nRéduction des tremblements et de la fatigue\nTailles S/M/L/XL/XXL/3XL/4XL',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-compression-calf-sleeves-for-workout-3-pairs-2838450.png',
      'https://cambivo.com/cdn/shop/files/cambivo-compression-calf-sleeves-for-workout-3-pairs-640379.png',
    ],
  },
  {
    name: 'Genouillère Pro 3.0 avec Gel Pad et Stabilisateurs',
    slug: 'genouillere-pro-3-0-avec-gel-pad-et-stabilisateurs',
    price: 2300,
    oldPrice: 3000,
    category: 'Genouillères',
    description: 'Genouillère Pro 3.0 avec stabilisateurs latéraux\nGel pad rotulien à 4 ailes pour un confort maximal\nIdéale pour la rééducation et le sport intensif\nTailles S/M/L/XL',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-30-pro-knee-braces-with-side-stabilizers-patella-gel-pad-916392.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-30-pro-knee-braces-with-side-stabilizers-patella-gel-pad-771903.jpg',
    ],
  },
  {
    name: 'Tapis de Yoga Extra Épais et Grand Format',
    slug: 'tapis-de-yoga-extra-epais-et-grand-format',
    price: 3900,
    oldPrice: null,
    category: 'Tapis',
    description: 'Tapis de yoga extra épais 1/3 pouce\nFormat 183x122 cm\nDouble surface antidérapante\nRésistant à la déchirure\nInclus serviette microfibre, sac et sangles',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-extra-thick-yoga-mat-for-pilates-stretching-651793.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-extra-thick-yoga-mat-for-pilates-stretching-640470.jpg',
    ],
  },
  {
    name: 'Bande de Compression pour Tennis Elbow et Golf',
    slug: 'bande-de-compression-pour-tennis-elbow-et-golf',
    price: 3200,
    oldPrice: 3900,
    category: 'Coudières',
    description: 'Bande de compression pour tennis elbow et golf\nSoulagement de la tendinite et de l\'épicondylite\nCompression ajustable pour un maintien parfait\nTaille unique',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-tennis-elbow-brace-for-tendonitis-golfers-elbow-716555.png',
      'https://cambivo.com/cdn/shop/files/cambivo-tennis-elbow-brace-for-tendonitis-golfers-elbow-137437.png',
    ],
  },
  {
    name: 'Manchon de Compression pour Arthrite et Tendinite',
    slug: 'manchon-de-compression-pour-arthrite-et-tendinite',
    price: 2000,
    oldPrice: null,
    category: 'Coudières',
    description: 'Manchon de compression pour l\'arthrite et la tendinite\nRéduction de la fatigue musculaire\nAmélioration de la circulation sanguine\nTailles XS/S/M/L/XL, lot de 2',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-elbow-compression-sleeve-for-arthritis-tendinitis-598675.png',
      'https://cambivo.com/cdn/shop/files/cambivo-elbow-compression-sleeve-for-arthritis-tendinitis-895251.png',
    ],
  },
  {
    name: 'Chevillère Ajustable avec Sangle de Compression',
    slug: 'chevillere-ajustable-avec-sangle-de-compression',
    price: 3900,
    oldPrice: null,
    category: 'Cheville',
    description: 'Chevillère ajustable avec sangles de compression\nDesign ouvert pour les orteils et le talon\nDeux coussins PE pour une stabilité renforcée\nIdéale pour la rééducation et le sport',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-adjustable-ankle-brace-with-compression-strap-800830.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-adjustable-ankle-brace-with-compression-strap-858524.jpg',
    ],
  },
  {
    name: 'Genouillère Ajustable avec Stabilisateurs Latéraux',
    slug: 'genouillere-ajustable-avec-stabilisateurs-lateraux',
    price: 2300,
    oldPrice: null,
    category: 'Genouillères',
    description: 'Genouillère ajustable anti-frottement\nSangles ajustables pour une compression optimale\nRessorts flexibles latéraux pour la stabilité\nCoussinet gel rotulien pour le confort\nTailles S/M/L/XL',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-adjustable-knee-brace-with-side-stabilizers-for-knee-pain-301459.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-adjustable-knee-brace-with-side-stabilizers-for-knee-pain-940445.jpg',
    ],
  },
  {
    name: 'Chevillère avec Poches de Gel Réutilisables',
    slug: 'chevillere-avec-poches-de-gel-reutilisables',
    price: 3600,
    oldPrice: null,
    category: 'Cheville',
    description: 'Chevillère avec poches de gel réutilisables\nThérapie chaude et froide\nSangles ajustables double velcro\nAnti-fuite et confortable\nPour cheville gauche et droite',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-cold-therapy-reusable-gel-packs-ankle-brace-560681.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-cold-therapy-reusable-gel-packs-ankle-brace-793191.jpg',
    ],
  },
  {
    name: 'Manchon de Compression pour le Coude avec Sangle et Gel',
    slug: 'manchon-de-compression-pour-le-coude-avec-sangle-et-gel',
    price: 3500,
    oldPrice: null,
    category: 'Coudières',
    description: 'Manchon de compression pour le coude avec sangle amovible\nGel pad silicone pour un soulagement ciblé\nTechnologie 3D respirante et anti-transpiration\nIdéal pour le tennis, golf, et musculation',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-elbow-compression-sleeve-with-removable-strap-gel-pad-289698.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-elbow-compression-sleeve-with-removable-strap-gel-pad-822858.jpg',
    ],
  },
  {
    name: 'Manchon de Compression pour Tendinite du Coude',
    slug: 'manchon-de-compression-pour-tendinite-du-coude',
    price: 3600,
    oldPrice: null,
    category: 'Coudières',
    description: 'Manchon de compression pour la tendinite du coude\nTricot 3D premium respirant et évacuant l\'humidité\nFavorise la circulation sanguine\nRéduit l\'enflure et la douleur',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-elbow-compression-sleeve-for-tendonitis-566536.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-elbow-compression-sleeve-for-tendonitis-646151.jpg',
    ],
  },
  {
    name: 'Coude Gel Réutilisable pour Thérapie Froide',
    slug: 'coude-gel-reutilisable-pour-therapie-froide',
    price: 3900,
    oldPrice: null,
    category: 'Coudières',
    description: 'Coude gel réutilisable pour thérapie froide et chaude\nSoulagement de la douleur et de l\'inflammation\nSangles ajustables pour un maintien parfait\nIdéal pour la récupération sportive',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-reusable-gel-cold-therapy-elbow-brace-236338.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-reusable-gel-cold-therapy-elbow-brace-208514.jpg',
    ],
  },
  {
    name: 'Tapis de Yoga Anti-Dérapant pour Fitness',
    slug: 'tapis-de-yoga-anti-derapant-pour-fitness',
    price: 3800,
    oldPrice: null,
    category: 'Tapis',
    description: 'Tapis de yoga anti-dérapant 183x81 cm\nSurface texturée double antidérapante\nÉpaisseur 6mm pour un bon amorti\nLéger et portable avec sangle de transport',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-non-slip-outdoor-yoga-mat-for-fitness-workout-358092.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-non-slip-outdoor-yoga-mat-for-fitness-workout-263939.jpg',
    ],
  },
  {
    name: 'Manchons de Compression avec Pads EVA pour Périostite',
    slug: 'manchons-de-compression-avec-pads-eva-pour-periostite',
    price: 3800,
    oldPrice: null,
    category: 'Compression',
    description: 'Manchons de compression avec pads EVA pour tibias\nCoussinage haute densité pour soulager la douleur\nTricot circulaire pour confort et flexibilité\nTissu respirant 64% nylon, 20% latex, 10% élasthanne',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-calf-compression-sleeves-with-eva-pads-for-shin-splints-439949.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-calf-compression-sleeves-with-eva-pads-for-shin-splints-217421.jpg',
    ],
  },
  {
    name: 'Grand Tapis de Yoga pour Maison et Extérieur',
    slug: 'grand-tapis-de-yoga-pour-maison-et-exterieur',
    price: 3900,
    oldPrice: null,
    category: 'Tapis',
    description: 'Grand tapis de yoga 183x122 cm\nSurface antidérapante à texture laser\nSous-couche ondulée anti-glisse\nProtège les articulations sans sacrifier la stabilité\nInclus serviette microfibre et sangles',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-large-yoga-mat-for-home-outdoor-yoga-913718.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-large-yoga-mat-for-home-outdoor-yoga-644363.jpg',
    ],
  },
  {
    name: 'Sangle Rotulienne Stabilisatrice pour Douleur au Genou',
    slug: 'sangle-rotulienne-stabilisatrice-pour-douleur-au-genou',
    price: 3800,
    oldPrice: null,
    category: 'Genouillères',
    description: 'Sangle rotulienne à double bande\nCompression équilibrée pour le tendon rotulien\nSurface silicone texturée anti-glisse\nDesign ergonomique 3D ajustable\nIdéal pour le saut, course et basketball',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://cambivo.com/cdn/shop/files/cambivo-patellar-tendon-support-strap-patella-stabilizer-knee-brace-for-women-men-patella-band-for-knee-pain-relief-tendonitis-jumpers-knee-9239553.jpg',
      'https://cambivo.com/cdn/shop/files/cambivo-patellar-tendon-support-strap-patella-stabilizer-knee-brace-for-women-men-patella-band-for-knee-pain-relief-tendonitis-jumpers-knee-2833947.jpg',
    ],
  },
  {
    name: 'Tapis de Yoga Antidérapant 6 mm avec Sangles',
    slug: 'tapis-de-yoga-antiderapant-6-mm-avec-sangles',
    price: 3900,
    oldPrice: null,
    category: 'Tapis',
    description: 'Tapis de yoga antidérapant recto verso\nTexture prismatique pour une adhérence maximale\nDimensions 183x61x0.6 cm en TPE de haute qualité\nLéger et portable avec sangles de rangement incluses\nIdéal pour yoga, pilates, gymnastique, méditation',
    color: '#6366f1',
    theme: { btnBg: '#6366f1', btnText: '#fff', btnHover: '#4338ca' },
    images: [
      'https://m.media-amazon.com/images/I/81Z9caS5T9L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/711o6M1rwTL._AC_SL1500_.jpg',
    ],
  },
  {
    name: 'Lunettes de Sport Polarizées BEACOOL UV400',
    slug: 'lunettes-de-sport-polarizees-beacool-uv400',
    price: 3900,
    oldPrice: null,
    category: 'Accessoires',
    description: 'Lunettes de sport polarisées BEACOOL\nVerres TAC polarisés UV400 - Protection UV totale\nMonture TR90 ultra-légère et flexible\nIdéal pour course, vélo, pêche, escalade, baseball, golf, conduite\nPoids plume: seulement 24g\nDesign sans monture - champ de vision large\nNez en caoutchouc antidérapant\nÉtui rigide inclus',
    color: '#222',
    theme: { btnBg: '#222', btnText: '#fff', btnHover: '#fdcb06' },
    images: [
      'https://m.media-amazon.com/images/I/31yZaWKMReS._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/41YC4WuVsRL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/41ibDNrgytL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/41pz6JN0TML._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/41z3dMdwyBL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/41NVyra9fAL._AC_SL1500_.jpg',
    ],
  },
]

async function main() {
  console.log(`Adding ${PRODUCTS.length} products to Orva...`)
  let added = 0
  let skipped = 0

  const existing = await prisma.product.findMany({ select: { slug: true } })
  const existingSlugs = new Set(existing.map(p => p.slug))

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    if (existingSlugs.has(p.slug)) {
      console.log(`  ↺ Skipped (exists): ${p.slug}`)
      skipped++
      continue
    }
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        oldPrice: p.oldPrice,
        category: p.category,
        description: p.description,
        color: p.color,
        theme: p.theme,
        images: JSON.stringify(p.images),
        stock: 0,
        position: 50 + i,
      },
    })
    console.log(`  ✓ Added: ${p.name} (${p.price} DA)`)
    added++
  }

  console.log(`\nDone! Added ${added}, skipped ${skipped} (already exist), total products now: ${await prisma.product.count()}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
