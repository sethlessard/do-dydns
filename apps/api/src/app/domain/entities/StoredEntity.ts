export interface StoredEntity {

  /**
   * The unique id of the entity.
   */
  id: string;

  /**
   * When the entity was initially created/stored in the database.
   */
  created: Date;

  /**
   * When the entity was last updated in the database.
   */
  updated: Date;
}
