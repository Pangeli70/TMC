/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */

import { Drash } from "../../../deps.ts";


let requestCounter = 0;
interface IApgMiddlewareData {
    submission: number;
}

export class ApgMiddlewareDataService extends Drash.Service {

    public runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        requestCounter++;
        console.log(
            `Received request #${requestCounter} for resource:\n - ${request.url}`,
        );

        const md = <IApgMiddlewareData>{ submission: performance.now() };

        // inject middleware data into the request
        // deno-lint-ignore no-explicit-any
        (<any>request).ApgMd = md;
    }


    /**
     * Run this service after the resource's HTTP method.
     */
    public runAfterResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {
        // deno-lint-ignore no-explicit-any
        const md: IApgMiddlewareData = (<any>request)!.ApgMd;
        const t2: number = performance.now();
        const elapsed = t2 - md.submission;
        const proctime = `${elapsed.toFixed(4)}ms`;
        console.log(` - Total processing time: ${proctime}`);

    }
}
