/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */
import { Drash, StdPath } from "../../deps.ts";

import { ApgTmcStaticResource } from "./ApgTmcStaticResource.ts";

/** Resource to deliver static files in binary format, stored in public folder */
export class ApgTmcPublicBinFileResource extends ApgTmcStaticResource {

  public paths = [
    "/public/ico/.*\.(ico)",
    "/public/img/.*\.(gif|jpg|png|svg)",
    "/public/pdf/.*\.(pdf)",
    "/public/aud/.*\.(mp3)"
  ];

  public GET(request: Drash.Request, response: Drash.Response) {

    const path =  new URL(request.url).pathname;

    const maxAge = 6 //* 60 * 60; //6hr
    // response.headers.append("Cache-Control", `private, max-age=${maxAge}, immutable`)
    response.file(`.${path}`);
  }

}