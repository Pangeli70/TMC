/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.1 [APG 2019/02/22]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * -----------------------------------------------------------------------
 */
import { eApgUtilsInternalErrors } from '../enums/eApgUtilsInternalErrors.ts';
import { IApgUtilsResult } from '../interfaces/IApgUtilsResult.ts';
import { ApgUtilsResult } from './ApgUtilsResult.ts';



/** 
 * Helper class for error management in Apg Ecosystem
 */
export class ApgUtilsErrorResult extends ApgUtilsResult {

  static unmanaged(
    amessage: string
  ): IApgUtilsResult {

    const r = new ApgUtilsResult(false);
    r.internalError = eApgUtilsInternalErrors.undefinedError;
    r.message = amessage;
    return r;
  }

  static coded(
    acode: eApgUtilsInternalErrors,
    aerrCode: string,
    aparams?: string[]
  ): IApgUtilsResult {

    const r = new ApgUtilsResult(false);
    r.internalError = acode;
    r.codedError = {
      code: aerrCode
    };
    if (aparams) {
      r.codedError.params = aparams;
    }
    return r;
  }

  static alreadyExists(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.alreadyExist, aerrCode, aparams);
  }


  static notFound(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.notFound, aerrCode, aparams);
  }


  static fsError(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.fsError, aerrCode, aparams);
  }


  static notValidParameters(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.notValidParameters, aerrCode, aparams);
  }


  static notInitialized(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.notInitialized, aerrCode, aparams);
  }

  static notAValidObject(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.notAValidObject, aerrCode, aparams);
  }

  static notAnArray(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.notAnArray, aerrCode, aparams);
  }

  static managed(aerrCode: string, aparams?: string[]): IApgUtilsResult {
    return ApgUtilsErrorResult.coded(eApgUtilsInternalErrors.managedError, aerrCode, aparams);
  }

}


