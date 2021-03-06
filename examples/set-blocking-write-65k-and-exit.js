/*
 * Set stdout/stderr to be blocking so output is always flushed.
 * Write a large blob and `process.exit`. By default we write ~65k to be more
 * than the buffer size for a pipe (which is 64k, at least on macOS, IIUC).
 */

function main() {
    [process.stdout, process.stderr].forEach(function (s) {
        s && s._handle && s._handle.setBlocking && s._handle.setBlocking(true);
    });

    var size = Number(process.argv[2]) || 65 * 1024;
    var buff = new Buffer(size);
    buff.fill('a');

    process.stdout.write('[meta] start: writing ' + size + ' bytes...\n');
    process.stdout.write(buff);
    process.stdout.write('\n[meta] done\n');

    process.exit(42);
}

main();
