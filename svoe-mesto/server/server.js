const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const databaseFolder = path.join(__dirname, "database");
const databasePath = path.join(databaseFolder, "svoe_mesto.db");

if (!fs.existsSync(databaseFolder)) {
  fs.mkdirSync(databaseFolder, { recursive: true });
}

const db = new Database(databasePath);
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    duration INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS masters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    master_name TEXT NOT NULL,
    appointment_date TEXT NOT NULL,
    comment TEXT,
    status TEXT DEFAULT 'Новая',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
  );
`);

const serviceCount = db.prepare("SELECT COUNT(*) AS count FROM services").get().count;
if (serviceCount === 0) {
  const addService = db.prepare(
    "INSERT INTO services (id, title, price, duration) VALUES (?, ?, ?, ?)"
  );

  [
    [1, "Стрижка и укладка", 1500, 60],
    [2, "Маникюр", 1800, 90],
    [3, "Оформление бровей", 900, 40],
    [4, "Уход за лицом", 2200, 60]
  ].forEach((service) => addService.run(...service));
}

const masterCount = db.prepare("SELECT COUNT(*) AS count FROM masters").get().count;
if (masterCount === 0) {
  const addMaster = db.prepare(
    "INSERT INTO masters (name, specialization, experience) VALUES (?, ?, ?)"
  );

  [
    ["Анна Смирнова", "Стилист", "6 лет"],
    ["Мария Волкова", "Мастер маникюра", "4 года"],
    ["Екатерина Белова", "Бровист и косметолог", "5 лет"]
  ].forEach((master) => addMaster.run(...master));
}

// Возвращает список доступных услуг.
app.get("/api/services", (req, res) => {
  const services = db.prepare("SELECT * FROM services ORDER BY id").all();
  res.json(services);
});

// Возвращает список мастеров.
app.get("/api/masters", (req, res) => {
  const masters = db.prepare("SELECT * FROM masters ORDER BY id").all();
  res.json(masters);
});

// Создаёт клиента и его заявку на запись.
app.post("/api/appointments", (req, res) => {
  const {
    clientName,
    phone,
    serviceId,
    masterName,
    date,
    comment = ""
  } = req.body;

  if (!clientName?.trim() || !phone?.trim() || !serviceId || !masterName || !date) {
    return res.status(400).json({ message: "Заполните все обязательные поля." });
  }

  const service = db.prepare("SELECT id FROM services WHERE id = ?").get(serviceId);
  if (!service) {
    return res.status(400).json({ message: "Выбранная услуга не найдена." });
  }

  try {
    const createAppointment = db.transaction(() => {
      const clientResult = db.prepare(
        "INSERT INTO clients (name, phone) VALUES (?, ?)"
      ).run(clientName.trim(), phone.trim());

      const appointmentResult = db.prepare(`
        INSERT INTO appointments
          (client_id, service_id, master_name, appointment_date, comment)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        clientResult.lastInsertRowid,
        serviceId,
        masterName,
        date,
        comment.trim()
      );

      return appointmentResult.lastInsertRowid;
    });

    const appointmentId = createAppointment();
    res.status(201).json({
      message: "Заявка успешно сохранена.",
      appointmentId
    });
  } catch (error) {
    console.error("Ошибка сохранения заявки:", error);
    res.status(500).json({ message: "Не удалось сохранить заявку." });
  }
});

// Учебный маршрут для просмотра заявок.
app.get("/api/appointments", (req, res) => {
  const appointments = db.prepare(`
    SELECT
      appointments.id,
      clients.name AS client_name,
      clients.phone,
      services.title AS service_title,
      appointments.master_name,
      appointments.appointment_date,
      appointments.comment,
      appointments.status
    FROM appointments
    JOIN clients ON clients.id = appointments.client_id
    JOIN services ON services.id = appointments.service_id
    ORDER BY appointments.id DESC
  `).all();

  res.json(appointments);
});

app.listen(PORT, () => {
  console.log(`Сервер салона «Своё место» запущен: http://localhost:${PORT}`);
});
