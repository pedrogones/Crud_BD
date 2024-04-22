export interface AuthUser{

  id: number;
  nome:string;
  role: number;
  chavePrimaria?:string;
  email?:string;
  senha?:string;
  especialidade?: string;
  telefone?:string;
}
