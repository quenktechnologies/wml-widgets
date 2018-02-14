#!/usr/bin/env node

const Promise = require('bluebird');
const cp = require('child_process');
const fs = require('fs');

const PID_FILE = `${process.cwd()}/driver.pid`;
const CHROME_DRIVER = `${__dirname}/chromedriver`;

const readFile = path => Promise.fromCallback(cb => fs.readFile(path, cb));
const writeFile = (path, contents) => Promise.fromCallback(cb => fs.writeFile(path, contents, cb));
const readdir = path => Promise.fromCallback(cb => fs.readdir(path, cb));
const removeFile = path => Promise.fromCallback(cb => fs.unlink(path, cb));
const kill = pid => Promise.try(() => process.kill(pid, 'SIGTERM'))

const pidExists = pid =>
    Promise
    .try(() => process.kill(pid, 0))
    .then(() => true)
    .catch(() => false);


readFile(PID_FILE)
    .then(pid =>
        pidExists(pid)
        .then(result => result ?
            kill(pid) :
            Promise.resolve()))
    .then(() => removeFile(PID_FILE))
    .catch(console.error)
    .then(() => cp.spawn(CHROME_DRIVER, [], { detached: true }))
    .then(proc => {
        proc.unref();
        return writeFile(PID_FILE, proc.pid);
    })
    .catch(console.error)
    .then(() => process.exit());
