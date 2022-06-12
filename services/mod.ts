/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */

import { Drash, DrashCorsService } from "../deps.ts";

import { ApgMiddlewareDataService } from "./src/classes/ApgMiddlewareDataService.ts";

export const services: Drash.Service[] = [
    new DrashCorsService(),
    new ApgMiddlewareDataService()
];