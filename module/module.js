Hooks.once('init', async function () {
    console.log('%c trazzm-rotd | Initializing homebrew-5e', 'color: #873ABA');
    registerSettings();
    initialize_module();
});

Hooks.once("ready", async () => {
    // Handle showing changelog
    const currentVersion = game.modules.get(Constants.MODULE_ID).version;
    const lastVersion = game.settings.get(Constants.MODULE_ID, Constants.LAST_VERSION);

    if (foundry.utils.isNewerVersion(currentVersion, lastVersion)) {
        const journal = await fromUuid("Compendium.trazzm-rotd.journal-entries.JournalEntry.L9YHsoeODbdhqdKU");
        const page = journal.pages.contents.find(p => p.name === currentVersion);
        if (page) {
            journal.sheet.render(true, {pageId: page.id});
        }
        game.settings.set(Constants.MODULE_ID, Constants.LAST_VERSION, currentVersion)
    }
});


Hooks.once('socketlib.ready', async function() {
    game.trazzm_rotd = game.trazzm_rotd || {};
    game.trazzm_rotd.socket = socketlib.registerModule(Constants.MODULE_ID);
});

/**
 * Creation & delete hooks for persistent effects
 */
function initialize_module() {
    // Object.values(SUB_MODULES).forEach(cl => {
    //     cl.register();
    // });
}

globalThis.TrazzmROTD = {
    macros
}
