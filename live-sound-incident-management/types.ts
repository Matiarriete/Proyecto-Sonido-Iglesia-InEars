
export enum UserRole {
  INTERPRETE = 'INTERPRETE',
  TECNICO = 'TECNICO',
}

export enum TicketStatus {
  ABIERTO = 'Abierto',
  RESUELTO = 'Resuelto',
  CERRADO = 'Cerrado',
  ASIGNADO = 'Asignado',
}

export interface Instrument {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Ticket {
  id: string;
  performerId: string;
  performerName: string;
  problem: string;
  instrumentId?: string;
  instrumentName?: string;
  status: TicketStatus;
  createdAt: number;
  updatedAt: number;
}

export interface User{
  id: string;
  name:string;
  isActive: boolean;
  instrumentId?: string;
  instrumentName?: string;
  role: UserRole;
}

export interface PredefinedProblem {
  label: string;
  type: 'generic' | 'instrument';
}
