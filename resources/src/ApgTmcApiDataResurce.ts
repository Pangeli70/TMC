/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */
import { Drash, StdPath } from "../../deps.ts";

import { ApgUtils } from "../../apg/Utils/mod.ts";


export class ApgTmcApiDataResurce extends Drash.Resource {

    public paths = ["/api/data"]


    public GET(request: Drash.Request, response: Drash.Response) {
            const JSON_PATH = 'data/';
        try {
            const data: any = {};

            let jsonFile = StdPath.resolve(JSON_PATH.concat('games.json'));
            let json = ApgUtils.Fs_ReadTextFileSync(jsonFile);
            data.games = JSON.parse(json);

            jsonFile = StdPath.resolve(JSON_PATH.concat('locations.json'));
            json = ApgUtils.Fs_ReadTextFileSync(jsonFile);
            data.locations = JSON.parse(json);

            jsonFile = StdPath.resolve(JSON_PATH.concat('parties.json'));
            json = ApgUtils.Fs_ReadTextFileSync(jsonFile);
            data.parties = JSON.parse(json);

            jsonFile = StdPath.resolve(JSON_PATH.concat('users.json'));
            json = ApgUtils.Fs_ReadTextFileSync(jsonFile);
            data.users = JSON.parse(json);

            response.json(data);

        } catch (_error) {

            console.dir(_error);
            throw new Drash.Errors.HttpError(
                400,
                `Drash error: ${JSON.stringify(_error)}`,
            );

        }

    }

}
