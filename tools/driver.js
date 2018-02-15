#!/usr/bin/env node

const Promise = require('bluebird');
const cp = require('child_process');
const fs = require('fs');
const docopt = require('docopt').docopt;

const PID_FILE = `${process.cwd()}/driver.pid`;
const CHROME_DRIVER = `${__dirname}/chromedriver`;

const readFile = path => Promise.fromCallback(cb => fs.readFile(path, cb));
const fileExists = path => readFile(path).then(() => true).catch(() => false);
const writeFile = (path, contents) => Promise.fromCallback(cb => fs.writeFile(path, contents, cb));
const readdir = path => Promise.fromCallback(cb => fs.readdir(path, cb));
const removeFile = path => Promise.fromCallback(cb => fs.unlink(path, cb));
const kill = pid => Promise.try(() => process.kill(pid, 'SIGTERM'))

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

    fileExists(PID_FILE)
        .then(result => result ?
            console.error('Already running!') :
            Promise
            .resolve(cp.spawn(CHROME_DRIVER, ['--port 9515'], { detached: true }))
            .then(proc => {
                proc.unref();
                return writeFile(PID_FILE, proc.pid);
            })
            .catch(console.error))
        .catch(() => {})
        .then(() => process.exit());

} else if (params.stop === true) {

    readFile(PID_FILE)
        .then(p => kill(p.toString()))
        .then(() => removeFile(PID_FILE))
        .catch(e => console.error(e));

}
