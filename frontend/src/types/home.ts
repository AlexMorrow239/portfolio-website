export interface Circle {
  x: string;
  y: string;
  size: number;
  delay: number;
}

export interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Metric {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}
