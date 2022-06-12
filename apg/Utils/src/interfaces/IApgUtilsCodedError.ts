/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.1 [APG 2019/02/21]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */
import { eApgUtilsCodedErrors } from '../enums/eApgUtilsCodedErrors.ts';


/** 
 * Model that carries information about coded errors in ApgUtilsResult 
 */
export interface IApgUtilsCodedError {

  /** Code of the error to be used for code coverage and automated tests.
   * Is used to search into the multilang error message pool*/
  code: eApgUtilsCodedErrors | string;
  /** List of the parameters to be used to fill the placeholders in the coded multilanguage message text */
  params?: string[];
}
