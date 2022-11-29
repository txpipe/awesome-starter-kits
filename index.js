const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const result = [];

const OUTPUT_DIR = './output';
const KITS_DIR = './kits';

fs.del
fs.readdir(
  path.join(KITS_DIR),
  (err, directories) => {
    directories.forEach((d) => {
        const metadata = yaml.load(fs.readFileSync(`${KITS_DIR}/${d}/metadata.yaml`, 'utf8'));
        try {
          fs.copyFileSync(`${KITS_DIR}/${d}/readme.md`, `${OUTPUT_DIR}/${d}.md`);
        }catch(err) {
          console.log(`error copying readme file: ${err}`);
        }
        
        result.push({key: d, ...metadata});
    });

    if (!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFile(`${OUTPUT_DIR}/starter-kits.json`, JSON.stringify(result), function(err) {
        err ? console.log(err) : 'Process complete';
    });
  }
);

