/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/01]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */

/** 
 * Model used to transfer via API the JSON schema for the client side validation
 */
export interface IApgUtilsSchemaElement {
  properties: unknown;
  required: string[];
}
