/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * ------------------------------------------------------------------------
 */

// Types First
export type { TApgUtilsPercentage } from "./src/classes/ApgUtilsTypes.ts";

// Enums Second
export { eApgUtilsCodedErrors } from "./src/enums/eApgUtilsCodedErrors.ts";
export { eApgUtilsInternalErrors } from "./src/enums/eApgUtilsInternalErrors.ts";
export { eApgUtilsManagedLanguages } from "./src/enums/eApgUtilsManagedLanguages.ts";

// Interfaces third
export type { IApgUtilsCodedError }             from "./src/interfaces/IApgUtilsCodedError.ts";
export type { IApgUtilsEnumElement }            from "./src/interfaces/IApgUtilsEnumElement.ts";
export type { IApgUtilsMultilangText }          from "./src/interfaces/IApgUtilsMultilangText.ts";
// export type { IApgUtilsMultilangTextMapItem }   from "./src/interfaces/IApgUtilsMultilangTextMapItem.ts";
export type { IApgUtilsResultPayload }          from "./src/interfaces/IApgUtilsResultPayload.ts";
export type { IApgUtilsResult }                 from "./src/interfaces/IApgUtilsResult.ts";
export type { IApgUtilsSchemaElement }          from "./src/interfaces/IApgUtilsSchemaElement.ts";

// Classes fourth
// Warning the fuck damn order Matters!!!!
export { ApgUtilsResult } from "./src/classes/ApgUtilsResult.ts";
export { ApgUtilsErrorResult } from "../Utils/src/classes/ApgUtilsErrorResult.ts";
export { ApgUtilsResultPayload } from "./src/classes/ApgUtilsResultPayload.ts";
export { ApgUtils } from "./src/classes/ApgUtils.ts";

