// Створити папку "baseFolder". В ній створити 5 папок, в кожній з яких створити по 5 файлів з розширенням txt.
//     Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.


const path = require('node:path');
const fs = require('node:fs/promises');

const createFolderAndFiles = async () => {

    const baseFolder = path.join(__dirname, 'baseFolder');
    await fs.mkdir(baseFolder);
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    for (const folderName of folderNames) {
        const folderPath = path.join(baseFolder, folderName);
        await fs.mkdir(folderPath);

        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

        for (const fileName of fileNames) {
            const filePath = path.join(folderPath, fileName);
            await fs.writeFile(filePath, 'Hello world!');
        }
    }


};

void createFolderAndFiles().catch(console.error);

async function printDirectoryContents(dir) {
    const entries = await fs.readdir(dir, {withFileTypes: true});
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            console.log(`folder: ${fullPath}`);
            await printDirectoryContents(fullPath);
        } else {
            console.log(`file: ${fullPath}`);
        }
    }
}

const baseFolder = path.join(__dirname, 'baseFolder');
void printDirectoryContents(baseFolder);