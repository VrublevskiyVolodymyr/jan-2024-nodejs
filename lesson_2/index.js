// Імпорт модуля HTTP для створення веб-сервера
const http = require('node:http');
// Імпорт модуля path для роботи з файловими шляхами
const path = require('node:path');
// Імпорт модуля readline для зчитування вводу з консолі (версія з підтримкою промісів)
const rl = require('node:readline/promises');
// Імпорт модуля fs для роботи з файловою системою (синхронна версія)
const fscl = require('node:fs');
// Імпорт модуля fs з підтримкою промісів для роботи з файловою системою (асинхронна версія)
const fs = require('node:fs/promises');
// Імпорт модуля os для отримання інформації про операційну систему
const os = require('node:os');
// Імпорт екземпляра emitter з власного модуля './emiter'
const {emitter} = require('./emiter');


// Асинхронна функція
const foo = async () => {

    // HTTP
    // Створення HTTP-сервера
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.end('Hello World\n2222');
    // })
    // server.listen(3000);

    // Path
    // Вивід повного шляху до поточного файлу
    // console.log(__filename)
    // Вивід базового імені файлу
    // console.log(path.basename(__filename));
    // Вивід директорії файлу
    // console.log(path.dirname(__filename));
    // Вивід розширення файлу
    // console.log(path.extname(__filename));
    // Парсинг шляху файлу
    // console.log(path.parse(__filename));
    // Нормалізація шляху файлу
    // console.log(path.normalize('/home/maksym///////\/////WORK////\///Lessons/jan-2024-nodejs/index.js'));
    // Перевірка, чи шлях є абсолютним
    // console.log(path.isAbsolute('/home/maksym/WORK/Lessons/jan-2024-nodejs/index.js'))
    // console.log(path.isAbsolute('./home/maksym/WORK/Lessons/jan-2024-nodejs/index.js'))

    // Readline
    // Створення інтерфейсу для читання з консолі
    // const rlInstance = rl.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // Запит імені користувача
    // const name = await rlInstance.question('Enter your name: ');
    // console.log(`Hello, ${name}!`);
    // Запит віку користувача
    // const age = await rlInstance.question('Enter your age: ');
    // console.log(`You are ${age} years old!`);
    // Завершення процесу
    // process.exit(0);

    // FS (File System)
    // Шлях до файлу
    // const pathToFile = path.join(__dirname, 'some_dir', 'test.txt');
    // Запис даних у файл
    // await fs.writeFile(pathToFile, 'Hello, world!')
    // Читання даних з файлу
    // const data = await fs.readFile(pathToFile, 'utf-8')
    // console.log(data);
    // Додавання даних до файлу
    // await fs.appendFile(pathToFile, '\n Hello, world again!')

    // Створення директорій
    // await fs.mkdir(path.join(__dirname, 'some_dir', 'new_dir', 'new_dir2'), {recursive: true})
    // Видалення директорії
    // await fs.rmdir(path.join(__dirname, 'some_dir', 'new_dir', 'new_dir2'))
    // Запис у файл у новій директорії
    // await fs.writeFile(path.join(__dirname, 'some_dir', 'new_dir', 'new_dir2', 'test.txt'), 'Hello, world!')
    // Рекурсивне видалення директорії
    // await fs.rm(path.join(__dirname, 'some_dir', 'new_dir'), {recursive: true})
    // Видалення файлу
    // await fs.unlink(path.join(__dirname, 'test.txt'))
    // Перейменування файлу
    // await fs.rename(path.join(__dirname, 'some_dir', 'test.txt'), path.join(__dirname, 'test222.txt'))
    // Копіювання файлу
    // await fs.copyFile(path.join(__dirname, 'some_dir', 'test222.txt'), path.join(__dirname, '111.txt'))
    // Отримання інформації про файл
    // const stat = await fs.stat(path.join(__dirname, 'some_dir', 'test222.txt'))
    // Перевірка, чи є шлях директорією
    // console.log(stat.isDirectory())
    // Перевірка, чи є шлях файлом
    // console.log(stat.isFile())

    // FS stream
    // Створення потоку для читання з файлу
    // const readStream = fscl.createReadStream(path.join(__dirname, 'big_file.pdf'))
    // Створення потоку для запису у файл
    // const writeStream = fscl.createWriteStream(path.join(__dirname, 'big_file_copy.pdf'))

    // Читання даних з файлу і запис у інший файл
    // readStream.on('data', (chunk) => {
    //     console.log(chunk);
    //     writeStream.write(chunk)
    // });
    // Пайпінг (об'єднання) потоків
    // readStream.pipe(writeStream)

    // OS
    // Вивід архітектури процесора
    // console.log(os.arch());
    // Вивід інформації про процесори
    // console.log(os.cpus());
    // Вивід імені хоста
    // console.log(os.hostname());
    // Вивід домашньої директорії
    // console.log(os.homedir());
    // Вивід об'єму вільної пам'яті в ГБ
    // console.log(os.freemem() / 1024 / 1024 / 1024);
    // Вивід загального об'єму пам'яті в ГБ
    // console.log(os.totalmem() / 1024 / 1024 / 1024);

    // Виклик подій
    emitter.emit('test2', 'qwe', 'asd', 222)
    emitter.emit('test2', 'SSS', 'WWWWW', 111)
    emitter.emit('create_user', {name: 'maks', age: 28})
    emitter.emit('create_user', {name: 'Dima', age: 28})
}

// Виклик асинхронної функції
void foo()
