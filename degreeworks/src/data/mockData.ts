export const student = {
  name: 'John Brown',
  rin: '874589324',
  level: 'Undergraduate',
  classYear: 'Junior',
  degrees: [
    { type: 'Major', degree: 'BS Computer Science', major: 'Computer Science' },
    { type: 'Major', degree: 'BS Mathematics', major: 'Mathematics' },
    { type: 'Minor', degree: 'ITWS Minor', major: 'Information Technology & Web Science' },
  ],
  advisor: { name: 'Mary Jones', email: 'mjones@rpi.edu' },
  credits: { earned: 96, required: 128 },
  gpa: 3.25,
};

export type CourseStatus = 'complete' | 'inprogress' | 'incomplete';

export interface Course {
  code: string;
  title: string;
  grade?: string;
  credits: number;
  term?: string;
  status: CourseStatus;
}

export const csRequirements: Course[] = [
  { code: 'CSCI 1100', title: 'Computer Science I', grade: 'A-', credits: 4, term: 'Fall 2023', status: 'complete' },
  { code: 'CSCI 1200', title: 'Data Structures', grade: 'A', credits: 4, term: 'Spring 2024', status: 'complete' },
  { code: 'CSCI 2200', title: 'Foundations of Computer Science', grade: 'B+', credits: 4, term: 'Fall 2024', status: 'complete' },
  { code: 'CSCI 2500', title: 'Computer Organization', grade: 'B+', credits: 4, term: 'Spring 2025', status: 'complete' },
  { code: 'CSCI 2300', title: 'Introduction to Algorithms', credits: 4, term: 'Spring 2026', status: 'inprogress' },
  { code: 'CSCI 2600', title: 'Principles of Software', credits: 4, status: 'incomplete' },
  { code: 'CSCI 4430', title: 'Programming Languages', credits: 4, status: 'incomplete' },
];

export const mathRequirements: Course[] = [
  { code: 'MATH 1010', title: 'Calculus I', grade: 'A', credits: 4, term: 'Fall 2023', status: 'complete' },
  { code: 'MATH 1020', title: 'Calculus II', grade: 'A-', credits: 4, term: 'Spring 2024', status: 'complete' },
  { code: 'MATH 2010', title: 'Multivar Calc & Matrix Algebra', grade: 'B+', credits: 4, term: 'Fall 2024', status: 'complete' },
  { code: 'MATH 2400', title: 'Introduction to Differential Equations', credits: 4, term: 'Spring 2026', status: 'inprogress' },
  { code: 'MATH 4100', title: 'Linear Algebra', credits: 4, status: 'incomplete' },
  { code: 'MATH 4090', title: 'Foundations of Analysis', credits: 4, status: 'incomplete' },
];

export const itwsRequirements: Course[] = [
  { code: 'ITWS 1100', title: 'Introduction to Web Science', grade: 'A', credits: 4, term: 'Fall 2023', status: 'complete' },
  { code: 'ITWS 2110', title: 'Web Systems Development', grade: 'B+', credits: 4, term: 'Spring 2024', status: 'complete' },
  { code: 'ITWS 4400', title: 'The Web and Society', credits: 4, term: 'Spring 2026', status: 'inprogress' },
  { code: 'ITWS 4500', title: 'IT & Web Science Capstone', credits: 4, status: 'incomplete' },
  { code: 'COMM 2660', title: 'Introduction to Graphic Design', credits: 4, status: 'incomplete' },
];

export const mathScienceRequirements: Course[] = [
  { code: 'MATH 1010', title: 'Calculus I', grade: 'A', credits: 4, term: 'Fall 2023', status: 'complete' },
  { code: 'PHYS 1100', title: 'Physics I', grade: 'A-', credits: 4, term: 'Fall 2023', status: 'complete' },
  { code: 'MATH 1020', title: 'Calculus II', grade: 'A-', credits: 4, term: 'Spring 2024', status: 'complete' },
  { code: 'PHYS 1200', title: 'Physics II', grade: 'B+', credits: 4, term: 'Spring 2024', status: 'complete' },
  { code: 'MATH 2010', title: 'Multivar Calc & Matrix Algebra', grade: 'B+', credits: 4, term: 'Fall 2024', status: 'complete' },
  { code: 'CHEM 1100', title: 'General Chemistry I', grade: 'B', credits: 4, term: 'Fall 2024', status: 'complete' },
  { code: 'BIOL 1010', title: 'Introduction to Biology', grade: 'A-', credits: 4, term: 'Spring 2025', status: 'complete' },
  { code: 'CSCI 2960', title: 'Computational Problem Solving', grade: 'B+', credits: 4, term: 'Fall 2025', status: 'complete' },
];

export const hassRequirements: Course[] = [
  { code: 'WRIT 1000', title: 'Writing & Research', grade: 'A-', credits: 4, term: 'Fall 2023', status: 'complete' },
  { code: 'PSYC 1200', title: 'Intro to Psychological Science', grade: 'A', credits: 4, term: 'Spring 2024', status: 'complete' },
  { code: 'COMM 1100', title: 'Communication in English I', grade: 'B+', credits: 4, term: 'Fall 2024', status: 'complete' },
  { code: 'ARTS 1050', title: 'Art in Context', grade: 'A-', credits: 4, term: 'Spring 2025', status: 'complete' },
  { code: 'ECON 1200', title: 'Principles of Economics', grade: 'B+', credits: 4, term: 'Fall 2025', status: 'complete' },
  { code: 'STSS 2300', title: 'Technology & Society', credits: 4, term: 'Spring 2026', status: 'inprogress' },
  { code: 'PHIL 2140', title: 'Ethics', credits: 4, status: 'incomplete' },
  { code: 'LANG 2XXX', title: 'Language Elective', credits: 4, status: 'incomplete' },
];

