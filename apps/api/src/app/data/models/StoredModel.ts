import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StoredModel {

  /**
   * The ID of the model.
   */
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * When the model was stored in the repository.
   */
  @Column({ nullable: false, default: () => new Date() })
  created: Date;

  /**
   * When the model was last updated in the repository.
   */
  @Column({ nullable: false, default: () => new Date() })
  updated: Date;
}
