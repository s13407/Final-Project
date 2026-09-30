import { UniversityProgram } from '../types';

// Complete list of all 195+ sovereign countries and major study territories of the world
export const ALL_WORLD_COUNTRIES = [
  'Anywhere / Global',
  'Pakistan',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'United Arab Emirates',
  'Saudi Arabia',
  'Singapore',
  'Turkey',
  'Malaysia',
  'China',
  'Japan',
  'South Korea',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Ireland',
  'New Zealand',
  'Qatar',
  'India',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Chile',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'DR Congo',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'Gabon',
  'Gambia',
  'Georgia',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'Indonesia',
  'Iran',
  'Iraq',
  'Israel',
  'Jamaica',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

// Alias for backwards compatibility across all components
export const POPULAR_COUNTRIES = ALL_WORLD_COUNTRIES;

export const POPULAR_CITIES = [
  'Any City / Flexible',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'London',
  'Oxford',
  'Cambridge',
  'Manchester',
  'Edinburgh',
  'Boston',
  'New York',
  'San Francisco / Bay Area',
  'Los Angeles',
  'Chicago',
  'Austin',
  'Toronto',
  'Vancouver',
  'Montreal',
  'Waterloo',
  'Melbourne',
  'Sydney',
  'Brisbane',
  'Munich',
  'Berlin',
  'Heidelberg',
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Riyadh',
  'Jeddah',
  'Singapore',
  'Tokyo',
  'Kyoto',
  'Seoul',
  'Beijing',
  'Shanghai',
  'Paris',
  'Rome',
  'Milan',
  'Madrid',
  'Barcelona',
  'Amsterdam',
  'Zurich',
  'Dublin',
  'Kuala Lumpur',
  'Istanbul',
  'Doha'
] as const;

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  Pakistan: [
    'Any City / Flexible',
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Peshawar',
    'Faisalabad',
    'Multan',
    'Quetta',
    'Hyderabad',
    'Gujranwala',
    'Sialkot',
    'Abbottabad',
    'Bahawalpur',
    'Sukkur',
    'Gilgit'
  ],
  'United States': [
    'Any City / Flexible',
    'Boston',
    'New York',
    'San Francisco / Bay Area',
    'Los Angeles',
    'Chicago',
    'Austin',
    'Seattle',
    'Pittsburgh',
    'Philadelphia',
    'Atlanta',
    'San Diego',
    'Washington D.C.',
    'Houston',
    'Dallas',
    'Ann Arbor'
  ],
  'United Kingdom': [
    'Any City / Flexible',
    'London',
    'Oxford',
    'Cambridge',
    'Manchester',
    'Edinburgh',
    'Birmingham',
    'Bristol',
    'Glasgow',
    'Leeds',
    'Sheffield',
    'Nottingham',
    'Warwick',
    'Southampton'
  ],
  Canada: [
    'Any City / Flexible',
    'Toronto',
    'Vancouver',
    'Montreal',
    'Waterloo',
    'Ottawa',
    'Calgary',
    'Edmonton',
    'Quebec City',
    'Halifax',
    'Victoria'
  ],
  Australia: [
    'Any City / Flexible',
    'Melbourne',
    'Sydney',
    'Brisbane',
    'Canberra',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Hobart'
  ],
  Germany: [
    'Any City / Flexible',
    'Munich',
    'Berlin',
    'Heidelberg',
    'Aachen',
    'Frankfurt',
    'Stuttgart',
    'Hamburg',
    'Freiburg',
    'Tubingen',
    'Bonn',
    'Göttingen'
  ],
  'United Arab Emirates': [
    'Any City / Flexible',
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Al Ain'
  ],
  'Saudi Arabia': [
    'Any City / Flexible',
    'Riyadh',
    'Jeddah',
    'Dhahran',
    'Dammam',
    'Mecca',
    'Medina',
    'Khobar'
  ],
  Singapore: ['Any City / Flexible', 'Singapore'],
  Turkey: [
    'Any City / Flexible',
    'Istanbul',
    'Ankara',
    'Izmir',
    'Bursa',
    'Antalya',
    'Eskisehir',
    'Trabzon'
  ],
  Malaysia: [
    'Any City / Flexible',
    'Kuala Lumpur',
    'Penang',
    'Johor Bahru',
    'Cyberjaya',
    'Subang Jaya',
    'Petaling Jaya'
  ],
  China: [
    'Any City / Flexible',
    'Beijing',
    'Shanghai',
    'Shenzhen',
    'Hangzhou',
    'Guangzhou',
    'Wuhan',
    'Nanjing',
    'Chengdu',
    'Xi\'an',
    'Hong Kong'
  ],
  Japan: [
    'Any City / Flexible',
    'Tokyo',
    'Kyoto',
    'Osaka',
    'Nagoya',
    'Sendai',
    'Fukuoka',
    'Sapporo',
    'Tsukuba',
    'Kobe'
  ],
  'South Korea': [
    'Any City / Flexible',
    'Seoul',
    'Busan',
    'Daejeon',
    'Incheon',
    'Daegu',
    'Gwangju',
    'Suwon'
  ],
  France: [
    'Any City / Flexible',
    'Paris',
    'Lyon',
    'Toulouse',
    'Marseille',
    'Grenoble',
    'Bordeaux',
    'Strasbourg',
    'Lille',
    'Montpellier'
  ],
  Italy: [
    'Any City / Flexible',
    'Rome',
    'Milan',
    'Bologna',
    'Florence',
    'Turin',
    'Venice',
    'Naples',
    'Pisa',
    'Padua'
  ],
  Spain: [
    'Any City / Flexible',
    'Madrid',
    'Barcelona',
    'Valencia',
    'Seville',
    'Granada',
    'Salamanca',
    'Bilbao'
  ],
  Netherlands: [
    'Any City / Flexible',
    'Amsterdam',
    'Delft',
    'Rotterdam',
    'Utrecht',
    'Eindhoven',
    'Leiden',
    'Groningen',
    'Maastricht'
  ],
  Switzerland: [
    'Any City / Flexible',
    'Zurich',
    'Geneva',
    'Lausanne',
    'Basel',
    'Bern',
    'St. Gallen'
  ],
  Sweden: [
    'Any City / Flexible',
    'Stockholm',
    'Lund',
    'Gothenburg',
    'Uppsala',
    'Linköping'
  ],
  Ireland: [
    'Any City / Flexible',
    'Dublin',
    'Cork',
    'Galway',
    'Limerick',
    'Maynooth'
  ],
  'New Zealand': [
    'Any City / Flexible',
    'Auckland',
    'Wellington',
    'Christchurch',
    'Dunedin',
    'Hamilton'
  ],
  Qatar: ['Any City / Flexible', 'Doha', 'Education City'],
  India: [
    'Any City / Flexible',
    'New Delhi',
    'Mumbai',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad'
  ],
  Egypt: ['Any City / Flexible', 'Cairo', 'Alexandria', 'Giza'],
  'South Africa': [
    'Any City / Flexible',
    'Cape Town',
    'Johannesburg',
    'Pretoria',
    'Durban',
    'Stellenbosch'
  ],
  Brazil: [
    'Any City / Flexible',
    'São Paulo',
    'Rio de Janeiro',
    'Brasília',
    'Campinas',
    'Belo Horizonte'
  ],
  Indonesia: [
    'Any City / Flexible',
    'Jakarta',
    'Bandung',
    'Yogyakarta',
    'Surabaya',
    'Depok'
  ],
  Russia: [
    'Any City / Flexible',
    'Moscow',
    'Saint Petersburg',
    'Novosibirsk',
    'Kazan',
    'Tomsk'
  ],
  Austria: [
    'Any City / Flexible',
    'Vienna',
    'Graz',
    'Innsbruck',
    'Salzburg',
    'Linz'
  ],
  Belgium: [
    'Any City / Flexible',
    'Brussels',
    'Leuven',
    'Ghent',
    'Antwerp',
    'Louvain-la-Neuve'
  ],
  Denmark: ['Any City / Flexible', 'Copenhagen', 'Aarhus', 'Odense', 'Aalborg'],
  Norway: ['Any City / Flexible', 'Oslo', 'Bergen', 'Trondheim', 'Tromsø'],
  Finland: ['Any City / Flexible', 'Helsinki', 'Espoo', 'Tampere', 'Turku', 'Oulu'],
  Poland: ['Any City / Flexible', 'Warsaw', 'Krakow', 'Wroclaw', 'Poznan', 'Gdansk'],
  Portugal: ['Any City / Flexible', 'Lisbon', 'Porto', 'Coimbra', 'Braga'],
  Mexico: [
    'Any City / Flexible',
    'Mexico City',
    'Monterrey',
    'Guadalajara',
    'Puebla'
  ],
  Argentina: ['Any City / Flexible', 'Buenos Aires', 'Cordoba', 'Rosario', 'La Plata'],
  Chile: ['Any City / Flexible', 'Santiago', 'Valparaiso', 'Concepcion'],
  Colombia: ['Any City / Flexible', 'Bogota', 'Medellin', 'Cali', 'Barranquilla'],
  Philippines: ['Any City / Flexible', 'Manila', 'Quezon City', 'Cebu City'],
  Thailand: ['Any City / Flexible', 'Bangkok', 'Chiang Mai', 'Phuket'],
  Vietnam: ['Any City / Flexible', 'Hanoi', 'Ho Chi Minh City', 'Da Nang'],
  Bangladesh: ['Any City / Flexible', 'Dhaka', 'Chittagong', 'Sylhet'],
  'Sri Lanka': ['Any City / Flexible', 'Colombo', 'Kandy', 'Peradeniya'],
  Nigeria: ['Any City / Flexible', 'Lagos', 'Abuja', 'Ibadan', 'Nsukka'],
  Kenya: ['Any City / Flexible', 'Nairobi', 'Mombasa', 'Eldoret'],
  Morocco: ['Any City / Flexible', 'Rabat', 'Casablanca', 'Marrakech', 'Fes'],
  Jordan: ['Any City / Flexible', 'Amman', 'Irbid', 'Zarqa'],
  Kuwait: ['Any City / Flexible', 'Kuwait City', 'Shuwaikh'],
  Oman: ['Any City / Flexible', 'Muscat', 'Salalah', 'Sohar'],
  Bahrain: ['Any City / Flexible', 'Manama', 'Sakhir'],
  'Anywhere / Global': [
    'Any City / Flexible',
    'Karachi',
    'Lahore',
    'Islamabad',
    'London',
    'Oxford',
    'Cambridge',
    'New York',
    'Boston',
    'San Francisco / Bay Area',
    'Toronto',
    'Vancouver',
    'Melbourne',
    'Sydney',
    'Munich',
    'Berlin',
    'Dubai',
    'Riyadh',
    'Singapore',
    'Tokyo',
    'Seoul',
    'Paris',
    'Zurich',
    'Amsterdam'
  ]
};

