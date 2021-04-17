export interface StoredEntity {
  /**
   * The unique id of the entity.
   */
  id: number;

  /**
   * When the entity was initially created/stored in the database.
   */
  created: number;

  /**
   * When the entity was last updated in the database.
   */
  updated: number;
}
