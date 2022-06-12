/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.1 [APG 2019/02/21]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */
import { eApgUtilsInternalErrors} from '../enums/eApgUtilsInternalErrors.ts'
import { IApgUtilsCodedError} from './IApgUtilsCodedError.ts';
import { IApgUtilsResultPayload } from './IApgUtilsResultPayload.ts';


/** 
 * Result of the operations for functions and methods. Carries informations about errors or data.
 */
export interface IApgUtilsResult {

  /** Result of the operation*/
  ok: boolean;
  /** Internal error code */
  internalError: eApgUtilsInternalErrors;
  /** Details of the result for errors ready to be logged and that don't need translation*/
  message?: string;
  /** Additional data for successful or error operations  */
  payload?: IApgUtilsResultPayload;
  /** Additional data for multilanguage templateized error operations */
  codedError?: IApgUtilsCodedError;
  /** The result was already logged */
  logged?: boolean;
}
