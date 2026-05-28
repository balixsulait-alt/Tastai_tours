import { TourPackage, EastAfricanLandmark, UserReview } from './types';

export const CURRENCY_CONVERSION = {
  USD: 1,
  UGX: 3750,
  KES: 130,
  EUR: 0.92,
  GBP: 0.78,
};

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'zanzibar-getaway',
    title: 'Magical Zanzibar Getaway & Cultural Tour',
    tagline: 'An immersive experience featuring turquoise waters, historic Stone Town, and pristine marine encounters.',
    duration: '5 Days / 4 Nights',
    countries: ['Tanzania'],
    difficulty: 'Easy',
    groupSize: 'Flexible (2 - 12 guests)',
    priceUSD: 1250,
    rating: 4.9,
    reviewsCount: 48,
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548858806-0fa980eb2156?auto=format&fit=crop&w=800&q=80', // Giant tortoise
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', // Clear kayak / Snorkeling
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Sandy beach sunset
      'https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=800&q=80', // Sea turtle
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Heritage',
        description: 'Touch down at Abeid Amani Karume International Airport where your Tastai guide awaits. Relax in premium transport as we transfer to Stone Town. Dive into the historical corridors in the afternoon, followed by a street food dinner at Forodhani Gardens.',
        activities: [
          'Airport greeting & Private AC transfer to hotel',
          'Stone Town Walking Tour: Old Fort, House of Wonders, Former Slave Market',
          'Sunset seafood skewers and spiced juice at active Forodhani Gardens'
        ],
        image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'Coastal Wonders & Historic Giants',
        description: 'Sail out on a traditional wooden dhow to Prison Island. Feed the famous Aldabra giant tortoises, some over 100 years old. Journey onwards to the pristine Nakupenda Sandbank for an afternoon of sand bath, swimming, and an open-air woodfired seafood buffet.',
        activities: [
          'Prison Island historical boat trip and coral reef snorkeling',
          'Interactive experience with giant tortoises',
          'Full luxury seafood spread and tropical fruits on Nakupenda Sandbank'
        ],
        image: 'https://images.unsplash.com/photo-1548858806-0fa980eb2156?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Premium Marine Adventure & Jet Cars',
        description: 'Head North to Matemwe. Embark on a boat ride to the private island sanctuary of Mnemba. Swim alongside pods of wild dolphins and map out the pristine shallow barrier reefs. Wrap up your day with clear kayaking and an exhilarating Jet Car beach drive.',
        activities: [
          'Mnemba Island dolphin tracking and outer-reef snorkeling',
          'Clear kayaking on turquoise shallow waters',
          'High-speed Jet Car beach drive on Matemwe white sands',
          'Private beach sunset bonfire with Swahili acoustic guitarists'
        ],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 4,
        title: 'Aquarium Turtle Swim & Maasai Culture',
        description: 'Visit the natural tidal lagoon of Baraka Aquarium to swim and hand-feed green sea turtles in fully sustainable surrounds. In the afternoon, partake in a Maasai Cultural interaction to learn about traditional folklore, and hop high in their jumping dances.',
        activities: [
          'Swimming and conservation talk with turtles at Baraka Aquarium',
          'Maasai warrior dance interaction and Swahili cooking lesson',
          'Farewell premium dinner with ocean views'
        ],
        image: 'https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 5,
        title: 'Spice Fields & Departure',
        description: 'Squeeze in one last sensory delight: a tour of a family spice farm to touch, peel, and taste fresh cinnamon, vanilla, and cardamom. Transfer back to Zanzibar Airport for your outbound journey.',
        activities: [
          'Sensory Spice Farm Tour with coconut climber masterclass',
          'Handcrafted spice and perfume tasting souvenirs',
          'Airport transfer for flight departure'
        ],
        image: 'https://images.unsplash.com/photo-1596715611244-947e4b584762?auto=format&fit=crop&w=800&q=80'
      }
    ],
    inclusions: [
      'Round-trip flight tickets between Entebbe (EBB) and Zanzibar (ZNZ)',
      'All local ground transfers in spacious private AC vehicles',
      '4 Nights premium beachfront hotel/Airbnb accommodation',
      'Full Board meals (Breakfast, Lunch, Dinner, plus fresh tropical drinks)',
      'Comprehensive Travel Insurance & Evacuation cover',
      'All marine entry taxes, national park fees, and conservation permits',
      'Expert English-speaking Swahili local guides'
    ],
    exclusions: [
      'Visas (if applicable)',
      'Premium vintage wines and spirits at private bars',
      'Souvenirs and personal tipping for guides/crew'
    ]
  },
  {
    id: 'serengeti-migration',
    title: 'Serengeti & Ngorongoro Premium Crater Classic',
    tagline: 'Track the legendary Great Migration across boundless golden savannahs and descend into a volcanic caldera thriving with predators.',
    duration: '6 Days / 5 Nights',
    countries: ['Tanzania'],
    difficulty: 'Moderate',
    groupSize: 'Flexible (4 - 7 guests per vehicle)',
    priceUSD: 2450,
    rating: 5.0,
    reviewsCount: 39,
    heroImage: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80', // Zebra migration
      'https://images.unsplash.com/photo-1620608518868-b7ebba0bad50?auto=format&fit=crop&w=800&q=80', // Lion pride
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', // Safari truck
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arusha to Ngorongoro Highland',
        description: 'Depart from Arusha in our robust 4x4 land cruisers with pop-up roofs. Drive past scenic coffee estates up into the mist-shrouded green volcanic craters. Check into a luxurious safari lodge overlooking the grand sunset.',
        activities: [
          '4x4 Land Cruiser pickup and scenic mountain highway drive',
          'Chamber views overlooking the Ngorongoro Conservation Area',
          'Introduction briefing and exquisite culinary dinner'
        ],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'Crater Floor Exploration',
        description: 'Descend 600 meters down into the world’s largest intact volcanic caldera. Meet the endangered Black Rhino, scan sleeping lion prides, and watch thousands of pink flamingos wading in Lake Magadi.',
        activities: [
          'Full-day game drive inside the spectacular crater bowl',
          'Gourmet picnic lunch next to the Hippo Sanctuaries',
          'Vibrant bird watching and tracking Cheetah maneuvers'
        ],
        image: 'https://images.unsplash.com/photo-1620577884617-6ff42ae2a065?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Boundless Golden Serengeti',
        description: 'Ascend out of the caldera and head toward the endless plains of the Serengeti. Stop at a historic Maasai boma before entering the park boundaries for an afternoon of sweeping big cat action.',
        activities: [
          'Scenic drive into Serengeti plains via Oldupai Gorge archaeological site',
          'Traditional welcome ceremony by high-jumping Maasai warriors',
          'First Golden Hour Serengeti game drive'
        ],
        image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 4,
        title: 'Following the Great Migration Loop',
        description: 'Dedicate the entire day to tracking the mega-herds. Millions of wildebeests and zebras move through the Mara river zone. Feel the ground rhythm as they march in unified columns.',
        activities: [
          'Pre-dawn savannah tracking (best predator feeding times)',
          'Observing active river crossing scenes from safe ranger cliffs',
          'Champagne bush sunset overlooking the vast plains'
        ],
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 5,
        title: 'Dawn Balloon Flight & Seronera Valley',
        description: 'Enjoy an optional serene hot-air balloon ride over the Serengeti treetops at sunrise, followed by scanning big leopards on acacia branches in the dynamic Seronera riverbed.',
        activities: [
          'Sunrise hot air balloon safari (optional add-on) with bush breakfast',
          'Deep game drive tracking elusive leopards & tree-climbing lions',
          'Luxury buffet celebration dinner at our permanent safari tent camp'
        ],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 6,
        title: 'Arusha Return',
        description: 'Pack memories and artifacts. Take a morning final game drive out of Serengeti as we drive or fly back to Arusha/Kilimanjaro for your return schedules.',
        activities: [
          'Out-bound game drive tracking giraffes and hyena packs',
          'Drop-off at Kilimanjaro International Airport (JRO)'
        ],
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
      }
    ],
    inclusions: [
      'Fully private 4x4 Custom Land Cruiser with pop-up roof and charges/fuel',
      'All national park entry fees and conservation crater taxes',
      'Full board standard at luxury safari lodges and tented camps',
      'Professional certified field guides who are birding experts',
      'Unlimited ice-cold drinking water and custom snack boxes in vehicle',
      'Private Maasai village entry and traditional contribution fees',
      'Flying Doctors AMREF emergency medical evacuation cover'
    ],
    exclusions: [
      'Visas and tipping guidelines (approx $20/day recommended for guides)',
      'Hot Air Balloon Safaris (can be selected as add-on during booking)'
    ]
  },
  {
    id: 'gorilla-bwindi',
    title: 'Bwindi Impenetrable Jungle & Gorilla Trekking Classic',
    tagline: 'Gaze into the eyes of humanity’s closest wild relatives. Traverse Uganda’s ancient mist-capped equatorial rainforest.',
    duration: '4 Days / 3 Nights',
    countries: ['Uganda'],
    difficulty: 'Challenging',
    groupSize: 'Max 8 guests per gorilla family tracker',
    priceUSD: 1850,
    rating: 4.8,
    reviewsCount: 33,
    heroImage: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=800&q=80', // Gorilla closeup
      'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80', // Gorilla in bamboo forest
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80', // Misty forest canopy
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kampala to Mist-Capped Highlands',
        description: 'Depart Kampala early. Cross the Uganda Equator for a iconic photo-session. Pass green crop farms and rolling hills of Kabale before ascending into Bwindi forest heights.',
        activities: [
          'Private modern travel cruiser pickup and equator experiments stop',
          'Traditional Ugandan lunch in Mbarara (famous Ankole beef)',
          'Check-in at beautiful forest lodge facing canopy trees'
        ],
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'Meeting the Mountain Gorillas',
        description: 'Gather at the ranger station for tracking rules. Head deep into thick tropical vines under guidance of armed trackers. After trekking, spend a magical one-hour standing blocks away from a silverback family.',
        activities: [
          'Official ranger brief and split into tracking cohorts',
          'Trekking ancient steep forests (2 to 6 hours depending on gorillas)',
          'Savoring the close proximity encounter with silverbacks and babies',
          'Award of official Gorilla Tracking accomplishment certificates'
        ],
        image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Batwa Tribal Interaction & Lake Bunyonyi',
        description: 'Hike through Bwindi borders with the indigenous Batwa community, learning jungle tracking wisdom and tree medicines. Drive to Lake Bunyonyi (Africa’s deepest lake) for a wooden canoe ride at sunset.',
        activities: [
          'Cultural trek with Batwa forest protectors',
          'Private boat cruise over Bunyonyi’s islands with storytelling guides',
          'Fresh lake crayfish bonfire feast and storytelling'
        ],
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 4,
        title: 'Kampala Outbound via Royal Drumsmakers',
        description: 'Begin journey back to Entebbe/Kampala. Make a cultural stopover at the Royal Drum Makers of Mpambire to learn centuries-old woodcarving secrets.',
        activities: [
          'Scenic morning drive past continuous terraced tea-fields',
          'Hands-on drum making session with traditional craftsmen',
          'Transfer to Entebbe Airport (EBB) for departures'
        ],
        image: 'https://images.unsplash.com/photo-1596715611244-947e4b584762?auto=format&fit=crop&w=800&q=80'
      }
    ],
    inclusions: [
      'Official Gorilla Tracking Permit (worth $800, guaranteed on booking)',
      'Spacious modern transport and certified full fuel allowances',
      '3 Nights luxury jungle lodge accommodation with high views',
      'Full Board chef-curated meals and local organic coffees',
      'Professional certified armed forest rangers and trackers',
      'All tribal contributions and community compensation fees',
      'Free loan of specialized trekking hiking poles and gaiters'
    ],
    exclusions: [
      'Personal porter hire fees at trailhead ($20 recommended to support locals)',
      'Outbound tips for trackers and hotel culinary staff'
    ]
  },
  {
    id: 'nakuru-flamingos',
    title: 'Pink Flamingos of Lake Nakuru & Rift Valley Express',
    tagline: 'Witness the breathtaking spectacle of millions of pink flamingos wading in the soda waters of Kenya’s bird sanctuary.',
    duration: '3 Days / 2 Nights',
    countries: ['Kenya'],
    difficulty: 'Easy',
    groupSize: 'Flexible (2 - 8 guests)',
    priceUSD: 1150,
    rating: 4.9,
    reviewsCount: 25,
    heroImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534951009808-766178b47a4f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Lake Nakuru National Park',
        description: 'Depart Nairobi in the morning. Make a breathtaking stop at the Great Rift Valley viewpoint before descending to Lake Nakuru. Arrive in time for an afternoon game drive focusing on rare Rothschild Giraffes and rhinos.',
        activities: [
          'Pick up in Nairobi in a premium 4x4 Tour cruiser',
          'Rift Valley scenic photography and local curio brief',
          'First afternoon game drive tracking white and black rhinos'
        ],
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'The Great Flamingo Pink Shimmer',
        description: 'Take a dawn walk directly to the soda banks of Lake Nakuru. Watch millions of pink lesser and greater flamingos feeding on algae, creating a massive shimmering pink horizon.',
        activities: [
          'Dawn bird watching and macro-photography lake walk with expert ornithologist',
          'Panoramic scenic hike to Baboon Cliff overlook',
          'Post-lunch game drive to track lions, waterbucks, and leopards'
        ],
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Return to Nairobi with Curio Shopping',
        description: 'Have a scenic warm breakfast overlooking Lake Nakuru. Embark on a final short outbound game drive and return comfortably back to Nairobi for flights.',
        activities: [
          'Morning exit game drive tracking leopards',
          'Airport transfer to Jomo Kenyatta International Airport (NBO)'
        ],
        image: 'https://images.unsplash.com/photo-1534951009808-766178b47a4f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    inclusions: [
      'All local ground transfers in 4x4 Safari cruiser with pop-up roof',
      'Park entry tickets and local conservancy fees',
      '2 Nights full board luxury resort stay overlooking the lake',
      'Professional English-speaking ornithology certified guide',
      'Bottled mineral water throughout the tour'
    ],
    exclusions: [
      'International flights and visas',
      'Tips and personal laundry expenses'
    ]
  },
  {
    id: 'kibale-primates',
    title: 'Kibale Forest Primate Capital & Chimpanzee Habituation',
    tagline: 'Walk through Uganda’s leading primate haven to habituate and meet our closest primate relatives, the Chimpanzees.',
    duration: '3 Days / 2 Nights',
    countries: ['Uganda'],
    difficulty: 'Moderate',
    groupSize: 'Max 6 guests per guide',
    priceUSD: 1450,
    rating: 4.9,
    reviewsCount: 18,
    heroImage: 'https://images.unsplash.com/photo-1540573133-75b52b41a2a5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540573133-75b52b41a2a5?auto=format&fit=crop&w=800&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kampala to Primate Capital',
        description: 'Journey westwards past the historical tea plantations of Fort Portal. Enter the misty, echoing borders of Kibale Forest National Park, home to 13 distinct primate species.',
        activities: [
          'Morning comfortable pickup from hotel in Kampala',
          'Delightful traditional lunch in Fort Portal town',
          'Check-in at luxurious canopy-level primate cottages'
        ],
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'Chimpanzee Habituation Encounter',
        description: 'Spend an full day with rangers participating in chimpanzee habituation. Track chimpanzees as they awaken, feed, groom, and nest in high sycamore branches.',
        activities: [
          'Full-day primate habituation permissions and expert instruction briefing',
          'Observing nests, vocal calls, social structures, and chimpanzees moving in low trees',
          'Afternoon swamp walk in Bigodi Wetlands Sanctuary for birds and monkeys'
        ],
        image: 'https://images.unsplash.com/photo-1540573133-75b52b41a2a5?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Fort Portal Crater Lakes & Return',
        description: 'Excursion through Fort Portal’s gorgeous volcanic crater fields for scenic view points before private transfer back to Kampala/Entebbe.',
        activities: [
          'Hike to "Top of the World" crater viewpoint',
          'Transfer back to Kampala or Entebbe airport'
        ],
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
      }
    ],
    inclusions: [
      'Official Chimpanzee Tracking & Habituation Permits',
      'All local ground transfers with certified fuel guides',
      '2 Nights premium forest cottages with chef dinners',
      'Expert armed forest park conservation rangers',
      'Bigodi Wetland swamp walk entrance fees'
    ],
    exclusions: [
      'Personal tracking items and tipping guide services'
    ]
  },
  {
    id: 'ishasha-lions',
    title: 'Queen Elizabeth Savannah & Tree-climbing Lions Safari',
    tagline: 'Scan the iconic Ishasha plains for rare lions draped in acacia branches, and ride a yacht past hippopotamuses.',
    duration: '4 Days / 3 Nights',
    countries: ['Uganda'],
    difficulty: 'Easy',
    groupSize: 'Max 7 guests per cruiser',
    priceUSD: 1350,
    rating: 4.8,
    reviewsCount: 22,
    heroImage: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620608518868-b7ebba0bad50?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Scenic Drive to Northern Savannahs',
        description: 'Depart Entebbe/Kampala. Arrive in Queen Elizabeth National Park. Experience an evening drive looking for leopards and Uganda Kobs.',
        activities: [
          'Equator photo-stop and private cruiser transfer',
          'Introductory evening game drive in northern Kasenyi Plains',
          'Exquisite campfire buffet of local Tilapia and beef skewers'
        ],
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'Kazinga Channel Yacht Cruise & Explosion Craters',
        description: 'Embark on a luxury morning navigation of Kazinga Channel, wiggling between thousands of snorting hippopotamuses, herds of bathing elephants, and giant crocodiles.',
        activities: [
          'Comfortable 2-hour channel water safari with ranger narrative',
          'Fascinating scenic loop drive past Katwe Salt Explosion Craters',
          'Traditional Swahili organic tea tasting session at pool side'
        ],
        image: 'https://images.unsplash.com/photo-1620608518868-b7ebba0bad50?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Ishasha Sector Tree-Climbing Lion Search',
        description: 'Move south to the unique Ishasha sector. Search the branches of giant fig trees where lions sleep through hot afternoons to escape ants.',
        activities: [
          'Extensive tracking drive inside Ishasha savannah woodlands',
          'Observing pride behavior in acacia sub-canopies',
          'Crowning champagne picnic lunch on Ishasha river borders'
        ],
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 4,
        title: 'Mbarara Return and Handcraft Brief',
        description: 'Exit Queen Elizabeth with memories, returning to Kampala via Igongo Cultural Center for traditional lunch and craft souvenirs.',
        activities: [
          'Igongo museum tour and traditional Ankole heritage brief',
          'Airport transfer to EBB'
        ],
        image: 'https://images.unsplash.com/photo-1596715611244-947e4b584762?auto=format&fit=crop&w=800&q=80'
      }
    ],
    inclusions: [
      'Kazinga Channel boat safari tickets and private deck entries',
      'All vehicle and fuel charges across game preserves',
      '3 Nights premium hotel stays facing volcanic lakes',
      'Park entry permissions and local conservation taxes',
      'Expert certified Ugandan wildlife drivers'
    ],
    exclusions: [
      'Souvenir tips and personal beverage tabs'
    ]
  }
];