export const archRequirements: Course[] = [
  { code: 'ARCH 1020', title: 'Design Fundamentals I', credits: 4, status: 'incomplete' },
  { code: 'ARCH 1030', title: 'Design Fundamentals II', credits: 4, status: 'incomplete' },
  { code: 'ARCH 2050', title: 'Architectural History Survey', credits: 4, status: 'incomplete' },
  { code: 'ARCH 2300', title: 'Structures & Materials', credits: 4, status: 'incomplete' },
];

export const pathwayRequirements: Course[] = [
  { code: 'COMM 2200', title: 'Media & Society', grade: 'B+', credits: 4, term: 'Fall 2025', status: 'complete' },
  { code: 'COMM 2660', title: 'Introduction to Graphic Design', credits: 4, term: 'Spring 2026', status: 'inprogress' },
  { code: 'COMM 4200', title: 'Digital Media Production', credits: 4, status: 'incomplete' },
  { code: 'COMM 4500', title: 'Advanced Communication Seminar', credits: 4, status: 'incomplete' },
];

export const concentrationRequirements: Course[] = [
  { code: 'CSCI 4430', title: 'Programming Languages', grade: 'A', credits: 4, term: 'Spring 2025', status: 'complete' },
  { code: 'CSCI 4440', title: 'Software Design & Documentation', grade: 'B+', credits: 4, term: 'Fall 2025', status: 'complete' },
  { code: 'CSCI 4961', title: 'Open Source Software', grade: 'A', credits: 4, term: 'Spring 2026', status: 'complete' },
  { code: 'CSCI 4800', title: 'Human-Computer Interaction', grade: 'A-', credits: 4, term: 'Fall 2025', status: 'complete' },
];

export const freeElectives: Course[] = [
  { code: 'ENGR 1010', title: 'Navigating a Career in Engineering', grade: 'A', credits: 1, term: 'Fall 2023', status: 'complete' },
  { code: 'MGMT 1100', title: 'Management Principles', grade: 'B+', credits: 4, term: 'Spring 2025', status: 'complete' },
  { code: 'STSS 2100', title: 'Science, Technology & Society', grade: 'A-', credits: 4, term: 'Fall 2025', status: 'complete' },
  { code: 'ARTS 1200', title: 'Basic Drawing', credits: 4, term: 'Spring 2026', status: 'inprogress' },
  { code: 'CSCI 1170', title: 'Introduction to RCOS', credits: 2, status: 'incomplete' },
  { code: 'ECON 4XXX', title: 'Economics Elective', credits: 4, status: 'incomplete' },
];

export interface SemesterHistory {
  id: string;
  label: string;
  gpa: number;
  creditsTaken: number;
  requirementsFilled: number;
  current?: boolean;
  planned?: boolean;
  courses: {
    code: string;
    title: string;
    grade: string;
    credits: number;
    requirement: string;
    status: CourseStatus;
  }[];
}