export const getCitiesForCountry = (country?: string): string[] => {
  if (!country || country === 'ALL' || country.includes('Anywhere')) {
    return CITIES_BY_COUNTRY['Anywhere / Global'];
  }
  if (CITIES_BY_COUNTRY[country]) {
    return CITIES_BY_COUNTRY[country];
  }
  // Generic capital/main city placeholder for other world countries
  return ['Any City / Flexible', `${country} Capital / Metro`, 'Main Campus Area'];
};

// Curated initial repository of premier universities across continents
export const UNIVERSITY_PROGRAMS: UniversityProgram[] = [
  // --- PAKISTAN ---
  {
    id: 'prog-pk-1',
    universityName: 'Institute of Business Administration (IBA)',
    country: 'Pakistan',
    city: 'Karachi',
    programTitle: 'BBA in Marketing, Brand Strategy & Entrepreneurship',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'A', 'C'],
    tuitionTier: '$$',
    description: 'Premier business institute fostering leadership, brand management, digital marketing, corporate negotiations, and venture launching.',
    keyMajors: ['Business Administration', 'Marketing', 'Entrepreneurship', 'Supply Chain Management'],
    websiteUrl: 'https://www.iba.edu.pk/'
  },
  {
    id: 'prog-pk-2',
    universityName: 'FAST-NUCES (Karachi Campus)',
    country: 'Pakistan',
    city: 'Karachi',
    programTitle: 'B.S. in Artificial Intelligence & Computer Science',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'P'],
    tuitionTier: '$',
    description: 'Pioneering technical university famous for rigorous coding bootcamps, algorithmic problem-solving, and machine learning pipelines.',
    keyMajors: ['Artificial Intelligence', 'Computer Science', 'Cybersecurity', 'Data Analytics'],
    websiteUrl: 'https://www.nu.edu.pk/'
  },
  {
    id: 'prog-pk-3',
    universityName: 'Habib University',
    country: 'Pakistan',
    city: 'Karachi',
    programTitle: 'B.S. in Communication & Design (CND) / Social Development',
    degreeLevel: 'Bachelor',
    calipsCodes: ['A', 'S', 'L'],
    tuitionTier: '$$',
    description: 'Innovative liberal arts and design campus offering human-centered design, interactive media, creative storytelling, and critical humanities.',
    keyMajors: ['Communication & Design', 'Social Development & Policy', 'Interactive Media', 'Visual Studies'],
    websiteUrl: 'https://habib.edu.pk/'
  },
  {
    id: 'prog-pk-4',
    universityName: 'NED University of Engineering & Technology',
    country: 'Pakistan',
    city: 'Karachi',
    programTitle: 'B.E. in Mechanical & Mechatronics Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'C'],
    tuitionTier: '$',
    description: 'Historic engineering institution with massive industrial labs, robotics workshops, automotive prototyping, and automation testing.',
    keyMajors: ['Mechanical Engineering', 'Mechatronics', 'Electrical Engineering', 'Industrial Manufacturing'],
    websiteUrl: 'https://www.neduet.edu.pk/'
  },
  {
    id: 'prog-pk-5',
    universityName: 'Aga Khan University (AKU)',
    country: 'Pakistan',
    city: 'Karachi',
    programTitle: 'Bachelor of Science in Nursing (BScN) / MBBS',
    degreeLevel: 'Bachelor',
    calipsCodes: ['S', 'I', 'P'],
    tuitionTier: '$$',
    description: 'World-class healthcare education emphasizing patient-centered clinical excellence, medical diagnostics, empathy, and public health.',
    keyMajors: ['Nursing & Health Sciences', 'Medicine (MBBS)', 'Public Health', 'Physical Therapy'],
    websiteUrl: 'https://www.aku.edu/'
  },
  {
    id: 'prog-pk-6',
    universityName: 'National University of Sciences & Technology (NUST)',
    country: 'Pakistan',
    city: 'Islamabad',
    programTitle: 'B.S. in Software Engineering & Data Science',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'P'],
    tuitionTier: '$',
    description: 'Leading national engineering institution offering advanced software architecture, systems testing, AI labs, and high-performance computing.',
    keyMajors: ['Software Engineering', 'Data Science', 'Computer Systems', 'Cybersecurity'],
    websiteUrl: 'https://nust.edu.pk/'
  },
  {
    id: 'prog-pk-7',
    universityName: 'Lahore University of Management Sciences (LUMS)',
    country: 'Pakistan',
    city: 'Lahore',
    programTitle: 'B.S. in Economics & Data Analytics / Management Science',
    degreeLevel: 'Bachelor',
    calipsCodes: ['C', 'L', 'I'],
    tuitionTier: '$$',
    description: 'Top-tier research university renowned for financial modeling, behavioral economics, corporate strategy, and entrepreneurial incubators.',
    keyMajors: ['Economics', 'Management Science', 'Accounting & Finance', 'Computer Science'],
    websiteUrl: 'https://lums.edu.pk/'
  },
  {
    id: 'prog-pk-8',
    universityName: 'GIKI Institute of Engineering Sciences and Technology',
    country: 'Pakistan',
    city: 'Topi / Swabi',
    programTitle: 'B.S. in Computer Engineering & Autonomous Robotics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'C'],
    tuitionTier: '$$',
    description: 'Prestigious residential engineering institute focused on hardware-software co-design, embedded robotics, and aerospace concepts.',
    keyMajors: ['Computer Engineering', 'Robotics', 'Materials Engineering', 'Electrical Engineering'],
    websiteUrl: 'https://giki.edu.pk/'
  },

  // --- UNITED KINGDOM ---
  {
    id: 'prog-uk-1',
    universityName: 'University of Oxford',
    country: 'United Kingdom',
    city: 'Oxford',
    programTitle: 'BA in Philosophy, Politics and Economics (PPE) & Law',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'I', 'S'],
    tuitionTier: '$$$$',
    description: 'One of the world\'s oldest academic institutions, renowned for producing global prime ministers, international diplomats, and legal thinkers.',
    keyMajors: ['PPE', 'Jurisprudence (Law)', 'Modern History', 'Computer Science & Philosophy'],
    websiteUrl: 'https://www.ox.ac.uk/'
  },
  {
    id: 'prog-uk-2',
    universityName: 'University of Cambridge',
    country: 'United Kingdom',
    city: 'Cambridge',
    programTitle: 'Computer Science Tripos & Natural Sciences',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$$',
    description: 'Iconic research university leading the world in artificial intelligence discoveries, quantum computing, biotechnology, and mathematics.',
    keyMajors: ['Computer Science', 'Natural Sciences', 'Mathematics', 'Engineering'],
    websiteUrl: 'https://www.cam.ac.uk/'
  },
  {
    id: 'prog-uk-3',
    universityName: 'Imperial College London',
    country: 'United Kingdom',
    city: 'London',
    programTitle: 'BEng in Computing & Biomedical Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$$',
    description: 'Global STEM powerhouse immersed in the heart of London, driving fintech innovations, medical robotics, and renewable aerospace technology.',
    keyMajors: ['Computing', 'Biomedical Engineering', 'Data Science', 'Electrical Engineering'],
    websiteUrl: 'https://www.imperial.ac.uk/'
  },
  {
    id: 'prog-uk-4',
    universityName: 'London School of Economics (LSE)',
    country: 'United Kingdom',
    city: 'London',
    programTitle: 'BSc in Economics, Finance & Global Public Policy',
    degreeLevel: 'Bachelor',
    calipsCodes: ['C', 'L', 'I'],
    tuitionTier: '$$$$',
    description: 'World-leading specialist social science university training financial economists, central bankers, policy analysts, and multilateral negotiators.',
    keyMajors: ['Economics', 'Finance', 'International Relations', 'Politics & Policy'],
    websiteUrl: 'https://www.lse.ac.uk/'
  },

  // --- UNITED STATES ---
  {
    id: 'prog-us-1',
    universityName: 'Massachusetts Institute of Technology (MIT)',
    country: 'United States',
    city: 'Boston',
    programTitle: 'B.S. in Electrical Engineering & Computer Science (6-3)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$$',
    description: 'Unmatched global epicenter of frontier computing, generative models, robotics fabrication, and astronautical systems engineering.',
    keyMajors: ['Computer Science', 'Artificial Intelligence', 'Mechanical Engineering', 'Mathematics'],
    websiteUrl: 'https://www.mit.edu/'
  },
  {
    id: 'prog-us-2',
    universityName: 'Stanford University',
    country: 'United States',
    city: 'San Francisco / Bay Area',
    programTitle: 'B.S. in Symbolic Systems, Product Design & CS',
    degreeLevel: 'Bachelor',
    calipsCodes: ['A', 'I', 'L'],
    tuitionTier: '$$$$',
    description: 'Heart of Silicon Valley entrepreneurship, blending human-computer interaction, venture creation, AI ethics, and industrial design.',
    keyMajors: ['Symbolic Systems', 'Computer Science', 'Product Design', 'Management Science & Engineering'],
    websiteUrl: 'https://www.stanford.edu/'
  },
  {
    id: 'prog-us-3',
    universityName: 'Harvard University',
    country: 'United States',
    city: 'Boston',
    programTitle: 'A.B. in Applied Mathematics & Government / Economics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'C', 'S'],
    tuitionTier: '$$$$',
    description: 'Prestigious Ivy League institution fostering world leaders, institutional directors, macroeconomic researchers, and civic innovators.',
    keyMajors: ['Applied Mathematics', 'Economics', 'Government', 'Social Studies'],
    websiteUrl: 'https://www.harvard.edu/'
  },
  {
    id: 'prog-us-4',
    universityName: 'University of California, Berkeley',
    country: 'United States',
    city: 'San Francisco / Bay Area',
    programTitle: 'B.A. / B.S. in EECS & Data Science',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'P'],
    tuitionTier: '$$$',
    description: 'Premier public research university famed for open-source AI frameworks, distributed systems, and cutting-edge software architecture.',
    keyMajors: ['EECS', 'Data Science', 'Cognitive Science', 'Business Administration'],
    websiteUrl: 'https://www.berkeley.edu/'
  },

  // --- CANADA ---
  {
    id: 'prog-ca-1',
    universityName: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    programTitle: 'B.Sc. in Computer Science & Artificial Intelligence (Rotman)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'L'],
    tuitionTier: '$$$',
    description: 'Top Canadian university celebrated as the birthplace of deep learning, offering world-class co-op opportunities across tech and finance.',
    keyMajors: ['Computer Science', 'Commerce (Rotman)', 'Statistics', 'Software Engineering'],
    websiteUrl: 'https://www.utoronto.ca/'
  },
  {
    id: 'prog-ca-2',
    universityName: 'University of Waterloo',
    country: 'Canada',
    city: 'Waterloo',
    programTitle: 'B.Math / B.S. in Software Engineering & Co-op',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'C'],
    tuitionTier: '$$$',
    description: 'World-famous for its premier co-op internship program with Silicon Valley tech giants, high-frequency trading firms, and startups.',
    keyMajors: ['Software Engineering', 'Computer Science', 'Mathematics', 'Mechatronics'],
    websiteUrl: 'https://uwaterloo.ca/'
  },

  // --- AUSTRALIA ---
  {
    id: 'prog-au-1',
    universityName: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    programTitle: 'Bachelor of Science (Computing & Data) / Commerce',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'L', 'S'],
    tuitionTier: '$$$',
    description: 'Australia\'s leading research university with the flexible Melbourne Model, offering multidisciplinary problem solving and global internships.',
    keyMajors: ['Computing & Software Systems', 'Data Science', 'Finance', 'Biomedicine'],
    websiteUrl: 'https://www.unimelb.edu.au/'
  },
  {
    id: 'prog-au-2',
    universityName: 'University of Sydney',
    country: 'Australia',
    city: 'Sydney',
    programTitle: 'Bachelor of Advanced Computing & Design Architecture',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'A', 'P'],
    tuitionTier: '$$$',
    description: 'Prestigious sandstone campus combining deep technical rigor in cyber systems with creative architectural computing and entrepreneurship.',
    keyMajors: ['Advanced Computing', 'Software Development', 'Design Computing', 'Cybersecurity'],
    websiteUrl: 'https://www.sydney.edu.au/'
  },

  // --- GERMANY ---
  {
    id: 'prog-de-1',
    universityName: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    programTitle: 'B.Sc. in Informatics & Automotive Software Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'C'],
    tuitionTier: '$',
    description: 'Germany\'s top technical university, deeply partnered with BMW, Siemens, and high-tech manufacturing giants. Minimal tuition fees.',
    keyMajors: ['Informatics', 'Mechanical Engineering', 'Robotics', 'Electrical Engineering'],
    websiteUrl: 'https://www.tum.de/'
  },
  {
    id: 'prog-de-2',
    universityName: 'Heidelberg University',
    country: 'Germany',
    city: 'Heidelberg',
    programTitle: 'B.Sc. in Molecular Biotechnology & Medical Sciences',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'S', 'P'],
    tuitionTier: '$',
    description: 'Germany\'s oldest university, a world authority in life sciences, oncology research, genomics, and pharmaceutical chemistry.',
    keyMajors: ['Biotechnology', 'Medicine', 'Biosciences', 'Physics'],
    websiteUrl: 'https://www.uni-heidelberg.de/'
  },

  // --- UNITED ARAB EMIRATES ---
  {
    id: 'prog-ae-1',
    universityName: 'American University of Sharjah (AUS)',
    country: 'United Arab Emirates',
    city: 'Sharjah',
    programTitle: 'B.S. in Computer Engineering & Digital Media Design',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'A', 'I'],
    tuitionTier: '$$$',
    description: 'Premier accredited American-style institution in the Gulf region, renowned for design studios, smart city engineering, and tech ventures.',
    keyMajors: ['Computer Engineering', 'Visual Communication', 'Civil Engineering', 'Finance'],
    websiteUrl: 'https://www.aus.edu/'
  },
  {
    id: 'prog-ae-2',
    universityName: 'Khalifa University',
    country: 'United Arab Emirates',
    city: 'Abu Dhabi',
    programTitle: 'B.Sc. in Artificial Intelligence & Aerospace Systems',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$',
    description: 'High-ranking science and technology university driving UAE clean energy, space missions, nuclear sciences, and robotics.',
    keyMajors: ['Artificial Intelligence', 'Aerospace Engineering', 'Biomedical Engineering', 'Renewable Energy'],
    websiteUrl: 'https://www.ku.ac.ae/'
  },

  // --- SINGAPORE ---
  {
    id: 'prog-sg-1',
    universityName: 'National University of Singapore (NUS)',
    country: 'Singapore',
    city: 'Singapore',
    programTitle: 'Bachelor of Computing (Computer Science) & Business Analytics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'L'],
    tuitionTier: '$$$',
    description: 'Consistently ranked #1 in Asia for computer science, fintech ecosystems, artificial intelligence, and logistics engineering.',
    keyMajors: ['Computer Science', 'Business Analytics', 'Information Systems', 'Quantitative Finance'],
    websiteUrl: 'https://www.nus.edu.sg/'
  },
  {
    id: 'prog-sg-2',
    universityName: 'Nanyang Technological University (NTU)',
    country: 'Singapore',
    city: 'Singapore',
    programTitle: 'B.Eng. in Smart Materials, Robotics & AI Systems',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'C'],
    tuitionTier: '$$$',
    description: 'Eco-campus powerhouse leading global research in autonomous mobility, smart materials, semiconductor fabrication, and clean tech.',
    keyMajors: ['Data Science & AI', 'Mechanical Engineering', 'Materials Science', 'Communication Studies'],
    websiteUrl: 'https://www.ntu.edu.sg/'
  },

  // --- JAPAN ---
  {
    id: 'prog-jp-1',
    universityName: 'The University of Tokyo (Todai)',
    country: 'Japan',
    city: 'Tokyo',
    programTitle: 'PEAK Program in Global Environmental & Information Sciences',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'S'],
    tuitionTier: '$$',
    description: 'Japan\'s foremost imperial university offering premier English-taught degrees in frontier physics, autonomous robotics, and environmental stewardship.',
    keyMajors: ['Information Science', 'Mechanical Engineering', 'Environmental Studies', 'Physics'],
    websiteUrl: 'https://www.u-tokyo.ac.jp/en/'
  },
  {
    id: 'prog-jp-2',
    universityName: 'Kyoto University',
    country: 'Japan',
    city: 'Kyoto',
    programTitle: 'International Undergraduate Program in Civil & Chemical Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'A'],
    tuitionTier: '$$',
    description: 'Famous for producing numerous Nobel laureates in fundamental physics, chemistry, and revolutionary stem cell discoveries.',
    keyMajors: ['Engineering Sciences', 'Fundamental Physics', 'Chemical Biology', 'Architecture'],
    websiteUrl: 'https://www.kyoto-u.ac.jp/en/'
  },

  // --- CHINA ---
  {
    id: 'prog-cn-1',
    universityName: 'Tsinghua University',
    country: 'China',
    city: 'Beijing',
    programTitle: 'B.S. in Computer Science & Artificial Intelligence (Yao Class)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'P'],
    tuitionTier: '$',
    description: 'Renowned worldwide for producing premier computer scientists, algorithmic olympiad champions, and pioneering quantum hardware engineers.',
    keyMajors: ['Computer Science', 'Electronic Engineering', 'Automation', 'Applied Mathematics'],
    websiteUrl: 'https://www.tsinghua.edu.cn/en/'
  },

  // --- SWITZERLAND ---
  {
    id: 'prog-ch-1',
    universityName: 'ETH Zurich (Swiss Federal Institute of Technology)',
    country: 'Switzerland',
    city: 'Zurich',
    programTitle: 'B.Sc. in Computer Science & Robotics Fabrication',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$',
    description: 'Einstein\'s alma mater and Europe\'s top technical university, leading the world in computer vision, robotics, and particle physics.',
    keyMajors: ['Computer Science', 'Mechanical Engineering', 'Physics', 'Electrical Engineering'],
    websiteUrl: 'https://ethz.ch/en.html'
  }
];

