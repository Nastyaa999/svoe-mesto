import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Instagram, Menu, Scissors, Sparkles, X } from "lucide-react";

import heroImage from "./assets/hero-salon.svg";
import hairImage from "./assets/hair-service.svg";
import nailsImage from "./assets/nails-service.svg";
import browsImage from "./assets/brows-service.svg";
import faceImage from "./assets/face-service.svg";

const services = [
  {
    id: 1,
    title: "Стрижка и укладка",
    description: "Обновим образ и подберём укладку, которая подчеркнёт вашу индивидуальность.",
    price: 1500,
    duration: 60,
    image: hairImage
  },
  {
    id: 2,
    title: "Маникюр",
    description: "Аккуратный уход, красивая форма и покрытие в любимом оттенке.",
    price: 1800,
    duration: 90,
    image: nailsImage
  },
  {
    id: 3,
    title: "Оформление бровей",
    description: "Подчеркнём естественную форму и создадим гармоничный образ.",
    price: 900,
    duration: 40,
    image: browsImage
  },
  {
    id: 4,
    title: "Уход за лицом",
    description: "Мягкие уходовые процедуры для свежести и комфортного состояния кожи.",
    price: 2200,
    duration: 60,
    image: faceImage
  }
];

const masters = [
  { name: "Анна Смирнова", role: "Стилист", experience: "Опыт 6 лет", initials: "АС" },
  { name: "Мария Волкова", role: "Мастер маникюра", experience: "Опыт 4 года", initials: "МВ" },
  { name: "Екатерина Белова", role: "Бровист и косметолог", experience: "Опыт 5 лет", initials: "ЕБ" }
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="logo" href="#home" onClick={closeMenu}>
        <span className="logo-mark">с.</span>
        <span>своё место<small>САЛОН КРАСОТЫ</small></span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "navigation navigation-open" : "navigation"}>
        <a href="#about" onClick={closeMenu}>О салоне</a>
        <a href="#services" onClick={closeMenu}>Услуги</a>
        <a href="#masters" onClick={closeMenu}>Мастера</a>
        <a className="nav-booking" href="#booking" onClick={closeMenu}>Записаться <ArrowUpRight size={16} /></a>
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <span className="eyebrow">ПРОСТРАНСТВО ЗАБОТЫ О СЕБЕ</span>
        <h1>Место, где<br /><em>можно быть собой.</em></h1>
        <p>
          Красота начинается с ощущения комфорта.
          Приходите за любимыми процедурами, спокойствием и временем для себя.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#booking">Записаться на визит <ArrowUpRight size={17} /></a>
          <a className="text-link" href="#services">Посмотреть услуги</a>
        </div>
        <div className="hero-note"><Sparkles size={17} /> Забота в каждой детали</div>
      </div>
      <div className="hero-visual">
        <img src={heroImage} alt="Уютный интерьер салона красоты" />
        <div className="image-caption"><span>01 / 04</span> Ваше время для себя</div>
      </div>
      <div className="hero-vertical">УЛЬЯНОВСК · BEAUTY SPACE</div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-wrap" id="about">
      <div className="about-number">01</div>
      <div className="about-content">
        <span className="eyebrow">НЕМНОГО О НАС</span>
        <h2>Не просто салон.<br /><em>Ваше своё место.</em></h2>
        <p>
          Мы создали пространство, в котором не нужно никуда спешить.
          Здесь вас услышат, помогут подобрать подходящий уход и окружат вниманием.
          Для нас важно, чтобы после визита вы чувствовали себя не только красивее,
          но и чуточку счастливее.
        </p>
      </div>
      <div className="about-stamp"><span>BEAUTY</span><strong>♡</strong><span>AND CARE</span></div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-wrap" id="services">
      <SectionHeading
        eyebrow="02 / НАШИ НАПРАВЛЕНИЯ"
        title="Время для красоты"
        description="Выберите то, что хочется именно сегодня."
      />
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-image">
              <img src={service.image} alt={service.title} />
              <span className="service-index">0{service.id}</span>
            </div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-bottom">
                <strong>{service.price.toLocaleString("ru-RU")} ₽</strong>
                <span><Clock3 size={14} /> {service.duration} мин.</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Masters() {
  return (
    <section className="masters section-wrap" id="masters">
      <SectionHeading
        eyebrow="03 / НАША КОМАНДА"
        title="В надёжных руках"
        description="Профессионалы, которые любят своё дело и внимательно относятся к вашим пожеланиям."
      />
      <div className="master-grid">
        {masters.map((master) => (
          <article className="master-card" key={master.name}>
            <div className="master-avatar">{master.initials}</div>
            <div>
              <h3>{master.name}</h3>
              <p>{master.role}</p>
              <span>{master.experience}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  const [form, setForm] = useState({
    clientName: "",
    phone: "",
    serviceId: String(services[0].id),
    masterName: masters[0].name,
    date: "",
    comment: ""
  });
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm((current) => ({ ...current, date: today }));
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: form.clientName,
          phone: form.phone,
          serviceId: Number(form.serviceId),
          masterName: form.masterName,
          date: form.date,
          comment: form.comment
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Не удалось отправить заявку.");

      setMessage("Спасибо! Ваша заявка сохранена. Мы свяжемся с вами для подтверждения.");
      setForm((current) => ({ ...current, clientName: "", phone: "", comment: "" }));
    } catch (error) {
      setMessage(error.message || "Ошибка соединения с сервером. Проверьте, запущен ли проект.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="booking section-wrap" id="booking">
      <div className="booking-intro">
        <span className="eyebrow">04 / ОНЛАЙН-ЗАПИСЬ</span>
        <h2>Давайте выберем<br /><em>время для вас.</em></h2>
        <p>Оставьте заявку, а мы свяжемся с вами и подтвердим удобное время.</p>
        <div className="booking-decoration"><Scissors size={32} /></div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Ваше имя
          <input name="clientName" value={form.clientName} onChange={updateField} placeholder="Как к вам обращаться?" required />
        </label>
        <label>
          Номер телефона
          <input name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="+7 (___) ___-__-__" required />
        </label>
        <div className="form-row">
          <label>
            Услуга
            <select name="serviceId" value={form.serviceId} onChange={updateField}>
              {services.map((service) => (
                <option value={service.id} key={service.id}>{service.title}</option>
              ))}
            </select>
          </label>
          <label>
            Мастер
            <select name="masterName" value={form.masterName} onChange={updateField}>
              {masters.map((master) => (
                <option value={master.name} key={master.name}>{master.name}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Желаемая дата
          <input name="date" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={updateField} required />
        </label>
        <label>
          Комментарий <span className="optional">(необязательно)</span>
          <textarea name="comment" value={form.comment} onChange={updateField} placeholder="Расскажите о ваших пожеланиях" rows="3" />
        </label>
        <button className="button button-dark form-submit" type="submit" disabled={isSending}>
          {isSending ? "Отправляем..." : "Оставить заявку"} <ArrowUpRight size={17} />
        </button>
        {message && <p className="form-message" role="status">{message}</p>}
        <small className="privacy-note">Нажимая на кнопку, вы соглашаетесь на обработку данных для связи по заявке.</small>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="logo footer-logo" href="#home">
        <span className="logo-mark">с.</span>
        <span>своё место<small>САЛОН КРАСОТЫ</small></span>
      </a>
      <p>Ульяновск · По предварительной записи</p>
      <a className="footer-top" href="#home">Наверх ↑</a>
      <span className="copyright">© 2026 Своё место</span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Masters />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
