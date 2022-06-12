/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.1 [APG 2019/03/17]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */
import { eApgUtilsInternalErrors } from '../enums/eApgUtilsInternalErrors.ts';
import { IApgUtilsResultPayload } from './IApgUtilsResultPayload.ts'

/** 
 * Model for Internal events used for logging and profiling operations
 */
export interface IApgUtilsInternalEvent {

  depth: number;
  className: string;
  method: string;
  message: string;
  code: eApgUtilsInternalErrors;
  timeStamp: string;
  hrt: number;
  payload?: IApgUtilsResultPayload;

}

