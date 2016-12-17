const express = require('express')

function makeApp() {
    const app = express()
    app.set('conf', conf)

    conf.env == 'DEV' && app.use('/static/app/', __hotReloaderWrapper__)
    app.use('/static', express.static(__dirname + '/static'))

    !conf.mongo.silent && app.use(__prettyLog__)
    app.get('/', main)
    app.use(errorHandler)

    return app
}

function main(req, res/*, next*/) {
    const html = nunjucks.render('tpl/index.html', {
        DEV: req.app.settings.conf.env == 'DEV',
        rand: Math.random(),
        ver: process.version,
    })

    res.send(html)
}
function loadEnvConf(env) {
    return require('./conf/' + (env || 'dev'))
}

module.exports = makeApp
