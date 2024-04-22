export interface Medico {
  idMedico: number | null;
  nome: string;
  email: string;
  senha: string;
  especialidade: string;
  role: number;
  crm:string
  // Campos opcionais
  telefone?: string;
  endereco?: string;
}
