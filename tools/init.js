const child_process = require("child_process");

function exec(command) {
    return new Promise(resolve => {
        return child_process.exec(command, (error, stdout, stderr) => {
            if (error) console.log(error);

            if (stdout) console.log(stdout);

            if (stderr) console.log(stderr);

            return resolve();
        });
    });
}

module.exports = async () => {
    let names = process.argv.slice(2).map(input => input.toLowerCase());
    let is_test = names[0] === "--test";

    if (is_test) names.shift();

    let is_clone = names[0] === "clone";
    if (!is_clone) {
        /**
         * Clone full-template (either from sibling directory, or git repository)
         */
        if (is_test) {
            await exec("xcopy /E /I /Y ..\\full-template full-template");
        } else {
            await exec(
                "git clone --depth=1 https://github.com/lukesrw/full-template.git"
            );
        }
    }

    inits: for (let i = 0; i < names.length; i += 1) {
        switch (names[i]) {
            /**
             * Note: "clone" is purely for the development of Template/Full Template, not end users
             */
            case "clone":
                /**
                 * 1. Delete the template "tools" directory (in case a tool has been removed/renamed)
                 *
                 * Split exec in case it fails (if directory already doesn't exist).
                 */
                await exec("rmdir /S /Q ..\\template\\tools");

                /**
                 * 1. Copy the full-template into a sibling directory called "template"
                 * 2. Change directory into "template"
                 * 3. Delete directories: eslint, git, prettier, scss, ts, vue, electron
                 * 4. Commit changes to repository
                 */
                await exec(
                    'xcopy /E /I /Y . ..\\template && cd ..\\template && rmdir /S /Q blueprints && git add -A && git commit -m "Full Template updates" && git push'
                );

                break inits;

            case "ts":
                /**
                 * 1. Install "typescript" globally
                 * 2. Install "@types/node"
                 * 3. Copy the "ts" directory from full-template into root
                 */
                await exec(
                    "npm i -g typescript && npm i -D @types/node && xcopy /E /I /Y .\\full-template\\blueprints\\ts ts"
                );
                break;

            case "vue":
                /**
                 * 1. Install "@vue/cli-service" globally
                 * 2. Install "vue-template-compiler" globally
                 * 3. Install "vue"
                 * 4. Install "vue-router"
                 * 5. Copy the "vue" directory from full-template into root
                 */
                await exec(
                    "npm i -g @vue/cli-service && npm i -g vue-template-compiler && npm i vue && npm i vue-router && xcopy /E /I /Y .\\full-template\\blueprints\\vue vue"
                );
                break;

            case "scss":
            case "sass":
                /**
                 * 1. Install "sass" globally
                 * 2. Copy the "scss" directory from full-template to root
                 */
                await exec(
                    "npm i -g sass && xcopy /E /I /Y .\\full-template\\blueprints\\scss scss"
                );
                break;

            case "electron":
                /**
                 * 1. Install "electron"
                 * 2. Install "@electron-forge/cli"
                 * 3. Install "electron-settings"
                 * 4. Copy contents of the "electron" directory from full-template into root
                 * 5. Run electron-forge's import command
                 */
                await exec(
                    "npm i -D electron && npm i -D @electron-forge/cli && npm i -D electron-settings && xcopy /E /I /Y .\\full-template\\blueprints\\electron\\* . && npx electron-forge import"
                );
                break;

            case "extensions":
                /**
                 * Copy contents of the "extensions" directory from full-template into root
                 */
                await exec(
                    "xcopy /E /I /Y .\\full-template\\blueprints\\extensions\\* ."
                );
                break;

            default:
                /**
                 * 1. Copy contents of the (input) directory from full-template into root
                 */
                await exec(
                    `xcopy /E /I /Y .\\full-template\\blueprints\\${names[i]}\\* .`
                );
        }
    }

    if (!is_clone) {
        /**
         * Remove the cloned full-template
         */
        await exec("rmdir /S /Q full-template");
    }
};

if (!module.parent) module.exports();
