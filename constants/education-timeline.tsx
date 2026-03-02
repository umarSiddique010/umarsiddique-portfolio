import { Terminal, GraduationCap, Layers } from 'lucide-react';

export type EducationTimelineItem = {
  year: string;
  title: string;
  institution: string;
  description: string;
  highlight: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
};

export const educationTimelineData: EducationTimelineItem[] = [
  {
    year: '2024 – Present',
    title: 'Full-Time Web Engineering',
    institution: 'Self-Taught & Open Source',
    description:
      'Transitioned completely into software development. Built and published two npm packages, mastered React & Next.js, and maintained a continuous streak of shipping production-ready code.',
    highlight: 'Published @mdus npm hooks',
    icon: <Terminal className="w-5 h-5" />,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    year: '2020 – 2023',
    title: 'B.A. (Hons) Political Science',
    institution: 'Gossner College, Ranchi',
    description:
      'Developed strong analytical skills, critical thinking, and the ability to deconstruct complex social systems—skills I now apply to architecting scalable frontend applications.',
    highlight: '69% Hons | 72% Aggregate',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    year: '2018 – 2019',
    title: 'Senior Secondary (Science with Math)',
    institution: 'Jharkhand Commerce Inter College',
    description:
      'Built a solid foundation in logic and mathematics, setting the initial stage for algorithmic thinking.',
    highlight: '54.5%',
    icon: <Layers className="w-5 h-5" />,
    color: 'text-fuchsia-500',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20',
  },
  {
    year: '2015 – 2016',
    title: 'Secondary Education',
    institution: 'Subhash Public School',
    description: 'The early days of building a strong academic base.',
    highlight: '7.0 CGPA',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'text-muted-foreground',
    bg: 'bg-foreground/5',
    border: 'border-foreground/10',
  },
];
