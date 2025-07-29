const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // <-- Добавляем импорт mysql2/promise

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- НАЧАЛО: Логика подключения к MySQL ---
let dbConnection; // Переменная для хранения соединения с базой данных MySQL

async function connectToDatabase() {
  try {
    // Подключаемся к вашей базе данных MySQL
    dbConnection = await mysql.createConnection({
      host: 'localhost',      // MySQL запущен на том же сервере
      user: 'Serg',           // Ваш пользователь MySQL
      password: 'Pa$$w0rd_MySql2025!', // Ваш пароль для пользователя Serg PhpM@dm1n$Pass_2025
      database: 'test'        // Ваша база данных
    });
    console.log('✅ Успешно подключено к базе данных MySQL!');
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error.message);
    // Важно: если не можем подключиться к БД, сервер, вероятно, не сможет работать.
    // Вы можете здесь решить, завершать ли процесс или просто логировать ошибку.
    // Для критически важных приложений рекомендуется завершать: process.exit(1);
  }
}
// --- КОНЕЦ: Логика подключения к MySQL ---


app.get('/api/fruit', (req, res) => {
  res.json([
    {id : 1, fruit: 'banana'},
    {id : 2, fruit: 'strawberry'},
    {id : 3, fruit: 'apricot'},
    {id : 4, fruit: 'apple'},
  ]);
});

// Вы можете использовать этот эндпоинт для проверки подключения к БД.
app.get('/api/vegetables', async (req, res) => {
  if (!dbConnection) {
    return res.status(500).json({ error: 'Соединение с базой данных не установлено.' });
  }
  try {
    const [rows] = await dbConnection.execute('SELECT * FROM vegetables');
    res.json(rows);
  } catch (error) {
    console.error('❌ Ошибка при получении данных из БД:', error.message);
    res.status(500).json({ error: 'Не удалось получить данные из базы данных.' });
  }
});


app.listen(PORT, async () => { 
  await connectToDatabase(); 
  console.log(`🚀 Сервер Express запущен на http://localhost:${PORT}`);
});

