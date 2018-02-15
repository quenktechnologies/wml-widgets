#!/usr/bin/env node

const Promise = require('bluebird');
const cp = require('child_process');
const fs = require('fs');
const docopt = require('docopt').docopt;

const DRIVER_PID_FILE = `${process.cwd()}/driver.pid`;
const CHROME_DRIVER = `${__dirname}/chromedriver`;
const HTTP_PID_FILE = `${process.cwd()}/http.pid`;
const HTTP_DIR = `${process.cwd()}/example/public`;
const HTTPD = `${process.cwd()}/node_modules/.bin/http-server`;

const readFile = path => Promise.fromCallback(cb => fs.readFile(path, cb));
const fileExists = path => readFile(path).then(() => true).catch(() => false);
const writeFile = (path, contents) => Promise.fromCallback(cb => fs.writeFile(path, contents, cb));
const readdir = path => Promise.fromCallback(cb => fs.readdir(path, cb));
const removeFile = path => Promise.fromCallback(cb => fs.unlink(path, cb));
const kill = pid => Promise.try(() => process.kill(pid, 'SIGTERM'));

const pidExists = pid =>
    Promise
    .try(() => process.kill(pid, 0))
    .then(() => true)
    .catch(() => false);

const params = docopt(`
driver.

Usage:
    driver start
    driver stop

`);

if (params.start === true) {

    fileExists(DRIVER_PID_FILE)
        .then(result => result ?
            console.error('Drover already running!') :
            Promise
            .try(() => cp.spawn(CHROME_DRIVER, ['--port 9515'], { detached: true }))
            .then(proc => {
                proc.unref();
                return writeFile(DRIVER_PID_FILE, proc.pid);
            }))
        .then(() => fileExists(HTTP_PID_FILE))
        .then(result => result ?
            console.error('http-server is already up!') :
            Promise
            .try(() => cp.spawn(HTTPD, [], {cwd:HTTP_DIR, detached: true }))
            .then(proc => {
                proc.unref();
                return writeFile(HTTP_PID_FILE, proc.pid);
            }))
        .catch(console.error)
        .then(() => process.exit());

} else if (params.stop === true) {

    fileExists(DRIVER_PID_FILE)
        .then(result => result ?
            readFile(DRIVER_PID_FILE)
            .then(p => kill(p.toString()))
            .then(() => removeFile(DRIVER_PID_FILE)) :
            Promise.resolve())
        .then(() => fileExists(HTTP_PID_FILE))
        .then(result => result ?
            readFile(HTTP_PID_FILE)
            .then(p => kill(p.toString()))
            .then(() => removeFile(HTTP_PID_FILE)) :
            Promise.resolve())
        .catch(console.error);

}
