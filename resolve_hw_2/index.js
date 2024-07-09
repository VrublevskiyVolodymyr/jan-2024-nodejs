const path = require('node:path');
const fs = require('node:fs/promises');

const foo = async () => {
    try {
        // Створюємо шлях до базової папки
        const baseFolderPath = path.join(process.cwd(), 'baseFolder');
        // Створюємо базову папку, якщо вона не існує
        await fs.mkdir(baseFolderPath, {recursive: true});

        // Масиви імен для папок і файлів
        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

        // Створюємо папки і файли в них
        await Promise.allSettled(folderNames.map(async (folderName) => {
            const folderPath = path.join(baseFolderPath, folderName);
            // Створюємо папку, якщо вона не існує
            await fs.mkdir(folderPath, {recursive: true});
            // Створюємо файли в папці
            await Promise.allSettled(fileNames.map(async (fileName) => {
                await fs.writeFile(path.join(folderPath, fileName), "Hello!!!");
            }));
        }));

        // Отримуємо список всіх папок у базовій папці
        const folders = await fs.readdir(baseFolderPath);
        for (const folder of folders) {
            const folderPath = path.join(baseFolderPath, folder);
            // Отримуємо інформацію про папку (чи є це директорія)
            const stat = await fs.stat(folderPath);
            // Виводимо шлях до папки і чи є це директорія
            console.log(`${folderPath} isDirectory: ${stat.isDirectory()}`);

            // Отримуємо список файлів у поточній папці
            const files = await fs.readdir(path.join(baseFolderPath, folder));
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stat = await fs.stat(filePath);
                // Виводимо шлях до файлу і чи є це директорія (має бути false)
                console.log(`${filePath} isDirectory: ${stat.isDirectory()}`);
            }
        }

    } catch (e) {
        // Виводимо повідомлення про помилку, якщо щось пішло не так
        console.error(e.message)
    }
}

// Викликаємо функцію
void foo()