export const EAST_AFRICAN_LANDMARKS: EastAfricanLandmark[] = [
  {
    id: 'serengeti-plains',
    name: 'Serengeti National Park',
    country: 'Tanzania',
    coordinates: { x: 48, y: 55 },
    description: 'A massive UNESCO heritage site hosting the legendary Great Wildebeest Migration - over 1.5 million mammals on a continuous loop.',
    image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=600&q=80',
    highlight: 'Great Wildebeest & Zebra migration loops and high lion density.',
    bestTimeToVisit: 'June to October (Dry crossings) & January to March (Calving)',
    elevationOrFeature: 'Continuous grasslands over 14,750 km²'
  },
  {
    id: 'bwindi-forest',
    name: 'Bwindi Impenetrable National Park',
    country: 'Uganda',
    coordinates: { x: 22, y: 48 },
    description: 'An ancient mist-veiled forest canopy containing over half of the entire remaining global population of endangered Mountain Gorillas.',
    image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=600&q=80',
    highlight: 'Close quarter mountain gorilla trekking and diverse unique birds.',
    bestTimeToVisit: 'December to February & June to August',
    elevationOrFeature: 'Prehistoric thick rainforest, 1,160m to 2,600m altitude'
  },
  {
    id: 'zanzibar-island',
    name: 'Zanzibar Archipelago (Stone Town & Reefs)',
    country: 'Tanzania',
    coordinates: { x: 88, y: 72 },
    description: 'A magical Indian ocean coastline blending Arabesque palaces, Spice fields, Aldabra tortoises, and blue snorkeling paradises.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80',
    highlight: 'Clear kayaking, wild dolphin swims, Nakupenda sandbanks, and historical Stone Town tours.',
    bestTimeToVisit: 'All year round (avoid heavy rain in April-May)',
    elevationOrFeature: 'Warm water reefs over white coral sandy beaches'
  },
  {
    id: 'maasai-mara',
    name: 'Maasai Mara National Reserve',
    country: 'Kenya',
    coordinates: { x: 55, y: 45 },
    description: 'The golden crown of Kenyan conservation, famous for the Mara River crossings, majestic cheetah squads, and local Maasai moran homesteads.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80',
    highlight: 'Stunning hot-air ballooning and close-quarters cheetah hunts.',
    bestTimeToVisit: 'July to October (Migration season)',
    elevationOrFeature: 'Classic African acacia savannah grassland'
  },
  {
    id: 'nakuru-lake',
    name: 'Lake Nakuru National Park',
    country: 'Kenya',
    coordinates: { x: 62, y: 38 },
    description: 'A world-famous bird sanctuary filled with millions of shimmering pink flamingos and home to protected black and white rhinos.',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
    highlight: 'Spectacular pink shoreline flamingo feeding and rhino tracking.',
    bestTimeToVisit: 'July to March',
    elevationOrFeature: 'Alkaline Soda Lake, 1,755m elevation'
  },
  {
    id: 'kibale-forest',
    name: 'Kibale National Park',
    country: 'Uganda',
    coordinates: { x: 30, y: 36 },
    description: 'Primate capital of the world housing over 1,500 chimpanzees and 13 distinct monkey species across wild tropical forests.',
    image: 'https://images.unsplash.com/photo-1540573133-75b52b41a2a5?auto=format&fit=crop&w=600&q=80',
    highlight: 'Chimpanzee Habituation walks and monkey swamp trails.',
    bestTimeToVisit: 'June to September & December to February',
    elevationOrFeature: 'Ancient moist evergreen forest canopy'
  },
  {
    id: 'ishasha-sector',
    name: 'Queen Elizabeth National Park',
    country: 'Uganda',
    coordinates: { x: 19, y: 52 },
    description: 'Scenic savannah plains famous for the rare, unique spectacle of resident tree-climbing lions resting in sycamore fig tree branches.',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80',
    highlight: 'Tree-climbing lions tracking and Kazinga Channel boat safari.',
    bestTimeToVisit: 'January to February & June to August',
    elevationOrFeature: 'Acacia woodlands and river channels'
  },
  {
    id: 'murchison-falls',
    name: 'Murchison Falls National Park',
    country: 'Uganda',
    coordinates: { x: 28, y: 32 },
    description: 'Witness the expansive Nile River squeeze into a tight 7-meter gorge before exploding into a deafening 43-meter vertical waterfall.',
    image: 'https://images.unsplash.com/photo-1596715611244-947e4b584762?auto=format&fit=crop&w=600&q=80',
    highlight: 'Scenic delta boat cruises, giant Nile crocodiles, and massive elephant herds.',
    bestTimeToVisit: 'January to March & June to September',
    elevationOrFeature: 'The world’s most powerful single waterfall'
  },
  {
    id: 'kilimanjaro-mt',
    name: 'Mount Kilimanjaro',
    country: 'Tanzania',
    coordinates: { x: 68, y: 60 },
    description: 'The spectacular Roof of Africa: the tallest free-standing mountain in the world, climbing through five unique ecological niches to glaciers.',
    image: 'https://images.unsplash.com/photo-1609137144814-681b858f0cf4?auto=format&fit=crop&w=600&q=80',
    highlight: 'Hiking to the snowy peak of Uhuru point (5,895m) without technical ropes.',
    bestTimeToVisit: 'January to March & July to October',
    elevationOrFeature: 'Snowy volcanic peak at 5,895 meters above sea level'
  }
];

