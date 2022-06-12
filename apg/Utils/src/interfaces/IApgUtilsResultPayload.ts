/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */

/** 
 * Payload useful to carry additional data with the result
 */
export interface IApgUtilsResultPayload {
  /** Is the name of the Data type carried by the payload */
  readonly signature: string;
  /** Data carried by the payload */
  readonly data: unknown;
}
