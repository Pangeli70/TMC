/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.6.0 [APG 2019/07/28]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
*/
import { IApgUtilsMultilangText } from './IApgUtilsMultilangText.ts';


/** 
 * Model for Multilanguage text Map Item
 */
export interface IApgUtilsMultilangTextMapItem {
  key: string;
  value: IApgUtilsMultilangText;
}
