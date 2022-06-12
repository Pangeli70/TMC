/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.1 [APG 2019/02/23]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */
import { eApgUtilsInternalErrors } from '../enums/eApgUtilsInternalErrors.ts';
import { IApgUtilsCodedError } from '../interfaces/IApgUtilsCodedError.ts';
import { IApgUtilsResult } from '../interfaces/IApgUtilsResult.ts';
import { IApgUtilsResultPayload } from '../interfaces/IApgUtilsResultPayload.ts';



/** 
 * Internal operations result for the Apg Ecosystem, carries informations about errors and data
 */
export class ApgUtilsResult implements IApgUtilsResult {

  ok: boolean;
  internalError = eApgUtilsInternalErrors.noError;
  message?: string;
  payload?: IApgUtilsResultPayload;
  codedError?: IApgUtilsCodedError;
  logged?: boolean;

  constructor(aok: boolean = true) {
    this.ok = aok;
    this.logged = false;
  }

  static extractPayload(asignature: string, ar: IApgUtilsResult): any {

    if (!ar.payload) {
      throw new Error(`Payload is missing. Impossible to extract data from result`);
    }
    else {
      if (!ar.payload.signature) {
        throw new Error(`Payload signature is missing. Impossible to check and extract data from result`);
      }
      else {
        if (ar.payload.signature !== asignature) {
          throw new Error(
            `Payload has wrong signature: ` +
            `expected[${asignature}], got[${ar.payload.signature}].` +
            `Impossible to extract data from result.`
          );
        }
        else {
          return ar.payload.data;
        }
      }
    }


  }
}


