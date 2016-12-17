const slicedCallArgs = 2
const argv = require('minimist')(process.argv.slice(slicedCallArgs))
const express = require('express')

const defaultPort = 8080
const
    ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || argv.p || defaultPort

function makeApp() {
    const app = express()
    app.use('/static', express.static(__dirname + '/static'))
    app.get('/', function main(req, res) {
        res.send(`
            <script src="/static/jspm_packages/system.js"></script>
            <script src="/static/config.js"></script>
            <script>
            System.import('/static/test')
            </script>
        `);
    })
    return app
}

const app = makeApp()
app.listen(port, ip, () => console.log('Starting app on', ip + ':' + port))
