import { Column, Entity } from "typeorm";
import { StoredModel } from "./StoredModel";

@Entity()
export class IPAddressModel extends StoredModel {

  /**
   * The IP Address.
   */
  @Column()
  ipAddress: string;
}
