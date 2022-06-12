/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */

import { Drash } from "../deps.ts";

import { ApgTmcPublicBinFileResource} from "./src/ApgTmcPublicBinFileResource.ts";
import { ApgTmcPublicTextFileResource } from "./src/ApgTmcPublicTextFileResource.ts";

import { ApgTmcApiDataResurce } from "./src/ApgTmcApiDataResurce.ts";
import { ApgTmcVueAppResource } from "./src/ApgTmcVueAppResource.ts";


export const resources: typeof Drash.Resource[] = [
    ApgTmcPublicBinFileResource,
    ApgTmcPublicTextFileResource,
    ApgTmcApiDataResurce,
    ApgTmcVueAppResource,
];