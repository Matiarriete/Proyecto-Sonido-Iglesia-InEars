import { PredefinedProblem } from './types';

export const PREDEFINED_PROBLEMS: PredefinedProblem[] = [
    { label: 'Subir volumen', type: 'instrument' },
    { label: 'Bajar volumen', type: 'instrument' },
    { label: 'Más graves', type: 'instrument' },
    { label: 'Más agudos', type: 'instrument' },
    { label: 'Añadir reverb', type: 'instrument' },
    { label: 'Quitar reverb', type: 'instrument' },
    { label: 'No me oigo', type: 'generic' },
    { label: 'Acople (feedback)', type: 'generic' },
    { label: 'Sonido cortado', type: 'generic' },
];