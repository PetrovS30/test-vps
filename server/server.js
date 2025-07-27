const express = require('express');
const cors = require('cors'); // Импортируем middleware CORS

const app = express();
const PORT = process.env.PORT || 5000; // Порт для вашего бэкенда. Используем 5000 по умолчанию.

// Middleware для разрешения CORS запросов
// Это позволяет вашему Vite-фронтенду делать запросы к этому бэкенду
app.use(cors());

// Middleware для парсинга JSON тел запросов
// Позволяет Express понимать JSON данные, отправленные с фронтенда (например, в POST-запросах)
app.use(express.json());


app.get('/api/fruit', (req, res) => {
  res.json([
    {id : 1, fruit: 'banana'},
    {id : 2, fruit: 'strawberry'},
    {id : 3, fruit: 'apricot'},
    {id : 4, fruit: 'apple'},
  ]);
});

app.listen(PORT, () => {
  console.log(`Сервер Express запущен на http://localhost:${PORT}`);
  console.log(`Проверьте его в браузере: http://localhost:${PORT}/api/fruit`);
});