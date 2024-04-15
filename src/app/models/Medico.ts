export interface Medico {
  idMedico: number | null;
  nome: string;
  email: string;
  senha: string;
  especialidade: string;
  // Campos opcionais
  telefone?: string;
  endereco?: string;
}