export const TESTIMONIALS: UserReview[] = [
  {
    id: 'rev-1',
    author: 'Clara Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-04-12',
    packageName: 'Magical Zanzibar Getaway & Cultural Tour',
    reviewText: 'This was a dream! Swimming with green sea turtles at Baraka Aquarium was surreal. Our Tastai guide knew everyone in Stone Town, which made the historical walk feel like we had keys to the city. No hidden charges indeed!',
    tags: ['Zanzibar', 'Seafood', 'Culture'],
    verified: true,
    likes: 12
  },
  {
    id: 'rev-2',
    author: 'Dr. Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-05-01',
    packageName: 'Serengeti & Ngorongoro Premium Crater Classic',
    reviewText: 'We tracking the migration herds and saw leopards feeding twice! The Land Cruiser was immaculate with charging points, ice cold water, and comfortable suspension. Tastai Safaris coordination was top tier from arrival to exit.',
    tags: ['Safari', 'Luxury', 'Wildlife'],
    verified: true,
    likes: 24
  },
  {
    id: 'rev-3',
    author: 'Aiko Tanaka',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-05-18',
    packageName: 'Bwindi Impenetrable Jungle & Gorilla Trekking Classic',
    reviewText: 'Climbing Bwindi is physically challenging but standing six feet away from a giant wild Silverback makes all of it fade away. Tastai provided amazing walking poles and professional gaiters without charges.',
    tags: ['Gorilla', 'Adventure', 'Uganda'],
    verified: true,
    likes: 19
  }
];
export const EMERGENCY_NUMBERS = [
  { title: 'Tastai Head Office (Kampala)', phone: '+256 779 726 158' },
  { title: 'Emergency Duty Officer', phone: '+256 787 739 508' },
  { title: 'AMREF Flying Doctors', phone: '+254 206 992 299' },
  { title: 'Zanzibar Tourism Safety Board', phone: '+255 242 233 456' }
];

export const REMOTE_SURVIVAL_GUIDE = [
  {
    title: 'Offline GPS Tracking',
    tips: ['Prior to set off, download maps offline on Google Maps or Maps.me.', 'Toggle your device to Battery Saver mode as continuous location search consumes charge.']
  },
  {
    title: 'What to Pack for Trekking',
    tips: ['Comfortable, long thick socks (to pull over hiking pants to block safari ants).', 'Light waterproof rain jacket and reusable hydration flasks.']
  },
  {
    title: 'Wildlife Safety Rules',
    tips: ['Keep completely quiet on gorilla sightings and stay 7-10 meters back.', 'Do not stick limbs, hands, or cameras out of the pop-up roof when tracking big cats.']
  }
];
