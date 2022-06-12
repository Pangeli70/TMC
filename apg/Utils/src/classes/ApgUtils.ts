// deno-lint-ignore-file no-explicit-any
/** -----------------------------------------------------------------------
 * @module [Utils]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * @version 0.8.0 [APG 2022/05/01] Refactoring names
 * -----------------------------------------------------------------------
 */

import { StdPath } from "../../../../deps.ts";

import { IApgUtilsResult } from '../interfaces/IApgUtilsResult.ts';


/** 
 * Static general purpose utility functions
 */
export class ApgUtils {

  private static _isProduction = false;

  static Math_isNumber(an: any): boolean {

    return (!isNaN(parseFloat(an)) && isFinite(an));

  }


  static Math_IsInteger(an: any): boolean {

    let r = this.Math_isNumber(an);

    if (r) {
      const n = parseFloat(an);
      if (!Number.isInteger(n)) {
        r = false;
      }
    }

    return r;
  }


  static Math_SafeInteger(atext: string | undefined): number | undefined {
    if (atext && this.Math_IsInteger(atext)) {
      return parseInt(atext, 10);
    }
    else {
      return undefined;
    }
  }


  static Math_RoundToSignificant(an: number, adigits = 5): number {
    const EPSILON = 0.00001;
    const exponentialNotation = an.toExponential(adigits - 1);
    // const fragments = exponentialNotation.split("e");
    // const n = parseFloat(fragments[0]);
    // const e = parseInt(fragments[1]);
    // if (e < 0){
    //   let g =4;
    //   g++;
    // }
    // const a = Math.abs(e);
    // const t = Math.round(n * (10 ** adigits))
    // const d = adigits - a;
    // const r = t / (10 ** d);
    let r = parseFloat(exponentialNotation);
    const abs = Math.abs(r);
    if (abs < EPSILON) r = 0;
    return r;
  }


  /**
   * @param   type  The type of adjustment (round, floor, ceil).
   * @param   avalue The number.
   * @param   aexp   The exponent (the 10 logarithm of the adjustment base).
   * @returns       The adjusted value.
   */
  private static _decimalAdjust(atype: string, avalue: number, aexp?: number) {

    // Typescript hack
    const fun =
      (atype === "round") ? "round" :
        (atype === "floor") ? "floor" :
          (atype === "ceil") ? "ceil" : undefined;

    if (!fun || isNaN(avalue)) {
      return NaN;
    }

    // If the exp is undefined or zero...
    if (!aexp || +aexp === 0) {
      return Math[fun](avalue);
    }

    aexp = +aexp;
    // If the value is not a number or the exp is not an integer...
    if (!(typeof aexp === 'number' && aexp % 1 === 0)) {
      return NaN;
    }
    // Shift
    let values = avalue.toString().split('e');
    avalue = Math[fun](+(values[0] + 'e' + (values[1] ? (+values[1] - aexp) : -aexp)));
    // Shift back
    values = avalue.toString().split('e');
    return +(values[0] + 'e' + (values[1] ? (+values[1] + aexp) : aexp));
  }


  static Math_Round(value: number, exp: number) {
    return ApgUtils._decimalAdjust('round', value, exp);
  }


  static Math_Floor(value: number, exp: number) {
    return ApgUtils._decimalAdjust('floor', value, exp);
  }


  static Math_Ceil(value: number, exp: number) {
    return ApgUtils._decimalAdjust('ceil', value, exp);
  }


  static Str_IsNumeric(an: string) {
    const isNumber: boolean = /^-?[\d.]+(?:e-?\d+)?$/.test(an);
    if (!isNumber) {
      return false;
    } else {
      return this.Math_isNumber(an);
    }
  }


  static Str_Capitalize(astring: string) {
    // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
    if (typeof astring !== 'string') { return ''; }
    return astring.charAt(0).toUpperCase() + astring.slice(1).toLowerCase();
  }


  static Str_RandomNumbersAndLetters(alength: number): string {

    let r = '';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    for (let i = 0; i < alength; i++) {
      const n = Math.floor(Math.random() * chars.length);
      r += chars.charAt(n);
    }
    return r;
  }


  static Str_RandomWithSymbols(alength: number): string {

    let r = '';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-=*+[]{}()<>?!%$£§|';
    for (let i = 0; i < alength; i++) {
      const n = Math.floor(Math.random() * chars.length);
      r += chars.charAt(n);
    }
    return r;
  }


