module.exports = {
    'Demo test Google': function(client) {

        console.error(client.page);
        let goog = client.page.google();

        goog
            .navigate()
            .waitForElementVisible('body', 1000)
            .setValue('@search', 'nightwatch')
            .waitForElementVisible('@button', 1000)
            .click('@button')
            .assert.containsText('#main', 'Night Watch');

        client.end();

    }
};
