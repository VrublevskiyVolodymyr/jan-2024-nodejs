// Імпорт модуля fs з підтримкою промісів для роботи з файловою системою (асинхронна версія)
const fs = require('node:fs/promises');
// Імпорт модуля path для роботи з файловими шляхами
const path = require('node:path');

// Шлях до файлу бази даних (db.json) у поточному робочому каталозі
const pathToDB = path.join(process.cwd(), 'db.json');


//module.exports — це об'єкт у Node.js, який використовується для експорту функцій,' +
//' об'єктів або значень з модуля, щоб вони могли бути використані в інших файлах за допомогою require.

module.exports = {
    // Асинхронна функція для читання даних з файлу db.json
    read: async () => {
        // Читання вмісту файлу db.json у форматі UTF-8
        const json = await fs.readFile(pathToDB, 'utf-8');
        // Якщо файл не порожній, парсимо JSON, інакше повертаємо порожній масив
        return json ? JSON.parse(json) : [];
    },

    // Асинхронна функція для запису даних у файл db.json
    write: async (users) => {
        // Записуємо масив users у файл db.json у форматі JSON
        await fs.writeFile(pathToDB, JSON.stringify(users));
    },
}