  static Str_FilledCentered(avalue: string, awidth: number, aborder: string, afiller: string) {
    const borderW = aborder.length;
    if (afiller.length > 1)
      afiller = afiller[0];
    const valueW = avalue.length;
    const tobeFilledW = awidth - valueW - (borderW * 2);
    const leftPadN = Math.trunc(tobeFilledW / 2);
    // const righPadN = leftPadN + (tobeFilledW % 2);
    const central = avalue
      .padStart(leftPadN + valueW, afiller)
      .padEnd(awidth - (2 * borderW), afiller);
    const r = aborder + central + aborder;

    return r
  }

  /**
   * @return {RegExp} Regular Expression per il pattern passato
   * @param {string} afilter Pattern per il filtro es. 'start*', '*something', 'test*test', 'a*@*.com'
   */
  static BuildRegExpFilter(afilter: string): RegExp {

    let r: RegExp;

    const starPositions: number[] = [];
    let ok = true;
    let lstarPosition = 0;
    while (ok) {
      lstarPosition = afilter.indexOf('*', lstarPosition);
      if (lstarPosition === -1) {
        ok = false;
      }
      else {
        starPositions.push(lstarPosition);
        lstarPosition++;
      }
    }

    // No *
    if (starPositions.length === 0) {
      r = new RegExp('.*' + afilter + '.*');
    }
    // Two or more *
    else if (starPositions.length > 1) {
      const filterParts: string[] = afilter.split('*');
      const l = filterParts.length;
      let pattern = '';

      for (let i = 0; i < l; i++) {
        if (i === 0) {
          if (filterParts[i] !== '') {
            pattern += '^';
          }
        }
        pattern += filterParts[i];
        if (i === l - 1) {
          if (filterParts[i] !== '') {
            pattern += '$';
          }
          else {
            pattern += '';
          }
        }
        else {
          pattern += '.*';
        }
      }

      r = new RegExp(pattern);
    }
    // Only one *
    else {

      let pattern = '';
      if (starPositions[0] === 0) {
        pattern = '.*' + afilter.replace('*', '') + '$';
      }
      else if (starPositions[0] === afilter.length) {
        pattern = '^' + afilter.replace('*', '') + '.*';
      }
      else {
        const filterParts: string[] = afilter.split('*');
        pattern = '^' + filterParts[0] + '.*' + filterParts[1] + '$';
      }
      r = new RegExp(pattern);
    }
    return r;
  }


  static Obj_TypeOf(aunknown: unknown): string {
    if (aunknown === undefined) {
      return 'undefined';
    }
    if (aunknown === null) {
      return 'null';
    }
    if (Array.isArray(aunknown)) {
      return 'array';
    }
    return typeof aunknown;
  }


  static Obj_DeepCopy(aobj: any): any {
    return JSON.parse(JSON.stringify(aobj));
  }


  static Obj_DeepCopyTo(asrc: any, adest: any): void {
    const temp = JSON.parse(JSON.stringify(asrc));
    Object.keys(temp).forEach(k => {
      adest[k] = temp[k];
    });
  }