// Helper to save universities found via Google search to local memory
const LOCAL_STORAGE_KEY_CUSTOM_UNIS = 'pathcode_custom_saved_unis';

export function getStoredLiveUniversities(): UniversityProgram[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_CUSTOM_UNIS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveLiveUniversityProgram(program: UniversityProgram): void {
  const list = getStoredLiveUniversities();
  const exists = list.some((p) => p.id === program.id);
  if (!exists) {
    list.unshift(program);
    localStorage.setItem(LOCAL_STORAGE_KEY_CUSTOM_UNIS, JSON.stringify(list));
  }
}

export function getAllUniversityPrograms(): UniversityProgram[] {
  const live = getStoredLiveUniversities();
  const staticIds = new Set(UNIVERSITY_PROGRAMS.map((p) => p.id));
  const newLive = live.filter((p) => !staticIds.has(p.id));
  return [...newLive, ...UNIVERSITY_PROGRAMS];
}

export function filterUniversitiesByLocation(
  programs: UniversityProgram[],
  country?: string,
  city?: string
): UniversityProgram[] {
  if (!programs || programs.length === 0) return [];
  const cleanCountry = country?.trim();
  const cleanCity = city?.trim();

  return programs.filter((prog) => {
    const matchCountry =
      !cleanCountry ||
      cleanCountry === 'ALL' ||
      cleanCountry.includes('Anywhere') ||
      prog.country.toLowerCase() === cleanCountry.toLowerCase();

    const matchCity =
      !cleanCity ||
      cleanCity === 'ALL' ||
      cleanCity.includes('Any City') ||
      prog.city.toLowerCase().includes(cleanCity.toLowerCase()) ||
      cleanCity.toLowerCase().includes(prog.city.toLowerCase());

    return matchCountry && matchCity;
  });
}
