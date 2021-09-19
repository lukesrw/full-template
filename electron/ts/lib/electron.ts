import { BrowserWindow, shell } from "electron";
import { getSync as getSetting, set as setSetting } from "electron-settings";
import { BrowserWindowConstructorOptions } from "electron/main";
import { join } from "path";
import { debounce } from "./lib/utils";

const ID_TO_FILE = {
    main: join(__dirname, "..", "..", "public", "index.html")
};

export function createWindow(id: keyof typeof ID_TO_FILE) {
    if (!(id in ID_TO_FILE)) {
        throw new Error("Missing file for Window");
    }

    // retrieve cache
    let cache = (getSetting(`window-${id}`) || {}) as {
        options: BrowserWindowConstructorOptions;
        is_maximized: boolean;
        [key: string]: any;
    };

    // set default/required options
    cache.options = Object.assign(
        {
            width: 800,
            height: 800
        },
        cache.options,
        {
            show: false,
            webPreferences: Object.assign(cache.options.webPreferences, {
                nodeIntegration: true,
                contextIsolation: false,
                nativeWindowOpen: true
            })
        }
    );

    let window = new BrowserWindow(cache.options);

    /* #region position & size saving */
    let saveWindow = debounce(async ({ sender }: { sender: BrowserWindow }) => {
        cache.is_maximized = sender.isMaximized();

        if (!cache.is_maximized) {
            cache.options = Object.assign(cache.options, sender.getBounds());
        }

        await setSetting(`window-${id}`, cache);
    }, 250);

    window.on("resize", saveWindow);
    window.on("move", saveWindow);
    /* #endregion */

    window.webContents.setWindowOpenHandler(({ url }) => {
        let action: "allow" | "deny" = "allow";

        if (url.startsWith("http")) {
            shell.openExternal(url);
            action = "deny";
        }

        return {
            action
        };
    });

    window.webContents.on("did-finish-load", () => {
        window.show();
    });

    // loading page
    if (cache.is_maximized) window.maximize();

    window.loadFile(ID_TO_FILE[id]);
}
