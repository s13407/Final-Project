import { UniversityProgram } from '../types';

export const POPULAR_COUNTRIES = [
  'Anywhere / Global',
  'Pakistan',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'United Arab Emirates',
  'Singapore',
  'Netherlands'
] as const;

export const POPULAR_CITIES = [
  'Any City / Flexible',
  'Karachi',
  'Lahore',
  'Islamabad',
  'London',
  'Oxford',
  'Manchester',
  'Boston',
  'New York',
  'San Francisco / Bay Area',
  'Pittsburgh',
  'Toronto',
  'Vancouver',
  'Melbourne',
  'Sydney',
  'Munich',
  'Berlin',
  'Dubai',
  'Singapore'
] as const;

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  Pakistan: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Rawalpindi', 'Faisalabad'],
  'United States': ['Boston', 'New York', 'San Francisco / Bay Area', 'Pittsburgh', 'Austin', 'Chicago', 'Los Angeles'],
  'United Kingdom': ['London', 'Oxford', 'Cambridge', 'Manchester', 'Edinburgh'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Waterloo'],
  Australia: ['Melbourne', 'Sydney', 'Brisbane'],
  Germany: ['Munich', 'Berlin', 'Aachen', 'Heidelberg'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  Singapore: ['Singapore'],
  Netherlands: ['Amsterdam', 'Delft', 'Eindhoven'],
  'Anywhere / Global': [
    'Any City / Flexible',
    'Karachi',
    'Lahore',
    'Islamabad',
    'London',
    'Toronto',
    'Boston',
    'Melbourne',
    'Munich',
    'Dubai',
    'Singapore'
  ]
};

export const getCitiesForCountry = (country?: string): string[] => {
  if (!country || !CITIES_BY_COUNTRY[country]) {
    return CITIES_BY_COUNTRY['Anywhere / Global'];
  }
  return CITIES_BY_COUNTRY[country];
};

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
    universityName: 'COMSATS University Islamabad',
    country: 'Pakistan',
    city: 'Islamabad',
    programTitle: 'B.S. in Bioinformatics & Computer Science',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$',
    description: 'Top-tier public science university specializing in genomic data analysis, bioinformatics tools, and applied computational research.',
    keyMajors: ['Bioinformatics', 'Computer Science', 'Software Engineering', 'Mathematics'],
    websiteUrl: 'https://www.comsats.edu.pk/'
  },
  {
    id: 'prog-pk-8',
    universityName: 'Lahore University of Management Sciences (LUMS)',
    country: 'Pakistan',
    city: 'Lahore',
    programTitle: 'B.Sc. (Honours) in Accounting & Finance / Economics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'C', 'I'],
    tuitionTier: '$$',
    description: 'AACSB-accredited business school equipping future CFOs, investment analysts, and corporate leaders with deep financial acumen.',
    keyMajors: ['Accounting & Finance', 'Management Science', 'Economics', 'Marketing'],
    websiteUrl: 'https://lums.edu.pk/'
  },
  {
    id: 'prog-pk-9',
    universityName: 'National College of Arts (NCA)',
    country: 'Pakistan',
    city: 'Lahore',
    programTitle: 'Bachelor of Design & Visual Arts / Architecture',
    degreeLevel: 'Bachelor',
    calipsCodes: ['A', 'P', 'I'],
    tuitionTier: '$',
    description: 'Celebrated national arts academy nurturing fine artists, film directors, interior architects, and graphic design visionaries.',
    keyMajors: ['Visual Communication Design', 'Fine Arts', 'Architecture', 'Film & Television'],
    websiteUrl: 'https://www.nca.edu.pk/'
  },

  // --- UNITED KINGDOM ---
  {
    id: 'prog-uk-1',
    universityName: 'Imperial College London',
    country: 'United Kingdom',
    city: 'London',
    programTitle: 'BEng / MEng in Biomedical Engineering & Mechatronics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$',
    description: 'Applied engineering combining biology, electronics, and precision mechanics for medical devices, robotic prosthetics, and healthcare sensors.',
    keyMajors: ['Biomedical Engineering', 'Mechatronics', 'Bioinformatics', 'Applied Mechanics'],
    websiteUrl: 'https://www.imperial.ac.uk/'
  },
  {
    id: 'prog-uk-2',
    universityName: 'London School of Economics (LSE)',
    country: 'United Kingdom',
    city: 'London',
    programTitle: 'B.Sc. in Actuarial Science & Risk Analytics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['C', 'I', 'L'],
    tuitionTier: '$$$',
    description: 'Elite quantitative curriculum in statistical modeling, compliance assessment, financial risk management, and insurance economics.',
    keyMajors: ['Actuarial Science', 'Statistics', 'Finance', 'Compliance & Risk Analytics'],
    websiteUrl: 'https://www.lse.ac.uk/'
  },
  {
    id: 'prog-uk-3',
    universityName: 'University of the Arts London (Central Saint Martins)',
    country: 'United Kingdom',
    city: 'London',
    programTitle: 'B.A. (Hons) in Graphic Communication & UX Design',
    degreeLevel: 'Bachelor',
    calipsCodes: ['A', 'L', 'P'],
    tuitionTier: '$$$',
    description: 'World benchmark for creative direction, interactive branding, editorial typography, and high-impact digital multimedia design.',
    keyMajors: ['Graphic Design', 'UX/UI Design', 'Creative Direction', 'Digital Storytelling'],
    websiteUrl: 'https://www.arts.ac.uk/'
  },
  {
    id: 'prog-uk-4',
    universityName: 'University of Oxford',
    country: 'United Kingdom',
    city: 'Oxford',
    programTitle: 'B.A. in Philosophy, Politics and Economics (PPE)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'S', 'I'],
    tuitionTier: '$$$',
    description: 'Prestigious program producing world leaders, public policy strategists, diplomat negotiators, and international policy analysts.',
    keyMajors: ['Political Science', 'Economics', 'Philosophy', 'Public Policy'],
    websiteUrl: 'https://www.ox.ac.uk/'
  },
  {
    id: 'prog-uk-5',
    universityName: 'University of Manchester',
    country: 'United Kingdom',
    city: 'Manchester',
    programTitle: 'B.Sc. in Computer Systems & Software Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$',
    description: 'Historic birthplace of modern computing, offering industry-integrated coursework in cloud infrastructure, embedded microchips, and software dev.',
    keyMajors: ['Computer Systems', 'Software Engineering', 'Robotics', 'Artificial Intelligence'],
    websiteUrl: 'https://www.manchester.ac.uk/'
  },

  // --- UNITED STATES ---
  {
    id: 'prog-us-1',
    universityName: 'Carnegie Mellon University',
    country: 'United States',
    city: 'Pittsburgh',
    programTitle: 'B.S. in Computer Science & Human-Computer Interaction',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'A', 'C'],
    tuitionTier: '$$$$',
    description: 'Premier interdisciplinary program marrying rigorous computational algorithms with user-centered interaction design and product architectures.',
    keyMajors: ['Computer Science', 'Human-Computer Interaction', 'Artificial Intelligence', 'Software Engineering'],
    websiteUrl: 'https://csd.cmu.edu/'
  },
  {
    id: 'prog-us-2',
    universityName: 'Stanford University',
    country: 'United States',
    city: 'San Francisco / Bay Area',
    programTitle: 'B.S. in Management Science & Engineering (MS&E)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'I', 'C'],
    tuitionTier: '$$$$',
    description: 'Prepares founders and strategists to solve complex business and tech challenges through quantitative modeling, economics, and leadership.',
    keyMajors: ['Management Science', 'Finance & Economics', 'Entrepreneurship', 'Operations Research'],
    websiteUrl: 'https://msande.stanford.edu/'
  },
  {
    id: 'prog-us-3',
    universityName: 'Northeastern University',
    country: 'United States',
    city: 'Boston',
    programTitle: 'B.S. in Data Science & Business Administration (Co-op)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['C', 'I', 'L'],
    tuitionTier: '$$$$',
    description: 'World-renowned co-op program pairing real enterprise tech employment with machine learning, financial forecasting, and database engineering.',
    keyMajors: ['Data Science', 'Business Analytics', 'Finance', 'Supply Chain Management'],
    websiteUrl: 'https://www.northeastern.edu/'
  },
  {
    id: 'prog-us-4',
    universityName: 'New York University (NYU Stern & Tisch)',
    country: 'United States',
    city: 'New York',
    programTitle: 'B.S. in Interactive Media Arts & Digital Business',
    degreeLevel: 'Bachelor',
    calipsCodes: ['A', 'L', 'I'],
    tuitionTier: '$$$$',
    description: 'At the vibrant crossroads of Manhattan tech venture capital and world-class digital arts, creative coding, and marketing.',
    keyMajors: ['Interactive Media', 'Digital Marketing', 'Creative Technology', 'Entrepreneurship'],
    websiteUrl: 'https://www.nyu.edu/'
  },
  {
    id: 'prog-us-5',
    universityName: 'University of California, Berkeley',
    country: 'United States',
    city: 'San Francisco / Bay Area',
    programTitle: 'B.S. in Environmental Science, Policy & Clean Energy',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'S'],
    tuitionTier: '$$$$',
    description: 'Interdisciplinary science and ecological policy program training researchers, environmental conservationists, and green policy leaders.',
    keyMajors: ['Environmental Science', 'Agricultural Science', 'Public Policy', 'Conservation Biology'],
    websiteUrl: 'https://nature.berkeley.edu/'
  },

  // --- CANADA ---
  {
    id: 'prog-ca-1',
    universityName: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    programTitle: 'B.A. in Digital Enterprise Management & Communications',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'A', 'C'],
    tuitionTier: '$$$',
    description: 'Integrates digital media production, corporate communications, product management, and modern media business models in downtown Toronto.',
    keyMajors: ['Communications', 'Digital Media', 'Marketing', 'Business Analytics'],
    websiteUrl: 'https://www.utoronto.ca/'
  },
  {
    id: 'prog-ca-2',
    universityName: 'University of Waterloo',
    country: 'Canada',
    city: 'Toronto',
    programTitle: 'B.Math in Computer Science & Applied Mathematics (Co-op)',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'C', 'P'],
    tuitionTier: '$$$',
    description: 'Silicon Valley North tech magnet with unmatched paid internships in algorithmic programming, cybersecurity, and financial tech.',
    keyMajors: ['Computer Science', 'Applied Mathematics', 'Software Engineering', 'Data Analytics'],
    websiteUrl: 'https://uwaterloo.ca/'
  },
  {
    id: 'prog-ca-3',
    universityName: 'University of British Columbia (UBC)',
    country: 'Canada',
    city: 'Vancouver',
    programTitle: 'B.Sc. in Psychology & Cognitive Neuroscience',
    degreeLevel: 'Bachelor',
    calipsCodes: ['S', 'I', 'A'],
    tuitionTier: '$$$',
    description: 'Cutting-edge empirical exploration of neural mechanisms, empathetic human behavior, mental health therapies, and counseling techniques.',
    keyMajors: ['Psychology', 'Cognitive Systems', 'Mental Health Counseling', 'Behavioral Science'],
    websiteUrl: 'https://www.ubc.ca/'
  },

  // --- AUSTRALIA ---
  {
    id: 'prog-au-1',
    universityName: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    programTitle: 'Bachelor of Design & Architectural Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['A', 'P', 'I'],
    tuitionTier: '$$$',
    description: 'Leading Asia-Pacific studio curriculum in sustainable architecture, computational urban design, and tangible building construction.',
    keyMajors: ['Architecture', 'Urban Planning', 'Industrial Design', 'Construction Management'],
    websiteUrl: 'https://www.unimelb.edu.au/'
  },
  {
    id: 'prog-au-2',
    universityName: 'University of Sydney',
    country: 'Australia',
    city: 'Sydney',
    programTitle: 'Bachelor of Commerce & International Business',
    degreeLevel: 'Bachelor',
    calipsCodes: ['L', 'C', 'S'],
    tuitionTier: '$$$',
    description: 'Top global business program training students in cross-border trade, startup leadership, human capital management, and brand strategy.',
    keyMajors: ['International Business', 'Marketing', 'Commercial Law', 'Human Resources'],
    websiteUrl: 'https://www.sydney.edu.au/'
  },

  // --- GERMANY ---
  {
    id: 'prog-de-1',
    universityName: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    programTitle: 'B.Sc. in Robotics, Mechatronics & Artificial Intelligence',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'C'],
    tuitionTier: '$',
    description: 'Germany’s top technical university offering tuition-free or ultra-low cost high-tech engineering, industrial automation, and robotic AI labs.',
    keyMajors: ['Robotics', 'Mechatronics', 'Electrical Engineering', 'Computer Science'],
    websiteUrl: 'https://www.tum.de/'
  },
  {
    id: 'prog-de-2',
    universityName: 'Free University of Berlin (Freie Universität)',
    country: 'Germany',
    city: 'Berlin',
    programTitle: 'B.A. in Social Sciences, Public Policy & Communication',
    degreeLevel: 'Bachelor',
    calipsCodes: ['S', 'L', 'I'],
    tuitionTier: '$',
    description: 'Vibrant European center for public policy reform, NGO diplomacy, societal welfare research, and multicultural communications.',
    keyMajors: ['Public Policy', 'Sociology', 'Political Science', 'International Relations'],
    websiteUrl: 'https://www.fu-berlin.de/'
  },

  // --- UAE & MIDDLE EAST ---
  {
    id: 'prog-ae-1',
    universityName: 'American University of Sharjah (AUS)',
    country: 'United Arab Emirates',
    city: 'Dubai',
    programTitle: 'B.S. in Computer Engineering & Industrial Logistics',
    degreeLevel: 'Bachelor',
    calipsCodes: ['I', 'P', 'C'],
    tuitionTier: '$$$',
    description: 'ABET-accredited regional powerhouse preparing engineers for smart cities, drone transport logistics, and clean tech infrastructure.',
    keyMajors: ['Computer Engineering', 'Industrial Engineering', 'Logistics & Supply Chain', 'Mechatronics'],
    websiteUrl: 'https://www.aus.edu/'
  },

  // --- SINGAPORE & NETHERLANDS ---
  {
    id: 'prog-sg-1',
    universityName: 'National University of Singapore (NUS)',
    country: 'Singapore',
    city: 'Singapore',
    programTitle: 'B.Soc.Sci in Psychology & Behavioral Science',
    degreeLevel: 'Bachelor',
    calipsCodes: ['S', 'I', 'A'],
    tuitionTier: '$$$',
    description: 'Top Asian research department exploring human cognition, counseling psychology, behavioral economics, and clinical mental wellness.',
    keyMajors: ['Psychology', 'Counseling & Mental Health', 'Behavioral Science', 'Human Resources'],
    websiteUrl: 'https://www.nus.edu.sg/'
  },
  {
    id: 'prog-nl-1',
    universityName: 'Delft University of Technology (TU Delft)',
    country: 'Netherlands',
    city: 'Delft',
    programTitle: 'B.Sc. in Sustainable Energy Technology & Mechanical Engineering',
    degreeLevel: 'Bachelor',
    calipsCodes: ['P', 'I', 'L'],
    tuitionTier: '$$',
    description: 'Hands-on European engineering powerhouse specializing in renewable grids, robotic hardware, wind/solar systems, and automated logistics.',
    keyMajors: ['Mechanical Engineering', 'Renewable Energy Technology', 'Robotics & Mechatronics', 'Electrical Engineering'],
    websiteUrl: 'https://www.tudelft.nl/'
  }
];

export function filterUniversitiesByLocation(
  programs: UniversityProgram[],
  preferredCountry?: string,
  preferredCity?: string
): UniversityProgram[] {
  if (!preferredCountry && !preferredCity) return programs;
  
  const isGlobalCountry = !preferredCountry || preferredCountry.includes('Anywhere') || preferredCountry === 'ALL';
  const isGlobalCity = !preferredCity || preferredCity.includes('Any City') || preferredCity === 'ALL';

  if (isGlobalCountry && isGlobalCity) return programs;

  return programs.filter((p) => {
    let matchCountry = true;
    let matchCity = true;

    if (!isGlobalCountry) {
      matchCountry = p.country.toLowerCase() === preferredCountry.toLowerCase();
    }
    if (!isGlobalCity && preferredCity) {
      matchCity = p.city.toLowerCase().includes(preferredCity.toLowerCase()) || preferredCity.toLowerCase().includes(p.city.toLowerCase());
    }

    return matchCountry && matchCity;
  });
}