export const semesterHistory: SemesterHistory[] = [
  {
    id: 'spring2027', label: 'Spring 2027', planned: true,
    gpa: 0, creditsTaken: 12, requirementsFilled: 0,
    courses: [
      { code: 'MATH 4090', title: 'Foundations of Analysis', grade: '—', credits: 4, requirement: 'Math Major', status: 'incomplete' },
      { code: 'CSCI 4430', title: 'Programming Languages',   grade: '—', credits: 4, requirement: 'CS Major',   status: 'incomplete' },
      { code: 'ITWS 4500', title: 'IT & Web Science Capstone', grade: '—', credits: 4, requirement: 'ITWS Minor', status: 'incomplete' },
    ],
  },
  {
    id: 'fall2026', label: 'Fall 2026', planned: true,
    gpa: 0, creditsTaken: 12, requirementsFilled: 0,
    courses: [
      { code: 'MATH 4100', title: 'Linear Algebra',          grade: '—', credits: 4, requirement: 'Math Major',   status: 'incomplete' },
      { code: 'CSCI 2600', title: 'Principles of Software',  grade: '—', credits: 4, requirement: 'CS Major',     status: 'incomplete' },
      { code: 'PHIL 2140', title: 'Ethics',                  grade: '—', credits: 4, requirement: 'HASS',         status: 'incomplete' },
    ],
  },
  {
    id: 'spring2026', label: 'Spring 2026', current: true,
    gpa: 4.0, creditsTaken: 16, requirementsFilled: 4,
    courses: [
      { code: 'CSCI 2300', title: 'Introduction to Algorithms',      grade: '—', credits: 4, requirement: 'CS Major',   status: 'inprogress' },
      { code: 'MATH 2400', title: 'Intro to Differential Equations', grade: '—', credits: 4, requirement: 'Math Major',  status: 'inprogress' },
      { code: 'ITWS 4400', title: 'The Web and Society',             grade: '—', credits: 4, requirement: 'ITWS Minor', status: 'inprogress' },
      { code: 'COMM 2660', title: 'Introduction to Graphic Design',  grade: '—', credits: 4, requirement: 'Pathway',    status: 'inprogress' },
    ],
  },
  {
    id: 'fall2025', label: 'Fall 2025',
    gpa: 3.6, creditsTaken: 20, requirementsFilled: 5,
    courses: [
      { code: 'CSCI 2960', title: 'Computational Problem Solving',    grade: 'B+', credits: 4, requirement: 'Math/Science',  status: 'complete' },
      { code: 'ECON 1200', title: 'Principles of Economics',          grade: 'B+', credits: 4, requirement: 'HASS',          status: 'complete' },
      { code: 'COMM 2200', title: 'Media & Society',                  grade: 'B+', credits: 4, requirement: 'Pathway',       status: 'complete' },
      { code: 'CSCI 4440', title: 'Software Design & Documentation',  grade: 'B+', credits: 4, requirement: 'Concentration', status: 'complete' },
      { code: 'CSCI 4800', title: 'Human-Computer Interaction',       grade: 'A-', credits: 4, requirement: 'Concentration', status: 'complete' },
    ],
  },
  {
    id: 'spring2025', label: 'Spring 2025',
    gpa: 3.6, creditsTaken: 20, requirementsFilled: 5,
    courses: [
      { code: 'CSCI 2500', title: 'Computer Organization',   grade: 'B+', credits: 4, requirement: 'CS Major',      status: 'complete' },
      { code: 'CSCI 4430', title: 'Programming Languages',   grade: 'A',  credits: 4, requirement: 'Concentration', status: 'complete' },
      { code: 'BIOL 1010', title: 'Introduction to Biology', grade: 'A-', credits: 4, requirement: 'Math/Science',  status: 'complete' },
      { code: 'ARTS 1050', title: 'Art in Context',          grade: 'A-', credits: 4, requirement: 'HASS',          status: 'complete' },
      { code: 'MGMT 1100', title: 'Management Principles',   grade: 'B+', credits: 4, requirement: 'Free',          status: 'complete' },
    ],
  },
  {
    id: 'fall2024', label: 'Fall 2024',
    gpa: 3.2, creditsTaken: 16, requirementsFilled: 4,
    courses: [
      { code: 'CSCI 2200', title: 'Foundations of Computer Science', grade: 'B+', credits: 4, requirement: 'CS Major',     status: 'complete' },
      { code: 'MATH 2010', title: 'Multivar Calc & Matrix Algebra',  grade: 'B+', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'CHEM 1100', title: 'General Chemistry I',             grade: 'B',  credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'COMM 1100', title: 'Communication in English I',      grade: 'B+', credits: 4, requirement: 'HASS',         status: 'complete' },
    ],
  },
  {
    id: 'spring2024', label: 'Spring 2024',
    gpa: 3.7, creditsTaken: 20, requirementsFilled: 5,
    courses: [
      { code: 'CSCI 1200', title: 'Data Structures',                  grade: 'A',  credits: 4, requirement: 'CS Major',     status: 'complete' },
      { code: 'MATH 1020', title: 'Calculus II',                      grade: 'A-', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'PHYS 1200', title: 'Physics II',                       grade: 'B+', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'ITWS 2110', title: 'Web Systems Development',          grade: 'B+', credits: 4, requirement: 'ITWS Minor',  status: 'complete' },
      { code: 'PSYC 1200', title: 'Intro to Psychological Science',   grade: 'A',  credits: 4, requirement: 'HASS',         status: 'complete' },
    ],
  },
  {
    id: 'fall2023', label: 'Fall 2023',
    gpa: 3.8, creditsTaken: 21, requirementsFilled: 6,
    courses: [
      { code: 'CSCI 1100', title: 'Computer Science I',                    grade: 'A-', credits: 4, requirement: 'CS Major',     status: 'complete' },
      { code: 'MATH 1010', title: 'Calculus I',                            grade: 'A',  credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'PHYS 1100', title: 'Physics I',                             grade: 'A-', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'ITWS 1100', title: 'Introduction to Web Science',           grade: 'A',  credits: 4, requirement: 'ITWS Minor',  status: 'complete' },
      { code: 'WRIT 1000', title: 'Writing & Research',                    grade: 'A-', credits: 4, requirement: 'HASS',         status: 'complete' },
      { code: 'ENGR 1010', title: 'Navigating a Career in Engineering',    grade: 'A',  credits: 1, requirement: 'Free',          status: 'complete' },
    ],
  },
];

export interface ScheduleCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  fulfills: string;
  color: string;
  professor?: string;
  description?: string;
  slots: { day: string; startHour: number; startMin: number; endHour: number; endMin: number; room: string }[];
}

