export interface Report { id: string; title: string; createdAt: string; data: Record<string, unknown>; }
export interface Review { id: string; author: string; rating: number; comment: string; }
