import * as shell from "shelljs";

const version = require("../dist/manifest.json").version;
const fileName = `merge-button-for-shipjs-${version}`;

shell.mkdir("-p", `packages`);
shell.exec(`zip -9 -r packages/${fileName}.zip dist/*`);
