const startTime = performance.now();

import { Drash } from "./deps.ts";
import { resources } from "./resources/mod.ts";
import { services } from "./services/mod.ts";
import { ApgUtils } from "./apg/Utils/mod.ts"


// import { testMongo } from "./apg/TS2/src/ApgTS2DataService.ts"

// await testMongo();


const args = ApgGetDenoArgs();

let port = 4444;
if (args.port && Number.isInteger(parseInt(args.port))) {
  port = parseInt(args.port);
}

ApgUtils.IsProduction(<string>args.isProd);

// Main server configuratioion
const server = new Drash.Server({
  hostname: '0.0.0.0',
  port: port,
  resources: resources,
  services: services,
  protocol: "http"
});

server.run();

StartupResume();


function ApgGetDenoArgs() {
  const args: { [key: string]: string } = {};

  if (Deno.args && Array.isArray(Deno.args)) {
    Deno.args.forEach(element => {

      const argsArray = element.split(" ");

      argsArray.forEach(argument => {

        const frags = argument.split("=");

        if (frags.length == 2) {

          if (frags[0].indexOf("--") == 0) {
            frags[0] = frags[0].substring(2);
          }

          args[frags[0]] = frags[1];

        }
      });
    });
  }
  return args;
}

function StartupResume() {
  console.log(`\n`);

  console.log(ApgUtils.Str_FilledCentered("", 60, "+", "-"));

  const title = "Drash server started";
  console.log(ApgUtils.Str_FilledCentered(title, 60, "|", " "));

  const now = new Date();
  const time = `At: ${now.toISOString()}`;
  console.log(ApgUtils.Str_FilledCentered(time, 60, "|", " "));

  const address = `On: ${server.address}`;
  console.log(ApgUtils.Str_FilledCentered(address, 60, "|", " "));

  const mode = "Mode: " + ((args.mode && args.mode == "debug") ? "debug" : "standard");
  console.log(ApgUtils.Str_FilledCentered(mode, 60, "|", " "));

  const env = "Env: " + ((ApgUtils.IsProduction()) ? "production" : "development");
  console.log(ApgUtils.Str_FilledCentered(env, 60, "|", " "));

  console.log(ApgUtils.Str_FilledCentered("", 60, "+", "-"));

  const endTime = performance.now();
  const warmupTime = Math.round((endTime - startTime) * 100) / 100;
  const warmup = `Total server warmup time: ${warmupTime} ms`;
  console.log(ApgUtils.Str_FilledCentered(warmup, 60, "|", " "));

  console.log(ApgUtils.Str_FilledCentered("", 60, "+", "-"));

  console.log(`\n`);
}
