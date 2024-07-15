const express = require('express') // Імпортуємо модуль express
const app = express() // Створюємо додаток express
app.use(express.json()) // Використовуємо middleware для розбору JSON-запитів
    //Якщо ваш сервер отримує запит з JSON-тілом, цей middleware перетворює тіло запиту на об'єкт JavaScript і додає його до об'єкта req.body.
// Він корисний, коли клієнт надсилає дані у форматі JSON.
app.use(express.urlencoded({extended: true})) // Використовуємо middleware для розбору URL-кодованих запитів
//Якщо клієнт надсилає дані у форматі application/x-www-form-urlencoded (наприклад, з HTML-форми), цей middleware перетворює їх на об'єкт JavaScript і додає до об'єкта req.body.
// Опція extended: true дозволяє обробляти складні об'єкти та масиви у вигляді URL-кодованих рядків за допомогою бібліотеки qs. Якщо extended: false, використовується бібліотека querystring, яка менш функціональна.

// Масив користувачів з прикладами даних
const users = [
    {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
    {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
    {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
    {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
    {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
    {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
    {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
    {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
    {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
    {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
];

// Обробник GET-запитів на '/users', повертає список користувачів
app.get('/users', (req, res) => {
    try {
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// Обробник POST-запитів на '/users', додає нового користувача
app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Перевіряємо, чи існує користувач з таким email
        const index = users.findIndex((user) => user.email === email)
        if (index !== -1) {
            return res.status(409).json('Користувач з цим email вже існує')
        }
        // Створюємо нового користувача
        const newUser = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            password
        }
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

// Обробник GET-запитів на '/users/:userId', повертає користувача за ID
app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('Користувача не знайдено')
        }
        res.json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

// Обробник PUT-запитів на '/users/:userId', оновлює дані користувача за ID
app.put('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const {name, email, password} = req.body;
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('Користувача не знайдено')
        }
        // Оновлюємо дані користувача, якщо вони передані в запиті
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
});

// Обробник DELETE-запитів на '/users/:userId', видаляє користувача за ID
app.delete('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return res.status(404).json('Користувача не знайдено')
        }
        users.splice(index, 1); // Видаляємо користувача з масиву
        res.sendStatus(204); // Відповідаємо статусом 204 No Content
    } catch (e) {
        res.status(400).json(e.message)
    }
})

// Запускаємо сервер на порту 3000
app.listen(3000, () => {
    console.log('Сервер працює на порту 3000')
})
