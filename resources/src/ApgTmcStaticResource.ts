/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */
import { Drash } from "../../deps.ts";

import { ApgUtils } from "../../apg/Utils/mod.ts";

interface IApgEdsStaticResourceCacheableItem {
  count: number;
  content: string | Uint8Array;
  lastRequest: number;
}

const CACHE_EXPIRATION = 1000;

const staticResouceCache: { [key: string]: IApgEdsStaticResourceCacheableItem } = {};

/**
 * Process static files syncronously using an in memory cache to speed up the process
 */
export abstract class ApgTmcStaticResource extends Drash.Resource {

  protected processSync(aresourceFile: string, aisText: boolean): string | Uint8Array {

    let staticContent: string | Uint8Array;

    if (staticResouceCache[aresourceFile] == undefined) {
      if (aisText) {
        staticContent = ApgUtils.Fs_ReadTextFileSync(aresourceFile);
      }
      else {
        staticContent = ApgUtils.FS_ReadBinFileSync(aresourceFile);
      }

      const staticCacheableItem: IApgEdsStaticResourceCacheableItem = {
        count: 1,
        content: staticContent,
        lastRequest: performance.now()
      }
      staticResouceCache[aresourceFile] = staticCacheableItem;
    }
    else {

      const staticCacheableItem: IApgEdsStaticResourceCacheableItem = staticResouceCache[aresourceFile];
      const currentTime = performance.now();
      const deltaTime = currentTime - staticCacheableItem.lastRequest;

      if (deltaTime > CACHE_EXPIRATION) {
        if (aisText) {
          staticCacheableItem.content = ApgUtils.Fs_ReadTextFileSync(aresourceFile);
        }
        else {
          staticCacheableItem.content = ApgUtils.FS_ReadBinFileSync(aresourceFile);
        }
      }

      staticCacheableItem.count++;
      staticCacheableItem.lastRequest = currentTime;
      staticContent = staticCacheableItem.content;

    }

    return staticContent;
  }

}
