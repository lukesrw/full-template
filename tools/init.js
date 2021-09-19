const child_process = require("child_process");

function exec(command) {
    return new Promise(resolve => {
        return child_process.exec(command, resolve);
    });
}

module.exports = async () => {
    let names = process.argv.map(input => input.toLowerCase());
    let is_test = names[2] === "--test";

    if (is_test) {
        await exec("xcopy /E /I /Y ..\\full-template full-template");

        names.shift();
    } else {
        await exec(
            "git clone --depth=1 https://github.com/lukesrw/full-template.git"
        );
    }

    names.forEach(async name => {
        switch (name) {
            case "clone":
                await exec(
                    'xcopy /E /I /Y . ..\\template && cd ..\\template && rmdir /S /Q eslint git prettier scss ts vue electron && git add -A && git commit -m "Full Template updates" && git push'
                );
                break;

            case "ts":
                await exec(
                    "npm i -g typescript && npm i -D @types/node && move full-template\\ts ts"
                );
                break;

            case "vue":
                await exec(
                    "npm i -g @vue/cli-service && npm i -g vue-template-compiler && npm i vue && npm i vue-router && move full-template\\vue vue"
                );
                break;

            case "scss":
            case "sass":
                await exec("npm i -g sass && move full-template\\scss scss");
                break;

            case "electron":
                await exec(
                    "npm i -D electron && npm i -D @electron-forge/cli && npm i -D electron-settings && move full-template\\electron . && npx electron-forge import"
                );

            default:
                await exec(`move full-template\\${name}\\* .`);
        }
    });

    await exec("rmdir /S /Q full-template");
};

if (!module.parent) module.exports();
