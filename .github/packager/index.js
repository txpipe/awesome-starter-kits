const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const result = [];

const OUTPUT_DIR = '../../output';
const KITS_DIR = '../../kits';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

fs.readdir(
  path.join(KITS_DIR),
  (err, directories) => {
    directories.forEach((d) => {
      const metadata = yaml.load(fs.readFileSync(`${KITS_DIR}/${d}/metadata.yaml`, 'utf8'));

      if (metadata.status === 'disabled') return;
      
      try {
        fs.copyFileSync(`${KITS_DIR}/${d}/readme.md`, `${OUTPUT_DIR}/${d}.md`);
      } catch (err) {
        console.log(`error copying readme file: ${err}`);
      }

      // If the kit is a worker, copy the worker.wasm file to the output directory with the kit name
      if (metadata.type === 'worker') {
        try {
          fs.copyFileSync(`${KITS_DIR}/${d}/worker.wasm`, `${OUTPUT_DIR}/${d}.wasm`);
        } catch (err) {
          console.log(`error copying worker file: ${err}`);
        }
      }

      result.push({ key: d, ...metadata });
    });

    fs.writeFile(`${OUTPUT_DIR}/starter-kits.json`, JSON.stringify(result), function (err) {
      err ? console.log(err) : 'Process complete';
    });
  }
);

