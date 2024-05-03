import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export interface ConsultaRequest {
  idConsulta: any;
  paciente: Paciente;
  medico: Medico;
  dataConsulta: any;
  motivoConsulta?: any;
  valorConsulta:number;
}
