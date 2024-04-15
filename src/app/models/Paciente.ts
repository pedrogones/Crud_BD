export interface Paciente {
  idPaciente: number | null;
  nome: string;
  cpf: string;
  // Campos opcionais
  email?: string;
  telefone?: string;
  grupoSanguineo?: string;
  alergias?: string;
  dataNascimento?: Date;
}
