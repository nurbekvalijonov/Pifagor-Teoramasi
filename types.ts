export interface ApplicationItem {
  id: string;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  formula: string;
  icon: string;
  shapeType: 'ladder' | 'phone' | 'carpet' | 'map' | 'cosmos' | 'grid' | 'field' | 'lighthouse' | 'catapult' | 'printer';
}

export interface GeminiResponse {
  text: string;
  sources?: string[];
}