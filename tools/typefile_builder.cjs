// This script is a workaround for issues related to TypeScript declaration files (.cts) and VSCode.
//
// Problem:
// - VSCode warns if a corresponding declaration file is missing.
// - If a declaration file exists, "Go to Implementations" in VSCode jumps to the declaration file, not the source implementation.
// - `tsc` cannot overwrite existing declaration files.
//
// Solution:
// This script automates the process by first deleting all existing .cts files and then running `tsc`
// to regenerate them. This ensures a clean build and proper editor navigation.

const { glob } = require('glob');
const fs = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');

async function deleteCtsFiles() {
    try {
        console.log('start cleaning .cts files...')
        const files = await glob('**/*.cts', { absolute: true });

        if (files.length === 0) {
            console.log('no .cts files found.');
            return;
        }

        console.log(`${files.length} .cts files found.`);

        const deletePromises = files.map(async (file) => {
            try {
                await fs.unlink(file);
                console.log(`removed: ${path.basename(file)} (${file})`);
            } catch (err) {
                console.error(`failed to remove: ${file}`, err);
            }
        });

        await Promise.all(deletePromises);

        console.log('all .cts files removed.');

    } catch (err) {
        console.error('error:', err);
        throw err;
    }
}

async function runTsc() {
    return new Promise((resolve, reject) => {
        console.log('running tsc...');
        const tscProcess = spawn('npm run run_tsc', [], { shell: true, stdio: 'inherit' });

        tscProcess.on('close', (code) => {
            if (code === 0) {
                console.log('tsc completed successfully.');
                resolve();
            } else {
                const error = new Error(`tsc process exited with code ${code}`);
                console.error(error.message);
                reject(error);
            }
        });

        tscProcess.on('error', (err) => {
            console.error('failed to start tsc process.', err);
            reject(err);
        });
    });
}

async function main() {
    try {
        await deleteCtsFiles();
        await runTsc();
        console.log('build process finished successfully.');
    } catch (error) {
        console.error('build process failed.');
        process.exit(1);
    }
}

main();
