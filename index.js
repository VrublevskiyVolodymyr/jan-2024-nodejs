const http = require('node:http');
const path = require('node:path');
const readline = require('node:readline/promises');

const {sdf} = require('./some_dir/helper');

sdf()
console.log('Hello World!');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd())

const foo = async () => {
    //Http
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({
    //         data: 'Hello World!',
    //     }));
    // });
    // server.listen(3000);
    console.log("hello from foo")

    // Path
    const pathToFile = __filename;
    console.log("pathToFile ", pathToFile)
    console.log("dirname ",path.dirname(pathToFile))
    console.log("extname ", path.extname(pathToFile))
    console.log("basename ", path.basename(pathToFile))
    console.log("parse ", path.parse(pathToFile))
    console.log(path.isAbsolute(pathToFile))
    console.log(path.isAbsolute('./IdeaProjects/jan-2024-nodejs'))

    // Readline
    const rlInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const name = await rlInstance.question('Name?');
    console.log(`Your name is ${name}`)
    process.exit(0)
}

void foo();

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n2222');
})
server.listen(3000);