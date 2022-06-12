/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */
import { Drash } from "../../deps.ts";
import { StdPath } from "../../deps.ts";
import { ApgTmcStaticResource } from "./ApgTmcStaticResource.ts";


export class ApgTmcVueAppResource extends ApgTmcStaticResource {

    public paths = ["/", "/index", "/home"]


    public GET(request: Drash.Request, response: Drash.Response) {
        const JSON_PATH = 'public/html/';
        try {

            const file = StdPath.resolve(JSON_PATH.concat('VueAppPage.html'));
            console.log(file);
            const html = this.processSync(file, true) as string;

            response.html(html);

        } catch (_error) {

            throw new Drash.Errors.HttpError(
                400,
                `Drash error: ${JSON.stringify(_error)}`,
            );

        }

    }

}
