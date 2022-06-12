/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */
import { IApgUtilsResultPayload } from '../interfaces/IApgUtilsResultPayload.ts';

/** 
 * Allows to build a Result payload properly 
 */
export class ApgUtilsResultPayload implements IApgUtilsResultPayload {

  signature: string;
  data: unknown;

  constructor(asignature: string, adata: unknown) {
    this.signature = asignature;
    this.data = adata;
  }

}
