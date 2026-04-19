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
    id: 'spring2026', label: 'Spring 2026', current: true,
    gpa: 4.0, creditsTaken: 16, requirementsFilled: 4,
    courses: [
      { code: 'CSCI 2300', title: 'Introduction to Algorithms',       grade: '—', credits: 4, requirement: 'CS Major',   status: 'inprogress' },
      { code: 'MATH 2400', title: 'Intro to Differential Equations',  grade: '—', credits: 4, requirement: 'Math Major',  status: 'inprogress' },
      { code: 'ITWS 4400', title: 'The Web and Society',              grade: '—', credits: 4, requirement: 'ITWS Minor', status: 'inprogress' },
      { code: 'COMM 2660', title: 'Introduction to Graphic Design',   grade: '—', credits: 4, requirement: 'Pathway',    status: 'inprogress' },
    ],
  },
  {
    id: 'fall2025', label: 'Fall 2025',
    gpa: 3.6, creditsTaken: 20, requirementsFilled: 5,
    courses: [
      { code: 'CSCI 2960', title: 'Computational Problem Solving',       grade: 'B+', credits: 4, requirement: 'Math/Science',  status: 'complete' },
      { code: 'ECON 1200', title: 'Principles of Economics',             grade: 'B+', credits: 4, requirement: 'HASS',          status: 'complete' },
      { code: 'COMM 2200', title: 'Media & Society',                     grade: 'B+', credits: 4, requirement: 'Pathway',       status: 'complete' },
      { code: 'CSCI 4440', title: 'Software Design & Documentation',     grade: 'B+', credits: 4, requirement: 'Concentration', status: 'complete' },
      { code: 'CSCI 4800', title: 'Human-Computer Interaction',          grade: 'A-', credits: 4, requirement: 'Concentration', status: 'complete' },
    ],
  },
  {
    id: 'spring2025', label: 'Spring 2025',
    gpa: 3.6, creditsTaken: 20, requirementsFilled: 5,
    courses: [
      { code: 'CSCI 2500', title: 'Computer Organization',          grade: 'B+', credits: 4, requirement: 'CS Major',      status: 'complete' },
      { code: 'CSCI 4430', title: 'Programming Languages',          grade: 'A',  credits: 4, requirement: 'Concentration', status: 'complete' },
      { code: 'BIOL 1010', title: 'Introduction to Biology',        grade: 'A-', credits: 4, requirement: 'Math/Science',  status: 'complete' },
      { code: 'ARTS 1050', title: 'Art in Context',                 grade: 'A-', credits: 4, requirement: 'HASS',          status: 'complete' },
      { code: 'MGMT 1100', title: 'Management Principles',          grade: 'B+', credits: 4, requirement: 'Free',          status: 'complete' },
    ],
  },
  {
    id: 'fall2024', label: 'Fall 2024',
    gpa: 3.2, creditsTaken: 16, requirementsFilled: 4,
    courses: [
      { code: 'CSCI 2200', title: 'Foundations of Computer Science',      grade: 'B+', credits: 4, requirement: 'CS Major',     status: 'complete' },
      { code: 'MATH 2010', title: 'Multivar Calc & Matrix Algebra',       grade: 'B+', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'CHEM 1100', title: 'General Chemistry I',                  grade: 'B',  credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'COMM 1100', title: 'Communication in English I',           grade: 'B+', credits: 4, requirement: 'HASS',         status: 'complete' },
    ],
  },
  {
    id: 'spring2024', label: 'Spring 2024',
    gpa: 3.7, creditsTaken: 20, requirementsFilled: 5,
    courses: [
      { code: 'CSCI 1200', title: 'Data Structures',                      grade: 'A',  credits: 4, requirement: 'CS Major',     status: 'complete' },
      { code: 'MATH 1020', title: 'Calculus II',                          grade: 'A-', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'PHYS 1200', title: 'Physics II',                           grade: 'B+', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'ITWS 2110', title: 'Web Systems Development',              grade: 'B+', credits: 4, requirement: 'ITWS Minor',  status: 'complete' },
      { code: 'PSYC 1200', title: 'Intro to Psychological Science',       grade: 'A',  credits: 4, requirement: 'HASS',         status: 'complete' },
    ],
  },
  {
    id: 'fall2023', label: 'Fall 2023',
    gpa: 3.8, creditsTaken: 21, requirementsFilled: 6,
    courses: [
      { code: 'CSCI 1100', title: 'Computer Science I',                        grade: 'A-', credits: 4, requirement: 'CS Major',     status: 'complete' },
      { code: 'MATH 1010', title: 'Calculus I',                                grade: 'A',  credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'PHYS 1100', title: 'Physics I',                                 grade: 'A-', credits: 4, requirement: 'Math/Science', status: 'complete' },
      { code: 'ITWS 1100', title: 'Introduction to Web Science',               grade: 'A',  credits: 4, requirement: 'ITWS Minor',  status: 'complete' },
      { code: 'WRIT 1000', title: 'Writing & Research',                        grade: 'A-', credits: 4, requirement: 'HASS',         status: 'complete' },
      { code: 'ENGR 1010', title: 'Navigating a Career in Engineering',        grade: 'A',  credits: 1, requirement: 'Free',          status: 'complete' },
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
  slots: { day: string; startHour: number; startMin: number; endHour: number; endMin: number; room: string }[];
}

export const currentSchedule: ScheduleCourse[] = [
  {
    id: 'csci2300', code: 'CSCI 2300', title: 'Introduction to Algorithms',
    credits: 4, fulfills: 'Major Requirement', color: '#ef4444',
    slots: [
      { day: 'Wednesday', startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'AE 214' },
      { day: 'Monday', startHour: 12, startMin: 0, endHour: 13, endMin: 50, room: 'DCC 308' },
      { day: 'Thursday', startHour: 12, startMin: 0, endHour: 13, endMin: 50, room: 'DCC 308' },
    ],
  },
  {
    id: 'comm2660', code: 'COMM 2660', title: 'Introduction to Graphic Design',
    credits: 4, fulfills: 'HASS Pathway Requirement', color: '#3b82f6',
    slots: [
      { day: 'Wednesday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'Sage 4550' },
      { day: 'Friday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'Sage 4550' },
    ],
  },
  {
    id: 'math2010', code: 'MATH 2010', title: 'Multi-Variable Calculus',
    credits: 4, fulfills: 'Math/Science Requirement', color: '#22c55e',
    slots: [
      { day: 'Monday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'AE 219' },
      { day: 'Thursday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'AE 219' },
    ],
  },
];

export interface SearchCourse {
  code: string;
  title: string;
  credits: number;
  description: string;
  section?: string;
  professor?: string;
  classLength?: string;
  seatsAvailable?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}

export const fall2026Courses: SearchCourse[] = [
  {
    code: 'ARTS-1020', title: 'Digital Imaging', credits: 4,
    description: 'This course introduces students to digital photography, Web design, and interactive multimedia in making art. Students broaden their understanding of such topics as composition, effective use of images, color theory, typography, and narrative flow. Inquiry and experimentation are encouraged, leading towards the development of the skill and techniques needed to create visual art with electronic media.',
    section: '01-77222', professor: 'Nathan Meltz', classLength: '08/27 - 12/11', seatsAvailable: '7/45',
    monday: 'N/A', tuesday: 'N/A', wednesday: 'N/A', thursday: 'N/A', friday: '10a-11:50a',
  },
  {
    code: 'ARTS-1030', title: 'Digital Filmmaking', credits: 4,
    description: 'This is a hands-on introduction to film making. Students study a selection of great films; and learn how to make movies using lightweight field production equipment. Throughout the course students develop skills in storytelling, cinematography, and editing.',
    section: '01-77223', professor: 'James Chen', classLength: '08/27 - 12/11', seatsAvailable: '12/30',
    monday: 'N/A', tuesday: '2p-3:50p', wednesday: 'N/A', thursday: 'N/A', friday: 'N/A',
  },
  {
    code: 'ARTS-1050', title: 'Art In Context', credits: 4,
    description: 'A thematic investigation of art in diverse social, cultural, and historical contexts. This course explores how artists, art collectives, artworks, and institutional structures interact with their environments and communities.',
    section: '01-77224', professor: 'Sarah Park', classLength: '08/27 - 12/11', seatsAvailable: '20/40',
    monday: 'N/A', tuesday: 'N/A', wednesday: '10a-11:50a', thursday: 'N/A', friday: 'N/A',
  },
  {
    code: 'ARTS-1200', title: 'Basic Drawing', credits: 4,
    description: 'Introduction to drawing fundamentals including line, form, space, and composition using a variety of media.',
    section: '01-77225', professor: 'David Lee', classLength: '08/27 - 12/11', seatsAvailable: '5/25',
    monday: 'N/A', tuesday: 'N/A', wednesday: 'N/A', thursday: '1p-2:50p', friday: 'N/A',
  },
  {
    code: 'CSCI-1100', title: 'Computer Science I', credits: 4,
    description: 'An introduction to computer programming algorithm design and analysis. Additional topics include basic computer organization; internal representation of scalar and array data; use of top-down design and structured programming; introduction to debugging techniques.',
    section: '01-71001', professor: 'Buster Dunsmore', classLength: '08/27 - 12/11', seatsAvailable: '10/60',
    monday: '10a-11:50a', tuesday: 'N/A', wednesday: '10a-11:50a', thursday: 'N/A', friday: 'N/A',
  },
  {
    code: 'CSCI-1200', title: 'Data Structures', credits: 4,
    description: 'Programming concepts: functions, parameter passing, pointers, arrays, strings, structs, classes, templates. Mathematical tools: sets, functions, and relations, order notation, complexity of algorithms.',
    section: '01-71002', professor: 'Barbara Cutler', classLength: '08/27 - 12/11', seatsAvailable: '8/50',
    monday: 'N/A', tuesday: '12p-1:50p', wednesday: 'N/A', thursday: '12p-1:50p', friday: 'N/A',
  },
  {
    code: 'CSCI-1700', title: 'Early Introduction to Rcos', credits: 2,
    description: 'The Rensselaer Center for Open Source (RCOS) is an eclectic group of undergraduate students working on team-based open source projects, including both software and open hardware projects.',
    section: '01-71010', professor: 'Moorthy Kannan', classLength: '08/27 - 12/11', seatsAvailable: '30/60',
    monday: 'N/A', tuesday: 'N/A', wednesday: '4p-5:50p', thursday: 'N/A', friday: 'N/A',
  },
  {
    code: 'CSCI 2110', title: 'Web Systems Development', credits: 4,
    description: 'Introduction to full-stack web development. Topics include HTML, CSS, JavaScript, HTTP, client-server architecture, databases, and RESTful APIs.',
    section: '01-71020', professor: 'Wesley Turner', classLength: '08/27 - 12/11', seatsAvailable: '15/45',
    monday: '2p-3:50p', tuesday: 'N/A', wednesday: 'N/A', thursday: '2p-3:50p', friday: 'N/A',
  },
];

export const spring2027Courses: SearchCourse[] = [
  { code: 'ECSE-4840', title: 'Intro to Machine Learning', credits: 3, description: 'A broad introduction to statistical machine learning. Topics include supervised learning: generative/discriminative learning, parametric/non-parametric learning, neural networks, support vector machines, and unsupervised learning.', section: '01-82001', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsAvailable: '20/40', monday: '10a-11:30a', tuesday: 'N/A', wednesday: '10a-11:30a', thursday: 'N/A', friday: 'N/A' },
  { code: 'ECSE-4840', title: 'Intro to Machine Learning', credits: 3, description: 'A broad introduction to statistical machine learning. Topics include supervised learning: generative/discriminative learning, parametric/non-parametric learning, neural networks, support vector machines, and unsupervised learning.', section: '02-82002', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsAvailable: '18/40', monday: 'N/A', tuesday: '2p-3:30p', wednesday: 'N/A', thursday: '2p-3:30p', friday: 'N/A' },
  { code: 'ECSE-4840', title: 'Intro to Machine Learning', credits: 3, description: 'A broad introduction to statistical machine learning. Topics include supervised learning: generative/discriminative learning, parametric/non-parametric learning, neural networks, support vector machines, and unsupervised learning.', section: '03-82003', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsAvailable: '25/40', monday: 'N/A', tuesday: 'N/A', wednesday: 'N/A', thursday: 'N/A', friday: '8a-10:50a' },
  { code: 'ECSE-4840', title: 'Intro to Machine Learning', credits: 3, description: 'A broad introduction to statistical machine learning. Topics include supervised learning: generative/discriminative learning, parametric/non-parametric learning, neural networks, support vector machines, and unsupervised learning.', section: '04-82004', professor: 'Qiang Ji', classLength: '01/20 - 05/10', seatsAvailable: '12/40', monday: '4p-5:30p', tuesday: 'N/A', wednesday: '4p-5:30p', thursday: 'N/A', friday: 'N/A' },
];

export type Semester = 'Fall 2026' | 'Spring 2027';

export interface FutureSlot {
  day: string; startHour: number; startMin: number; endHour: number; endMin: number; room: string;
}
export interface FutureCourse {
  code: string; title: string; credits: number; fulfills: string; color: string; semester: Semester; slots: FutureSlot[];
}

export const futureCoursesFall2026: FutureCourse[] = [
  {
    code: 'MATH 4090', title: 'Foundations of Analysis', credits: 4, fulfills: 'Major Requirement', color: '#ef4444',
    slots: [
      { day: 'Monday',    startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'AE 214' },
      { day: 'Wednesday', startHour: 10, startMin: 0, endHour: 11, endMin: 50, room: 'AE 214' },
    ],
    semester: 'Fall 2026',
  },
  {
    code: 'MATH 4040', title: 'Intro to Topology', credits: 4, fulfills: 'Major Elective', color: '#3b82f6',
    slots: [
      { day: 'Tuesday',  startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'DCC 318' },
      { day: 'Thursday', startHour: 14, startMin: 0, endHour: 15, endMin: 50, room: 'DCC 318' },
    ],
    semester: 'Fall 2026',
  },
];

export const futureCoursesSpring2027: FutureCourse[] = [
  {
    code: 'MATH 2010', title: 'Multi-Variable Calculus', credits: 4, fulfills: 'Math/Science Requirement', color: '#22c55e',
    slots: [
      { day: 'Monday',   startHour: 12, startMin: 0, endHour: 13, endMin: 50, room: 'Sage 3510' },
      { day: 'Thursday', startHour: 12, startMin: 0, endHour: 13, endMin: 50, room: 'Sage 3510' },
    ],
    semester: 'Spring 2027',
  },
];

export const transferHistory = [
  { rpiCode: 'CSCI 1200', title: 'Data Structures', externalCode: 'CIS 290', institution: 'Hudson Valley Comm...', creditsReceived: 3, yearReceived: 2023 },
  { rpiCode: 'MATH 4100', title: 'Linear Algebra', externalCode: 'MATH 545', institution: 'Univ Mass at Amherst', creditsReceived: 3, yearReceived: 2024 },
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