  static Obj_DeepCompare(a: any, b: any): boolean {
    let r = true;
    const aa = Array.isArray(a);
    // if first is array
    if (aa) {
      // if both are arrays
      if (aa !== Array.isArray(b)) {
        return false;
      }
      else {
        r = (a.length !== b.length);
        // if have the same number of keys
        if (r) {
          for (let i = 0; i < a.length; i++) {
            const typeOfA = ApgUtils.Obj_TypeOf(a[i]);
            const typeOfB = ApgUtils.Obj_TypeOf(b[i]);
            // if type of each item match
            if (typeOfA !== typeOfB) {
              r = false;
              break;
            }
            else {
              // recurse
              if (typeOfA === 'object' || typeOfA === 'array') {
                r = ApgUtils.Obj_DeepCompare(a[i], b[i]);
              }
              else {
                r = a[i] === b[i];
                // if content of each item match
                if (!r) {
                  break;
                }
              }
            }
          }
        }
      }
    }
    else {
      const typeOfA = this.Obj_TypeOf(a);
      r = typeOfA === 'object';
      // if first is object
      if (r) {
        r = typeOfA === this.Obj_TypeOf(b);
        // if both are object
        if (r) {
          const keysOfA = Object.keys(a);
          const keysOfB = Object.keys(b);
          r = (keysOfA.length !== keysOfB.length);
          // if have the same number of keys
          if (r) {
            for (let i = 0; i < keysOfA.length; i++) {
              // if all the keys match
              if (!b[keysOfA[i]]) {
                r = false;
                break;
              }
              else {
                const typeOfA = ApgUtils.Obj_TypeOf(a[keysOfA[i]]);
                const typeOfB = ApgUtils.Obj_TypeOf(b[keysOfA[i]]);
                // if type of each item match
                if (typeOfA !== typeOfB) {
                  r = false;
                  break;
                }
                else {
                  // recurse
                  if (typeOfA === 'object' || typeOfA === 'array') {
                    r = ApgUtils.Obj_DeepCompare(a[keysOfA[i]], b[keysOfA[i]]);
                  }
                  else {
                    r = a[keysOfA[i]] === b[keysOfA[i]];
                    // if content of each item match
                    if (!r) {
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return r;
  }


  static Urlify(apath: string) {
    let r = apath;
    let i = 0;
    const l = r.length;
    do {
      i = r.indexOf('=');
      if (i !== -1) {
        let b = true;
        let j = i;
        do {
          j++;
          if (r[j] === '&' || j === l) {
            r = r.substr(0, i) + r.substr(j, l);
            b = false;
          }
        } while (b);
      }
    } while (i !== -1);
    r = r
      .replace(/[\/?&]/g, '_')
      .replace(/[:=]/g, '');
    return r;
  }


  static FS_FolderExistsSync(apath: string): boolean {
    let r = false;
    try {
      const fileInfo = Deno.statSync(apath);
      r = fileInfo.isDirectory;
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        // file or directory does not exist
        r = false;
      } else {
        // unexpected error, maybe permissions, pass it along
        throw error;
      }
    }
    return r;
  }


  static FS_FolderOfFileExistsSync(afile: string): boolean {
    let r = false;
    const path = StdPath.dirname(afile);
    try {
      const fileInfo = Deno.statSync(path);
      r = fileInfo.isDirectory;
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        // directory does not exist
        r = false;
      } else {
        // unexpected error, maybe permissions, pass it along
        throw error;
      }
    }
    return r;
  }


  static FS_IsFolderSync(apath: string): boolean {

    if (apath.indexOf(".") > 0) return false; // it was a path for a file maybe

    const r = this.FS_FolderExistsSync(apath);

    return r;

  }


  static FS_GetSubFoldersSortedSync(apath: string): string[] {

    const entries: string[] = [];

    if (!this.FS_IsFolderSync(apath)) {
      return entries;
    }

    for (const entry of Deno.readDirSync(apath)) {
      if (entry.isDirectory) {
        entries.push("/" + entry.name);
      }
    }
    const sortedEntries = entries.sort((a: string, b: string) =>
      a < b ? -1 : a === b ? 0 : 1);

    return sortedEntries;

  }


  static Fs_GetFileNamesSortedSync(apath: string, aext = '*'): string[] {
    const entries: string[] = [];

    if (!this.FS_IsFolderSync(apath)) {
      return entries;
    }

    for (const entry of Deno.readDirSync(apath)) {
      if (entry.isFile) {
        entries.push(entry.name);
      }
    }

    const filteredEntries = (aext === "*") ?
      entries :
      entries.filter((a: string) => StdPath.extname(a) === aext)


    const sortedEntries = filteredEntries
      .sort((a: string, b: string) =>
        a < b ? -1 : a === b ? 0 : 1);

    return sortedEntries;

  }


  /** @remark This cannot run in production */
  static Fs_ClearFolderSync(apath: string, aext = '*'): { a: string[], b: boolean, m: string } {
    const files = this.Fs_GetFileNamesSortedSync(apath, aext);
    const deletedFiles: string[] = [];
    let ok = true;
    let message = "Ok";
    files.forEach(fileName => {
      try {
        const file = apath + fileName;
        Deno.removeSync(file); // todo test this
        deletedFiles.push(file);
      }
      catch (error) {
        ok = false;
        message = error.message;
        console.log(error);
      }
    });
    return { a: deletedFiles, b: ok, m: message };
  }


  static Fs_FileExistsSync(afile: string) {

    try {
      const stat = Deno.statSync(afile);
      if (stat.isFile) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error && (
        (error.kind === Deno.errors.NotFound) ||
        (error.code === 'ENOENT')
      )) {
        return false;
      } else {
        // unexpected error, maybe permissions, pass it along
        throw error;
      }
    }
  }


  /**
   * @param afile complete file path with extension
   * @returns Decoded UTF-8 File Content
   * @warnings Can throw exception if file is not found
   */
  static Fs_ReadTextFileSync(afile: string): string {
    const decoder = new TextDecoder("utf-8");
    // @todo this can fail badly throwing 
    const fileContent = Deno.readFileSync(afile);
    const r = decoder.decode(fileContent);
    return r;
  }


  /**
   * @param afile complete file path with extension
   * @returns File Content
   * @warnings Can throw exception if file is not found
   */
  static FS_ReadBinFileSync(afile: string) {

    // @todo this can fail badly throwing 
    const r = Deno.readFileSync(afile);

    return r;
  }


  static Map_Stringify(_key: string, apotentialMap: unknown) {
    if (apotentialMap instanceof Map) {

      let newValue: any;
      const mapEntries = apotentialMap.entries();
      const arrayOfEntries = Array.from(mapEntries);
      const res = arrayOfEntries.map((keyValuePairAsArray) => {

        const res: any = {
          [keyValuePairAsArray[0]]: keyValuePairAsArray[1],
        };
        newValue = {
          ...newValue,
          ...res,
        };
        return newValue;
      });
      return res[res.length - 1];
      /* return {
              dataType: 'Map',
              apotentialMap: Array.from(apotentialMap.entries()), // or with spread: apotentialMap: [...apotentialMap]
            }; */
    } else {
      return apotentialMap;
    }
  }


  static Map_ToArray(amap: Map<string, any>) {
    const r: any = [];
    amap.forEach((v, key) => {
      const item = { ...v };
      item.name = key;
      r.push(item);
    });
    return r;
  }


  static Map_ToObject(amap: Map<string, any>) {
    const r: any = {};
    amap.forEach((v, key) => {
      r[key] = v;
    });
    return r;
  }


  static Enum_StringContains(aenum: any, avalue: string): boolean {
    return ((<any>Object).values(aenum).includes(avalue));
  }


  static Enum_NumericContains(aenum: any, avalue: number): boolean {
    return ((<any>Object).values(aenum).includes(avalue));
  }


  static YeMoDaHoSe_FromDateTime(adate: Date) {
    return adate.getFullYear() + '-' +
      (adate.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
      adate.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
      adate.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
      adate.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
      adate.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });
  }


  static YeMoDaHoSe_ToDateTime(aYeMoDaHoSeDate: string) {
    const splits = aYeMoDaHoSeDate.split('-');
    const str = `${splits[0]}-${splits[1]}-${splits[2]}T${splits[3]}:${splits[4]}:${splits[5]}`;
    return new Date(str);
  }


  static MetaUrl_SourcePath(aimportMetaUrl: string) {

    const url = new URL('', aimportMetaUrl);
    const file = url.pathname;
    const index = file.lastIndexOf("/");

    return file.substring(1, index);

  }


  static MetaUrl_ClassName(aimportMetaUrl: string) {

    const url = new URL('', aimportMetaUrl);
    const file = url.pathname;
    const index = file.lastIndexOf("/");

    return file.substring(index + 1, file.length - 3);

  }


  static IsDigitChar(acharCode: number): boolean {
    return (acharCode >= "0".charCodeAt(0) && acharCode <= "9".charCodeAt(0));
  }


  static IsTrueish(avalue?: string) {

    if (!avalue) return false;
    const value = avalue.trim().toLowerCase();

    switch (value) {
      case "true":
      case "1":
      case "on":
      case "yes":
        return true;
      default:
        return false;
    }
  }


  static IsProduction(aisProd?: string) {

    if (aisProd != undefined) {
      this._isProduction = this.IsTrueish(aisProd);
    }

    return this._isProduction;
  }


  static AssertExit(aresult: IApgUtilsResult | string) {

    const mesg = '\n\n***********\nASSERTED ERROR:\n';
    console.error(mesg);

    if (typeof (aresult) === 'string') {
      console.log(aresult);
    }
    else {
      console.dir(aresult);
    }

    // Deno.exit(1);
  }


}
