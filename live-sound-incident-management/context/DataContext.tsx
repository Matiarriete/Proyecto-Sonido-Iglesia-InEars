import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Ticket, Instrument, TicketStatus, User, UserRole } from '../types';

const BASE_URL = 'http://127.0.0.1:8000';
const API_URLS = {
  instruments: `${BASE_URL}/instruments/`,
  tickets: `${BASE_URL}/tickets/`,
  users: `${BASE_URL}/users/`,
};

interface DataContextType {
  tickets: Ticket[];
  instruments: Instrument[];
  users: User[];
  isLoading: boolean;
  createTicket: (performer: User, problem: string, instrument?: Instrument) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  addInstrument: (name: string) => void;
  updateInstrument: (id: string, name: string, isActive: boolean) => void;
}


const defaultContextValue: DataContextType = {
  tickets: [],
  instruments: [],
  users: [],
  isLoading: true,
  createTicket: () => { },
  updateTicketStatus: () => { },
  addInstrument: () => { },
  updateInstrument: () => { },
};

export const DataContext = createContext<DataContextType>(defaultContextValue);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchInstruments = async () => {
      try {
        const instResponse = await fetch(API_URLS.instruments);

        if (!instResponse.ok) {
          throw new Error(`Error HTTP: ${instResponse.status}`);
        }

        const result = await instResponse.json();

        const instrumentsFromApi: Instrument[] = Array.isArray(result.data) ? result.data : [];

        setInstruments(instrumentsFromApi);

      } catch (error) {
        console.error("Error al cargar instrumentos desde la API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTickets = async () => {
      try {
        const ticketResponse = await fetch(API_URLS.tickets);

        if (!ticketResponse.ok) {
          throw new Error(`Error HTTP: ${ticketResponse.status}`);
        }

        const result = await ticketResponse.json();

        const ticketsFromApi: Ticket[] = Array.isArray(result.data) ? result.data : [];

        setTickets(ticketsFromApi);

      } catch (error) {
        console.error("Error al cargar tickets desde la API:", error);
      } finally {
        setIsLoading(false);
      }
    };

const fetchUsers = async () => {
      try {
        const userResponse = await fetch(API_URLS.users);

        if (!userResponse.ok) {
          throw new Error(`Error HTTP: ${userResponse.status}`);
        }

        const result = await userResponse.json();

        const usersFromApi: User[] = Array.isArray(result.data) ? result.data : [];

        setUsers(usersFromApi);

      } catch (error) {
        console.error("Error al cargar usuarios desde la API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstruments();
    fetchTickets();
    fetchUsers();
  }, []);

  const createTicket = async (performer: User, problem: string, instrument?: Instrument) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      performerId: performer.id,
      performerName: performer.name,
      problem: problem,
      instrumentId: instrument?.id,
      instrumentName: instrument?.name,
      status: TicketStatus.ABIERTO,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const response = await fetch(API_URLS.tickets, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    });
    if (!response.ok) {
      throw new Error('Error al crear el issue: ' + response.status);
    } else {
      console.log('Ticket creado en la API con éxito');
    }

    setTickets(prevTickets => [newTicket, ...prevTickets]);
  };

  const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {

    const ticketToUpdate = tickets.find(t => t.id === ticketId);
    ticketToUpdate.status = status;
    ticketToUpdate.updatedAt = Date.now();

    const response = await fetch(`${API_URLS.tickets}${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketToUpdate),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del ticket: ' + response.status);
    } else {
      console.log('Estado del ticket actualizado en la API con éxito');
    }

    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId ? ticketToUpdate : ticket
      )
    );
  };

  const updateTicketAssignedTo = async (ticketId: string, assignedTo: String) => {

    const ticketToUpdate = tickets.find(t => t.id === ticketId);
    ticketToUpdate.assignedTo = assignedTo;
    ticketToUpdate.updatedAt = Date.now();

    const response = await fetch(`${API_URLS.tickets}${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketToUpdate),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del ticket: ' + response.status);
    } else {
      console.log('Estado del ticket actualizado en la API con éxito');
    }

    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId ? ticketToUpdate : ticket
      )
    );
  };

  const addInstrument = async (name: string) => {
    const newInstrument: Instrument = {
      id: `inst-${Date.now()}`,
      name,
      isActive: true,
    };

    const response = await fetch(`${API_URLS.instruments}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInstrument),
    });
    if (!response.ok) {
      throw new Error('Error al crear el instrumento: ' + response.status);
    } else {
      console.log('Instrumento creado en la API con éxito');
    }

    setInstruments(prev => [...prev, newInstrument]);
  };

  const updateInstrument = async (id: string, name: string, isActive: boolean) => {

    const instrumentToUpdate = instruments.find(i => i.id === id);
    instrumentToUpdate.name = name;
    instrumentToUpdate.isActive = isActive;
    instrumentToUpdate.updatedAt = Date.now();

    const response = await fetch(`${API_URLS.instruments}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instrumentToUpdate),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el instrumento: ' + response.status);
    } else {
      console.log('Instrumento actualizado en la API con éxito');
    }

    setInstruments(prev =>
      prev.map(inst => (inst.id === id ? { ...inst, name, isActive } : inst))
    );
  };

  const addUser = async (name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      isActive: true,
      role: UserRole.INTERPRETE,
    };

    const response = await fetch(`${API_URLS.users}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error('Error al crear el usuario: ' + response.status);
    } else {
      console.log('Usuario creado en la API con éxito');
    }

    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = async (id: string, name: string, isActive: boolean, role: UserRole, instrumentId: String, instrumentName: String) => {

    const userToUpdate = users.find(i => i.id === id);
    userToUpdate.name = name;
    userToUpdate.isActive = isActive;
    userToUpdate.role = role;
    userToUpdate.instrumentId = instrumentId;
    userToUpdate.instrumentName = instrumentName;

    const response = await fetch(`${API_URLS.users}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToUpdate),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el usuario: ' + response.status);
    } else {
      console.log('Usuario actualizado en la API con éxito');
    }

    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, name, isActive } : user))
    );
  };

  return (
    <DataContext.Provider value={{ users, tickets, instruments, isLoading, createTicket, updateTicketStatus,updateTicketAssignedTo, addInstrument, updateInstrument, addUser, updateUser }}>
      {children}
    </DataContext.Provider>
  );
};