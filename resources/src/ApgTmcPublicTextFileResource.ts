/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */
import { Drash } from "../../deps.ts";

import { ApgTmcStaticResource } from "./ApgTmcStaticResource.ts";

/** Deliver static text files stored in public and test folder */
export class ApgTmcPublicTextFileResource extends ApgTmcStaticResource {

  public paths = [
    "/public/html/.*\.(html)",
    "/public/css/.*\.(css)",
    "/public/js/.*\.(js)"
  ];

  public GET(request: Drash.Request, response: Drash.Response) {

    const extension = request.url.split(".").at(-1);
    let type: string;
    switch (extension) {
      case 'html':
        type = 'text/html'
        break;
      case 'css':
        type = 'text/css'
        break;
      case 'csv':
        type = 'text/csv'
        break;
      case 'dxf':
        type = 'image/vnd.dxf'
        break;
      case 'svg':
        type = 'image/svg+xml'
        break;
      case 'js':
        type = 'application/javascripot'
        break;
      default:
        type = 'text/plain'
    }

    const file = "." + new URL(request.url).pathname;

    const text = <string>this.processSync(file, true);

    response.text(text, 200, { 'Content-Type': type });
  }

}