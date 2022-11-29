const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const result = [];

fs.readdir(
  path.join("./", 'kits'),
  (err, directories) => {
    directories.forEach((d) => {
        const metadata = yaml.load(fs.readFileSync(`./kits/${d}/metadata.yaml`, 'utf8'));
        try {
          fs.copyFileSync(`./kits/${d}/readme.md`, `./output/${d}.md`);
        }catch(err) {
          console.log(`error copying readme file: ${err}`);
        }
        
        result.push({key: d, ...metadata});
    });

    fs.writeFile("./output/starter-kits.json", JSON.stringify(result), function(err) {
        err ? console.log(err) : 'Process complete';
    });
  }
);