export const currentSchedule: ScheduleCourse[] = [
  {
    id: 'csci2300', code: 'CSCI 2300', title: 'Introduction to Algorithms',
    credits: 4, fulfills: 'CS Major Requirement', color: '#ef4444',
    professor: 'Elliot Anshelevich',
    description: 'Introduction to the design and analysis of algorithms. Topics include sorting, searching, graph algorithms, dynamic programming, greedy algorithms, and NP-completeness.',
    slots: [
      { day: 'Wednesday', startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'AE 214' },
      { day: 'Monday', startHour: 12, startMin: 0, endHour: 13, endMin: 50, room: 'DCC 308' },
      { day: 'Thursday', startHour: 12, startMin: 0, endHour: 13, endMin: 50, room: 'DCC 308' },
    ],
  },
  {
    id: 'comm2660', code: 'COMM 2660', title: 'Introduction to Graphic Design',
    credits: 4, fulfills: 'HASS Pathway Requirement', color: '#3b82f6',
    professor: 'Thomas Misa',
    description: 'Introduction to graphic design principles: typography, color theory, layout, and visual communication. Students produce projects using industry-standard tools.',
    slots: [
      { day: 'Wednesday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'Sage 4550' },
      { day: 'Friday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'Sage 4550' },
    ],
  },
  {
    id: 'math2010', code: 'MATH 2400', title: 'Intro to Differential Equations',
    credits: 4, fulfills: 'Math Major Requirement', color: '#22c55e',
    professor: 'Donald Schwendeman',
    description: 'Ordinary differential equations with applications. First and higher order equations, systems of equations, Laplace transforms, and numerical methods.',
    slots: [
      { day: 'Monday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'AE 219' },
      { day: 'Thursday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'AE 219' },
    ],
  },
];

// Grouped section-based course search structure
export interface CourseSection {
  id: string;
  professor: string;
  classLength: string;
  seatsTotal: number;
  seatsFilled: number;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}

export interface SearchCourse {
  code: string;
  title: string;
  credits: number;
  description: string;
  fulfills?: string;
  sections: CourseSection[];
}

export const fall2026Courses: SearchCourse[] = [
  {
    code: 'ARTS-1020', title: 'Digital Imaging', credits: 4,
    fulfills: 'HASS Elective',
    description: 'Introduces students to digital photography, Web design, and interactive multimedia in making art. Students broaden their understanding of composition, color theory, typography, and narrative flow.',
    sections: [
      { id: '77222', professor: 'Nathan Meltz', classLength: '08/27 - 12/11', seatsTotal: 45, seatsFilled: 38, friday: '10a-11:50a' },
      { id: '77226', professor: 'Nathan Meltz', classLength: '08/27 - 12/11', seatsTotal: 45, seatsFilled: 45, tuesday: '4p-5:50p' },
    ],
  },
  {
    code: 'ARTS-1030', title: 'Digital Filmmaking', credits: 4,
    fulfills: 'HASS Elective',
    description: 'A hands-on introduction to film making. Students study a selection of great films and learn how to make movies using lightweight field production equipment.',
    sections: [
      { id: '77224', professor: 'James Chen', classLength: '08/27 - 12/11', seatsTotal: 30, seatsFilled: 18, tuesday: '2p-3:50p' },
      { id: '77225', professor: 'James Chen', classLength: '08/27 - 12/11', seatsTotal: 30, seatsFilled: 30, thursday: '2p-3:50p' },
    ],
  },
  {
    code: 'ARTS-1050', title: 'Art In Context', credits: 4,
    fulfills: 'HASS',
    description: 'A thematic investigation of art in diverse social, cultural, and historical contexts. Explores how artists, art collectives, artworks, and institutional structures interact with their environments.',
    sections: [
      { id: '77228', professor: 'Sarah Park', classLength: '08/27 - 12/11', seatsTotal: 40, seatsFilled: 20, wednesday: '10a-11:50a' },
      { id: '77229', professor: 'Sarah Park', classLength: '08/27 - 12/11', seatsTotal: 40, seatsFilled: 40, monday: '2p-3:50p' },
    ],
  },
  {
    code: 'CSCI-1100', title: 'Computer Science I', credits: 4,
    fulfills: 'CS Major',
    description: 'Introduction to computer programming, algorithm design and analysis. Topics include basic computer organization, use of top-down design and structured programming, debugging techniques.',
    sections: [
      { id: '71001', professor: 'Buster Dunsmore', classLength: '08/27 - 12/11', seatsTotal: 60, seatsFilled: 50, monday: '10a-11:50a', wednesday: '10a-11:50a' },
      { id: '71002', professor: 'Wes Turner', classLength: '08/27 - 12/11', seatsTotal: 60, seatsFilled: 45, tuesday: '8a-9:50a', thursday: '8a-9:50a' },
    ],
  },
  {
    code: 'CSCI-1200', title: 'Data Structures', credits: 4,
    fulfills: 'CS Major',
    description: 'Programming concepts: functions, parameter passing, pointers, arrays, strings, structs, classes, templates. Mathematical tools: sets, functions, relations, order notation, algorithm complexity.',
    sections: [
      { id: '71003', professor: 'Barbara Cutler', classLength: '08/27 - 12/11', seatsTotal: 50, seatsFilled: 42, tuesday: '12p-1:50p', thursday: '12p-1:50p' },
      { id: '71004', professor: 'Barbara Cutler', classLength: '08/27 - 12/11', seatsTotal: 50, seatsFilled: 50, monday: '4p-5:50p', wednesday: '4p-5:50p' },
    ],
  },
  {
    code: 'CSCI-1700', title: 'Intro to RCOS', credits: 2,
    fulfills: 'Free Elective',
    description: 'The Rensselaer Center for Open Source (RCOS) is a group of undergraduate students working on team-based open source software and hardware projects.',
    sections: [
      { id: '71010', professor: 'Moorthy Kannan', classLength: '08/27 - 12/11', seatsTotal: 60, seatsFilled: 30, wednesday: '4p-5:50p' },
    ],
  },
  {
    code: 'CSCI-2600', title: 'Principles of Software', credits: 4,
    fulfills: 'CS Major',
    description: 'Introduction to software engineering principles. Covers software design, testing, version control, and team-based development practices.',
    sections: [
      { id: '71020', professor: 'Wesley Turner', classLength: '08/27 - 12/11', seatsTotal: 45, seatsFilled: 30, monday: '2p-3:50p', thursday: '2p-3:50p' },
      { id: '71021', professor: 'David Goldschmidt', classLength: '08/27 - 12/11', seatsTotal: 45, seatsFilled: 45, tuesday: '10a-11:50a', friday: '10a-11:50a' },
    ],
  },
  {
    code: 'MATH-4100', title: 'Linear Algebra', credits: 4,
    fulfills: 'Math Major',
    description: 'Systems of linear equations, Gaussian elimination, vector spaces, linear maps, matrix representations, determinants, eigenvalues and eigenvectors, inner product spaces.',
    sections: [
      { id: '71030', professor: 'Mark Holmes', classLength: '08/27 - 12/11', seatsTotal: 40, seatsFilled: 20, monday: '10a-11:50a', friday: '10a-11:50a' },
      { id: '71031', professor: 'Isom Herron', classLength: '08/27 - 12/11', seatsTotal: 40, seatsFilled: 38, tuesday: '2p-3:50p', thursday: '2p-3:50p' },
    ],
  },
  {
    code: 'PHIL-2140', title: 'Ethics', credits: 4,
    fulfills: 'HASS',
    description: 'Systematic inquiry into the principles of moral life and their application to contemporary ethical issues. Topics include consequentialism, deontology, virtue ethics, and applied ethics.',
    sections: [
      { id: '71040', professor: 'Sandra Marshall', classLength: '08/27 - 12/11', seatsTotal: 35, seatsFilled: 28, tuesday: '2p-3:50p', thursday: '2p-3:50p' },
      { id: '71041', professor: 'Sandra Marshall', classLength: '08/27 - 12/11', seatsTotal: 35, seatsFilled: 35, wednesday: '6p-7:50p' },
    ],
  },
  {
    code: 'COMM-4200', title: 'Digital Media Production', credits: 4,
    fulfills: 'HASS Pathway',
    description: 'Advanced study and practice in digital media production, covering video, audio, and interactive media creation for professional and artistic contexts.',
    sections: [
      { id: '71050', professor: 'Audrey Bennett', classLength: '08/27 - 12/11', seatsTotal: 25, seatsFilled: 15, friday: '2p-3:50p' },
    ],
  },
];

export const spring2027Courses: SearchCourse[] = [
  {
    code: 'ECSE-4840', title: 'Intro to Machine Learning', credits: 3,
    fulfills: 'CS Elective',
    description: 'A broad introduction to statistical machine learning. Topics include supervised learning: generative/discriminative learning, parametric/non-parametric learning, neural networks, and support vector machines.',
    sections: [
      { id: '82001', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsTotal: 40, seatsFilled: 20, monday: '10a-11:30a', wednesday: '10a-11:30a' },
      { id: '82002', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsTotal: 40, seatsFilled: 22, tuesday: '2p-3:30p', thursday: '2p-3:30p' },
      { id: '82003', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsTotal: 40, seatsFilled: 15, friday: '8a-10:50a' },
      { id: '82004', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsTotal: 40, seatsFilled: 28, monday: '4p-5:30p', wednesday: '4p-5:30p' },
    ],
  },
  {
    code: 'CSCI-4430', title: 'Programming Languages', credits: 4,
    fulfills: 'CS Major',
    description: 'Study of programming language design and implementation. Topics include syntax, semantics, type systems, functional programming, logic programming, and language implementation techniques.',
    sections: [
      { id: '82010', professor: 'Carlos Varela', classLength: '01/20 - 05/10', seatsTotal: 50, seatsFilled: 35, tuesday: '10a-11:50a', friday: '10a-11:50a' },
      { id: '82011', professor: 'Carlos Varela', classLength: '01/20 - 05/10', seatsTotal: 50, seatsFilled: 50, monday: '2p-3:50p', wednesday: '2p-3:50p' },
    ],
  },
  {
    code: 'MATH-4090', title: 'Foundations of Analysis', credits: 4,
    fulfills: 'Math Major',
    description: 'Fundamental theorems of real analysis. Limits, continuity, differentiation and integration of functions of a real variable, uniform convergence, and metric spaces.',
    sections: [
      { id: '82020', professor: 'Donald Schwendeman', classLength: '01/20 - 05/10', seatsTotal: 40, seatsFilled: 32, monday: '10a-11:50a', wednesday: '10a-11:50a' },
      { id: '82021', professor: 'Donald Schwendeman', classLength: '01/20 - 05/10', seatsTotal: 40, seatsFilled: 18, tuesday: '2p-3:50p', thursday: '2p-3:50p' },
    ],
  },
  {
    code: 'ITWS-4500', title: 'IT & Web Science Capstone', credits: 4,
    fulfills: 'ITWS Minor',
    description: 'Capstone course integrating information technology and web science concepts through a team-based project. Students research, design, develop, and present a substantial IT/Web application.',
    sections: [
      { id: '82030', professor: 'Jim Hendler', classLength: '01/20 - 05/10', seatsTotal: 30, seatsFilled: 18, wednesday: '4p-5:50p', friday: '4p-5:50p' },
    ],
  },
  {
    code: 'LANG-2XXX', title: 'French II', credits: 4,
    fulfills: 'HASS',
    description: 'Continuation of French language study, focusing on intermediate grammar, conversation, reading, and composition. Taught in French.',
    sections: [
      { id: '82040', professor: 'Marie Dupont', classLength: '01/20 - 05/10', seatsTotal: 25, seatsFilled: 12, monday: '12p-1:50p', wednesday: '12p-1:50p' },
      { id: '82041', professor: 'Marie Dupont', classLength: '01/20 - 05/10', seatsTotal: 25, seatsFilled: 25, tuesday: '10a-11:50a', thursday: '10a-11:50a' },
    ],
  },
  {
    code: 'COMM-4500', title: 'Advanced Communication Seminar', credits: 4,
    fulfills: 'HASS Pathway',
    description: 'Advanced seminar exploring communication theory, media studies, and practical applications. Students complete a substantial research project and public presentation.',
    sections: [
      { id: '82050', professor: 'Audrey Bennett', classLength: '01/20 - 05/10', seatsTotal: 20, seatsFilled: 8, thursday: '4p-5:50p' },
    ],
  },
];

export interface FutureSlot {
  day: string; startHour: number; startMin: number; endHour: number; endMin: number; room: string;
}

export interface FutureCourse {
  code: string;
  title: string;
  credits: number;
  fulfills: string;
  color: string;
  semester: string;
  slots: FutureSlot[];
  professor?: string;
  sectionId?: string;
}

export const futureCoursesFall2026: FutureCourse[] = [
  {
    code: 'MATH-4100', title: 'Linear Algebra', credits: 4, fulfills: 'Math Major', color: '#ef4444',
    semester: 'Fall 2026', professor: 'Mark Holmes', sectionId: '71030',
    slots: [
      { day: 'Monday',    startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'AE 214' },
      { day: 'Friday',    startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'AE 214' },
    ],
  },
  {
    code: 'CSCI-2600', title: 'Principles of Software', credits: 4, fulfills: 'CS Major', color: '#3b82f6',
    semester: 'Fall 2026', professor: 'Wesley Turner', sectionId: '71020',
    slots: [
      { day: 'Monday',    startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'DCC 318' },
      { day: 'Thursday',  startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'DCC 318' },
    ],
  },
];

export const futureCoursesSpring2027: FutureCourse[] = [
  {
    code: 'MATH-4090', title: 'Foundations of Analysis', credits: 4, fulfills: 'Math Major', color: '#22c55e',
    semester: 'Spring 2027', professor: 'Donald Schwendeman', sectionId: '82020',
    slots: [
      { day: 'Monday',    startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'Sage 3510' },
      { day: 'Wednesday', startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'Sage 3510' },
    ],
  },
  {
    code: 'CSCI-4430', title: 'Programming Languages', credits: 4, fulfills: 'CS Major', color: '#8b5cf6',
    semester: 'Spring 2027', professor: 'Carlos Varela', sectionId: '82010',
    slots: [
      { day: 'Tuesday',   startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'DCC 308' },
      { day: 'Friday',    startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'DCC 308' },
    ],
  },
];

export const transferHistory = [
  {
    rpiCode: 'CSCI 1200', title: 'Data Structures', externalCode: 'CIS 290',
    institution: 'Hudson Valley Community College', creditsReceived: 3, yearReceived: 2023,
    modality: 'in-person' as const,
  },
  {
    rpiCode: 'MATH 4100', title: 'Linear Algebra', externalCode: 'MATH 545',
    institution: 'UMass Amherst', creditsReceived: 3, yearReceived: 2024,
    modality: 'online' as const,
  },
];

export const transferInstitutions = [
  { name: 'Adelphi University', city: 'Garden City', state: 'NY', courses: [
    { rpiCode: 'MATH 4100', rpiTitle: 'Linear Algebra', extCode: 'MATH 352' },
    { rpiCode: 'MANE 4070', rpiTitle: 'Aerodynamics', extCode: 'AERO 380' },
    { rpiCode: 'MANE 4080', rpiTitle: 'Propulsion Systems', extCode: 'AERO 385' },
    { rpiCode: 'MANE 4090', rpiTitle: 'Flight Dynamics', extCode: 'AERO 390' },
    { rpiCode: 'CSCI 1100', rpiTitle: 'Computer Science 1', extCode: 'CS 101' },
    { rpiCode: 'CSCI 1200', rpiTitle: 'Data Structures', extCode: 'CS 102' },
    { rpiCode: 'CSCI 2300', rpiTitle: 'Introduction to Algorithms', extCode: 'CS 102' },
    { rpiCode: 'CSCI 2800', rpiTitle: 'Computer Architectures & OS', extCode: 'CS 105' },
  ]},
  { name: 'Adirondack Community College', city: 'Queensbury', state: 'NY', courses: [] },
  { name: 'Albany College of Pharmacy', city: 'Albany', state: 'NY', courses: [] },
  { name: 'Alfred University', city: 'Alfred', state: 'NY', courses: [] },
  { name: 'Bard - BHSEC Queens', city: 'Queens', state: 'NY', courses: [] },
  { name: 'Barnard College', city: 'New York', state: 'NY', courses: [] },
  { name: 'Berkeley College', city: 'White Plains', state: 'NY', courses: [] },
  { name: 'Buffalo State University', city: 'Buffalo', state: 'NY', courses: [] },
  { name: 'Buffalo University', city: 'Buffalo', state: 'NY', courses: [] },
  { name: 'Colombia University', city: 'New York', state: 'NY', courses: [] },
  { name: 'Colgate University', city: 'Hamilton', state: 'NY', courses: [] },
  { name: 'Cornell University', city: 'Ithaca', state: 'NY', courses: [] },
];

export const transferCourses = [
  { rpiCode: 'ARTS-1020', rpiTitle: 'Digital Imaging', credits: 4, universities: [
    { name: 'Columbia University', extCode: 'DRAW-101', credits: 4 },
    { name: 'Cornell University', extCode: 'ARTS-100', credits: 3 },
    { name: 'Clarkson University', extCode: 'ARTS-101', credits: 4 },
    { name: 'SUNY Delhi', extCode: 'ARTS-108', credits: 4 },
  ]},
  { rpiCode: 'ARTS-1030', rpiTitle: 'Digital Filmmaking', credits: 4, universities: [] },
  { rpiCode: 'ARTS-1050', rpiTitle: 'Art in Context', credits: 4, universities: [] },
  { rpiCode: 'ARTS-1200', rpiTitle: 'Basic Drawing', credits: 4, universities: [
    { name: 'Columbia University', extCode: 'DRAW-101', credits: 4 },
    { name: 'Cornell University', extCode: 'ARTS-100', credits: 3 },
    { name: 'Clarkson University', extCode: 'ARTS-101', credits: 4 },
    { name: 'SUNY Delhi', extCode: 'ARTS-108', credits: 4 },
  ]},
  { rpiCode: 'ARTS-1380', rpiTitle: 'Fundamentals of Music & Composition', credits: 4, universities: [] },
  { rpiCode: 'ARTS-2010', rpiTitle: 'Intermediate Video', credits: 4, universities: [] },
];

export const suggestedCourses = [
  {
    code: 'CSCI 2600', title: 'Principles of Software', credits: 4,
    fulfills: 'CS Major', priority: 'high' as const,
    reason: 'Required CS course — prerequisites met after CSCI 2300 completes',
    offeredIn: 'Fall & Spring',
  },
  {
    code: 'MATH 4100', title: 'Linear Algebra', credits: 4,
    fulfills: 'Math Major', priority: 'high' as const,
    reason: 'Required Math course — no prerequisites needed',
    offeredIn: 'Fall & Spring',
  },
  {
    code: 'PHIL 2140', title: 'Ethics', credits: 4,
    fulfills: 'HASS', priority: 'medium' as const,
    reason: 'Required HASS course — no prerequisites needed',
    offeredIn: 'Fall & Spring',
  },
  {
    code: 'LANG 2XXX', title: 'Language Elective', credits: 4,
    fulfills: 'HASS', priority: 'medium' as const,
    reason: 'Required language elective to complete HASS requirements',
    offeredIn: 'Fall & Spring',
  },
  {
    code: 'CSCI 4430', title: 'Programming Languages', credits: 4,
    fulfills: 'CS Major', priority: 'medium' as const,
    reason: 'Required CS course — take after CSCI 2300',
    offeredIn: 'Spring',
  },
];

// ── Requirement options ───────────────────────────────────────────────────────
// For each incomplete course code, provides the course(s) that can satisfy it.
// Single-entry arrays = one specific required course (show sections).
// Multi-entry arrays  = choose any one (generic requirement slot).

export interface CourseOption {
  code: string;
  title: string;
  credits: number;
  offeredIn: string;
  prereqs?: string;
  sections?: { id: string; professor: string; time: string }[];
}

export const requirementOptions: Record<string, CourseOption[]> = {
  // CS Major
  'CSCI 2600': [{ code: 'CSCI 2600', title: 'Principles of Software', credits: 4, offeredIn: 'Fall & Spring',
    prereqs: 'CSCI 1200',
    sections: [
      { id: '01', professor: 'Wesley Turner',      time: 'Mon/Thu 2–4 PM' },
      { id: '02', professor: 'David Goldschmidt',  time: 'Tue/Fri 10 AM–12 PM' },
    ],
  }],
  'CSCI 4430': [{ code: 'CSCI 4430', title: 'Programming Languages', credits: 4, offeredIn: 'Spring',
    prereqs: 'CSCI 2300',
    sections: [
      { id: '01', professor: 'Carlos Varela', time: 'Tue/Fri 10 AM–12 PM' },
      { id: '02', professor: 'Carlos Varela', time: 'Mon/Wed 2–4 PM' },
    ],
  }],

  // Math Major
  'MATH 4100': [{ code: 'MATH 4100', title: 'Linear Algebra', credits: 4, offeredIn: 'Fall & Spring',
    sections: [
      { id: '01', professor: 'Mark Holmes',  time: 'Mon/Fri 10 AM–12 PM' },
      { id: '02', professor: 'Isom Herron',  time: 'Tue/Thu 2–4 PM' },
    ],
  }],
  'MATH 4090': [{ code: 'MATH 4090', title: 'Foundations of Analysis', credits: 4, offeredIn: 'Spring',
    prereqs: 'MATH 1020',
    sections: [
      { id: '01', professor: 'Donald Schwendeman', time: 'Mon/Wed 10 AM–12 PM' },
      { id: '02', professor: 'Donald Schwendeman', time: 'Tue/Thu 2–4 PM' },
    ],
  }],

  // ITWS Minor
  'ITWS 4500': [{ code: 'ITWS 4500', title: 'IT & Web Science Capstone', credits: 4, offeredIn: 'Spring',
    prereqs: 'Senior standing',
    sections: [
      { id: '01', professor: 'Jim Hendler',  time: 'Wed/Fri 4–6 PM' },
    ],
  }],
  'COMM 2660': [{ code: 'COMM 2660', title: 'Introduction to Graphic Design', credits: 4, offeredIn: 'Fall & Spring',
    sections: [
      { id: '01', professor: 'Thomas Misa',        time: 'Wed/Fri 2–4 PM' },
      { id: '02', professor: 'Amy Stornaiuolo',    time: 'Mon/Wed 10 AM–12 PM' },
    ],
  }],

  // HASS
  'PHIL 2140': [{ code: 'PHIL 2140', title: 'Ethics', credits: 4, offeredIn: 'Fall & Spring',
    sections: [
      { id: '01', professor: 'Sandra Marshall', time: 'Tue/Thu 2–4 PM' },
      { id: '02', professor: 'Sandra Marshall', time: 'Wed 6–8 PM' },
    ],
  }],
  'LANG 2XXX': [
    { code: 'LANG 2110', title: 'French II',    credits: 4, offeredIn: 'Fall & Spring' },
    { code: 'LANG 2120', title: 'Spanish II',   credits: 4, offeredIn: 'Fall & Spring' },
    { code: 'LANG 2130', title: 'German II',    credits: 4, offeredIn: 'Fall' },
    { code: 'LANG 2140', title: 'Japanese II',  credits: 4, offeredIn: 'Spring' },
    { code: 'LANG 2150', title: 'Mandarin II',  credits: 4, offeredIn: 'Fall & Spring' },
  ],

  // Architecture
  'ARCH 1020': [{ code: 'ARCH 1020', title: 'Design Fundamentals I',   credits: 4, offeredIn: 'Fall',
    sections: [{ id: '01', professor: 'David Gerber',    time: 'Mon/Wed 9 AM–12 PM' }],
  }],
  'ARCH 1030': [{ code: 'ARCH 1030', title: 'Design Fundamentals II',  credits: 4, offeredIn: 'Spring',
    prereqs: 'ARCH 1020',
    sections: [{ id: '01', professor: 'David Gerber',    time: 'Tue/Thu 9 AM–12 PM' }],
  }],
  'ARCH 2050': [{ code: 'ARCH 2050', title: 'Architectural History Survey', credits: 4, offeredIn: 'Fall & Spring',
    sections: [{ id: '01', professor: 'Lynnette Widder', time: 'Mon/Wed/Fri 1–2 PM' }],
  }],
  'ARCH 2300': [{ code: 'ARCH 2300', title: 'Structures & Materials',  credits: 4, offeredIn: 'Spring',
    prereqs: 'ARCH 1030',
    sections: [{ id: '01', professor: 'Brian Oswald',    time: 'Tue/Thu 2–4 PM' }],
  }],

  // Pathway
  'COMM 4200': [{ code: 'COMM 4200', title: 'Digital Media Production',       credits: 4, offeredIn: 'Fall',
    sections: [{ id: '01', professor: 'Audrey Bennett', time: 'Fri 2–4 PM' }],
  }],
  'COMM 4500': [{ code: 'COMM 4500', title: 'Advanced Communication Seminar', credits: 4, offeredIn: 'Spring',
    prereqs: 'COMM 4200',
    sections: [{ id: '01', professor: 'Audrey Bennett', time: 'Thu 4–6 PM' }],
  }],

  // Free Electives
  'CSCI 1170': [{ code: 'CSCI 1170', title: 'Introduction to RCOS', credits: 2, offeredIn: 'Fall & Spring',
    sections: [{ id: '01', professor: 'Moorthy Kannan', time: 'Wed 4–6 PM' }],
  }],
  'ECON 4XXX': [
    { code: 'ECON 4150', title: 'Game Theory',             credits: 4, offeredIn: 'Spring' },
    { code: 'ECON 4280', title: 'Environmental Economics', credits: 4, offeredIn: 'Fall' },
    { code: 'ECON 4350', title: 'Financial Economics',     credits: 4, offeredIn: 'Fall & Spring' },
    { code: 'ECON 4420', title: 'Labor Economics',         credits: 4, offeredIn: 'Spring' },
    { code: 'ECON 4480', title: 'International Trade',     credits: 4, offeredIn: 'Fall' },
  ],
};

export interface WhatIfRequirement {
  code: string;
  title: string;
  credits: number;
  satisfied: boolean | 'inprogress';
}

export interface WhatIfMajor {
  id: string;
  name: string;
  degree: string;
  description: string;
  totalCredits: number;
  requirements: WhatIfRequirement[];
}

export const alternativeMajors: WhatIfMajor[] = [
  {
    id: 'data-science',
    name: 'Data Science',
    degree: 'BS Data Science',
    description: 'Combines computer science, mathematics, and statistics to extract insights from large datasets. Strong overlap with your current CS and Math courses.',
    totalCredits: 40,
    requirements: [
      { code: 'CSCI 1100', title: 'Computer Science I',             credits: 4, satisfied: true },
      { code: 'CSCI 1200', title: 'Data Structures',                credits: 4, satisfied: true },
      { code: 'CSCI 2300', title: 'Introduction to Algorithms',     credits: 4, satisfied: 'inprogress' },
      { code: 'MATH 1010', title: 'Calculus I',                     credits: 4, satisfied: true },
      { code: 'MATH 1020', title: 'Calculus II',                    credits: 4, satisfied: true },
      { code: 'MATH 2010', title: 'Multivar Calc & Matrix Algebra', credits: 4, satisfied: true },
      { code: 'CSCI 4800', title: 'Human-Computer Interaction',     credits: 4, satisfied: true },
      { code: 'CSCI 4380', title: 'Database Systems',               credits: 4, satisfied: false },
      { code: 'CSCI 4100', title: 'Artificial Intelligence',        credits: 4, satisfied: false },
      { code: 'MATH 4800', title: 'Introduction to Statistics',     credits: 4, satisfied: false },
    ],
  },
  {
    id: 'electrical-engineering',
    name: 'Electrical Engineering',
    degree: 'BS Electrical Engineering',
    description: 'Study of electricity, electronics, and electromagnetism applied to real-world systems. Your physics and math background gives you a strong foundation.',
    totalCredits: 40,
    requirements: [
      { code: 'MATH 1010', title: 'Calculus I',                    credits: 4, satisfied: true },
      { code: 'MATH 1020', title: 'Calculus II',                   credits: 4, satisfied: true },
      { code: 'MATH 2010', title: 'Multivar Calc & Matrix Algebra',credits: 4, satisfied: true },
      { code: 'PHYS 1100', title: 'Physics I',                     credits: 4, satisfied: true },
      { code: 'PHYS 1200', title: 'Physics II',                    credits: 4, satisfied: true },
      { code: 'ECSE 1010', title: 'Introduction to ECSE',          credits: 4, satisfied: false },
      { code: 'ECSE 2010', title: 'Signals and Systems I',         credits: 4, satisfied: false },
      { code: 'ECSE 2050', title: 'Introduction to Electronics',   credits: 4, satisfied: false },
      { code: 'ECSE 2100', title: 'Fields and Waves I',            credits: 4, satisfied: false },
      { code: 'ECSE 4010', title: 'Digital Signal Processing',     credits: 4, satisfied: false },
    ],
  },
  {
    id: 'cognitive-science',
    name: 'Cognitive Science',
    degree: 'BS Cognitive Science',
    description: 'Interdisciplinary study of mind, brain, and intelligence, combining CS, psychology, and philosophy. Many of your existing courses already count.',
    totalCredits: 28,
    requirements: [
      { code: 'PSYC 1200', title: 'Intro to Psychological Science',  credits: 4, satisfied: true },
      { code: 'CSCI 1100', title: 'Computer Science I',              credits: 4, satisfied: true },
      { code: 'CSCI 4800', title: 'Human-Computer Interaction',      credits: 4, satisfied: true },
      { code: 'PHIL 2140', title: 'Ethics',                          credits: 4, satisfied: false },
      { code: 'PSYC 4800', title: 'Cognitive Psychology',            credits: 4, satisfied: false },
      { code: 'PSYC 4100', title: 'Computational Cognitive Science', credits: 4, satisfied: false },
      { code: 'LANG 2XXX', title: 'Language Elective',               credits: 4, satisfied: false },
    ],
  },
  {
    id: 'game-simulation',
    name: 'Games & Simulation Arts & Sciences',
    degree: 'BS Games & Simulation Arts & Sciences',
    description: 'Focuses on interactive media design, computer graphics, and game development. Combines technical CS skills with creative design.',
    totalCredits: 36,
    requirements: [
      { code: 'CSCI 1100', title: 'Computer Science I',              credits: 4, satisfied: true },
      { code: 'CSCI 1200', title: 'Data Structures',                 credits: 4, satisfied: true },
      { code: 'MATH 1010', title: 'Calculus I',                      credits: 4, satisfied: true },
      { code: 'ARTS 1050', title: 'Art in Context',                  credits: 4, satisfied: true },
      { code: 'GSAS 2100', title: 'Game Design I',                   credits: 4, satisfied: false },
      { code: 'GSAS 2200', title: 'Game Design II',                  credits: 4, satisfied: false },
      { code: 'CSCI 4230', title: 'Computer Graphics',               credits: 4, satisfied: false },
      { code: 'GSAS 4100', title: 'Game Design Capstone',            credits: 4, satisfied: false },
      { code: 'COMM 2660', title: 'Introduction to Graphic Design',  credits: 4, satisfied: 'inprogress' },
    ],
  },
];
