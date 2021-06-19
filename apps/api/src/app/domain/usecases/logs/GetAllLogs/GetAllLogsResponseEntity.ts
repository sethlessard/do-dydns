import { LogEntity } from "../../../entities/LogEntity";
import { ResponseEntity } from "../../../entities/ResponseEntity";

export type GetAllLogsResponseEntity = ResponseEntity<LogEntity[]>
