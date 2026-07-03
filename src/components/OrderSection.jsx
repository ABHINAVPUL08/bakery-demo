import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const INTEREST_CARDS = [
  {
    value: "cake",
    name: "Custom Celebration Cake",
    description: "Handcrafted layers, premium frosting, and flavors baked fresh for your special day.",
    price: "From ₹3,450",
    image: "/images/cakes/banana-toffee-cover.png",
  },
  {
    value: "gift-basket",
    name: "Artisan Gift Box",
    description: "A curated selection of pastries, jams, and treats — beautifully packaged to impress.",
    price: "From ₹3,499 + GST",
    image: "/images/gift-box-cover.png",
  },
  {
    value: "catering",
    name: "Catering & Events",
    description: "Elevated spreads for brunches, meetings, and celebrations — made with local ingredients.",
    price: "Custom quote",
    image: "/images/catering-platter.png",
  },
  {
    value: "other",
    name: "Something Special",
    description: "Have a unique request? Tell us your vision and we'll bring it to life.",
    price: "Let's chat",
    image: "/images/cakes/carrot-cake-cover.png",
  },
];

const TRUST_ITEMS = [
  {
    title: "Freshly Baked Daily",
    icon: "star",
  },
  {
    title: "Premium Ingredients",
    icon: "egg",
  },
  {
    title: "Fully Customizable",
    icon: "cake",
  },
  {
    title: "Ready in 24–48 Hours",
    icon: "delivery",
  },
];

const CAKE_FLAVORS = [
  { value: "", label: "Select a flavor" },
  { value: "banana-toffee", label: "Banana Toffee Caramel Cake" },
  { value: "chocolate-sponge", label: "Rich Chocolate Sponge Cake" },
  { value: "brown-butter", label: "Brown Butter Cream Cheese Frosting Cake" },
  { value: "carrot", label: "Carrot Cake" },
  { value: "salted-caramel", label: "Salted Caramel Fudge" },
  { value: "chocolate-mocha", label: "Chocolate Mocha Fudge" },
  { value: "cheesecake", label: "Cheesecake" },
  { value: "other-flavor", label: "Other / Custom Request" },
];

const CAKE_SIZES = [
  { value: "", label: "Select a size" },
  { value: '6"', label: '6" (serves 8–10)' },
  { value: '9"', label: '9" (serves 16–20)' },
];

const ORDER_OPTION_LABELS = Object.fromEntries(
  INTEREST_CARDS.map(({ value, name }) => [value, name])
);

const FLAVOR_LABELS = Object.fromEntries(
  CAKE_FLAVORS.filter(({ value }) => value).map(({ value, label }) => [value, label])
);

const SIZE_LABELS = Object.fromEntries(
  CAKE_SIZES.filter(({ value }) => value).map(({ value, label }) => [value, label])
);

const emptyForm = {
  name: "",
  "phone-number": "",
  "email-address": "",
  "cake-flavor": "",
  "cake-size": "",
  "pickup-date": "",
  "pickup-time": "",
  "order-option": "",
  "your-message": "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const previewRow = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -8, transition: { duration: 0.2 } },
};

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6.5 4h3l1.5 5-2 1.5a13 13 0 0 0 5.5 5.5L14 14l5 1.5v3A2 2 0 0 1 17 20.5 15.5 15.5 0 0 1 3.5 7 2 2 0 0 1 6.5 4z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconCake() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 14h16v5H4z" />
      <path d="M6 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
      <path d="M8 7V5M12 7V4M16 7V5" />
    </svg>
  );
}

function IconSize() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 8h16M4 16h16M8 4v16M16 4v16" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  );
}

function TrustIcon({ type }) {
  if (type === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3.5l2.4 5.6 6.1.5-4.6 4 1.4 6-5.3-3.2-5.3 3.2 1.4-6-4.6-4 6.1-.5z" />
      </svg>
    );
  }
  if (type === "egg") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 21c4.5 0 7-4.5 7-9.5S15.5 3 12 3 5 6.5 5 11.5 7.5 21 12 21z" />
      </svg>
    );
  }
  if (type === "cake") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 14h16v5H4z" />
        <path d="M6 14V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
        <path d="M8 7V5M12 7V4M16 7V5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M3 8h11v8H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

function TrustCard({ item, index }) {
  return (
    <motion.div
      className="order-trust-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
    >
      <span className="order-trust-card__icon" aria-hidden="true">
        <TrustIcon type={item.icon} />
      </span>
      <p>{item.title}</p>
    </motion.div>
  );
}

function ReserveCakeButton({ isSubmitting, isSuccess }) {
  return (
    <motion.button
      type="submit"
      className={`order-reserve-btn${isSuccess ? " is-success" : ""}${isSubmitting ? " is-loading" : ""}`}
      disabled={isSubmitting || isSuccess}
      whileHover={!isSubmitting && !isSuccess ? { scale: 1.04 } : undefined}
      whileTap={!isSubmitting && !isSuccess ? { scale: 0.97 } : undefined}
      animate={isSuccess ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.span
            key="success"
            className="order-reserve-btn__content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="order-reserve-btn__check">✓</span>
            Reservation Sent!
          </motion.span>
        ) : isSubmitting ? (
          <motion.span
            key="loading"
            className="order-reserve-btn__content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="order-reserve-btn__spinner" aria-hidden="true" />
            Reserving...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="order-reserve-btn__content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Reserve My Cake
            <motion.span
              className="order-reserve-btn__arrow"
              aria-hidden="true"
              animate={{ x: [0, 7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function InterestCard({ card, isSelected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      className={`order-interest-card${isSelected ? " is-selected" : ""}`}
      onClick={() => onSelect(card.value)}
    >
      <div className="order-interest-card__image-wrap">
        <img src={card.image} alt="" className="order-interest-card__image" />
        {isSelected && <span className="order-interest-card__check">✓</span>}
      </div>
      <div className="order-interest-card__body">
        <h4>{card.name}</h4>
        <p>{card.description}</p>
        <span className="order-interest-card__price">{card.price}</span>
      </div>
    </button>
  );
}

const interestSlideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

function InterestCarousel({ cards, selectedValue, onSelect, error }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeCard = cards[slideIndex];

  function goToSlide(nextIndex) {
    setDirection(nextIndex > slideIndex ? 1 : -1);
    setSlideIndex(nextIndex);
  }

  function goNext() {
    goToSlide((slideIndex + 1) % cards.length);
  }

  function goPrev() {
    goToSlide((slideIndex - 1 + cards.length) % cards.length);
  }

  return (
    <div className="order-interest-carousel">
      <div className="order-interest-carousel__stage" role="radiogroup" aria-label="I'm interested in">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeCard.value}
            className="order-interest-carousel__slide"
            custom={direction}
            variants={interestSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <InterestCard
              card={activeCard}
              isSelected={selectedValue === activeCard.value}
              onSelect={onSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="order-interest-carousel__nav">
        <button type="button" className="order-interest-carousel__btn" onClick={goPrev}>
          ‹ Prev
        </button>
        <div className="order-interest-carousel__dots" aria-hidden="true">
          {cards.map((card, index) => (
            <button
              key={card.value}
              type="button"
              className={`order-interest-carousel__dot${index === slideIndex ? " is-active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Show ${card.name}`}
            />
          ))}
        </div>
        <button type="button" className="order-interest-carousel__btn" onClick={goNext}>
          Next ›
        </button>
      </div>

      <p className="order-interest-carousel__counter">
        {slideIndex + 1} of {cards.length} — tap the card to select
      </p>

      {error && <p className="order-interest-error">Please select one option to continue.</p>}
    </div>
  );
}

function PreviewRow({ label, value }) {
  if (!value?.trim()) return null;

  return (
    <motion.div
      className="order-preview-row"
      variants={previewRow}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <span className="order-preview-label">{label}</span>
      <span className="order-preview-value">{value}</span>
    </motion.div>
  );
}

function PremiumField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  icon,
  className = "",
  delay = 0,
  children,
}) {
  return (
    <motion.label
      className={`order-premium-field ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      custom={delay}
      variants={fadeUp}
    >
      <span className="order-premium-field__label">{label}</span>
      <div className="order-premium-field__control">
        <span className="order-premium-field__icon" aria-hidden="true">
          {icon}
        </span>
        {children || (
          <input
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </motion.label>
  );
}

export default function OrderSection() {
  const [formValues, setFormValues] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [interestError, setInterestError] = useState(false);
  const orderFormVideoRef = useRef(null);
  const orderFormAreaRef = useRef(null);

  useEffect(() => {
    const video = orderFormVideoRef.current;
    const area = orderFormAreaRef.current;
    if (!video || !area) return undefined;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  const hasPreviewContent =
    formValues.name.trim() ||
    formValues["phone-number"].trim() ||
    formValues["email-address"].trim() ||
    formValues["cake-flavor"] ||
    formValues["cake-size"] ||
    formValues["pickup-date"] ||
    formValues["pickup-time"] ||
    formValues["order-option"] ||
    formValues["your-message"].trim();

  const interestPreview = ORDER_OPTION_LABELS[formValues["order-option"]] || "";

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (formStatus) setFormStatus("");
  }

  function selectInterest(value) {
    setFormValues((prev) => ({
      ...prev,
      "order-option": prev["order-option"] === value ? "" : value,
    }));
    setInterestError(false);
    if (formStatus) setFormStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formValues["order-option"]) {
      setInterestError(true);
      return;
    }

    setIsSubmitting(true);
    setFormStatus("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormStatus("success");
        setFormValues(emptyForm);
        setInterestError(false);
        event.currentTarget.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="order" id="order">
      <div className="order-hero">
        <img
          className="order-hero-image"
          src="/images/cakes/banana-toffee-cover.png"
          alt=""
          aria-hidden="true"
        />
        <div className="order-hero-overlay" aria-hidden="true" />

        <div className="order-hero-content">
          <motion.p
            className="order-hero-eyebrow"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
          >
            YOURS CAFE
          </motion.p>
          <motion.h2
            className="order-hero-title"
            initial="hidden"
            animate="visible"
            custom={0.12}
            variants={fadeUp}
          >
            CUSTOM CAKES
            <span>CRAFTED FOR EVERY CELEBRATION</span>
          </motion.h2>
          <motion.p
            className="order-hero-description"
            initial="hidden"
            animate="visible"
            custom={0.24}
            variants={fadeUp}
          >
            Freshly baked using premium ingredients and handcrafted for birthdays, weddings,
            anniversaries and every special occasion.
          </motion.p>
        </div>

        <motion.a
          href="#order-form"
          className="order-hero-scroll"
          aria-label="Scroll to order form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="order-hero-scroll-arrow"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>

      <div className="order-form-area" ref={orderFormAreaRef}>
        <div className="order-form-area__video-wrap" aria-hidden="true">
          <video
            ref={orderFormVideoRef}
            className="order-form-area__video"
            src="/videos/order-form-bg.mp4"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="order-form-area__overlay" />
        </div>

        <div className="order-shell" id="order-form">
        <motion.div
          className="order-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
          <p className="order-eyebrow">YOURS CAFE</p>
          <h2>Order Form</h2>
          <p className="order-intro">
            Whether you&apos;re looking for a decadent cake, custom gift boxes, or catering we would
            love to help you out. Submit an order below and we&apos;ll get back to you as soon as
            possible to confirm the details.
          </p>
        </motion.div>

        <form className="order-form-panel" onSubmit={handleSubmit} onChange={handleChange}>
          <div className="order-form-columns">
            <div className="order-form-main">
              <div className="order-form-grid">
                <PremiumField
                  label="Full Name*"
                  name="name"
                  placeholder="Your full name"
                  required
                  value={formValues.name}
                  onChange={handleChange}
                  icon={<IconUser />}
                  delay={0.05}
                />
                <PremiumField
                  label="Phone*"
                  name="phone-number"
                  type="tel"
                  placeholder="Best number to reach you"
                  required
                  value={formValues["phone-number"]}
                  onChange={handleChange}
                  icon={<IconPhone />}
                  delay={0.1}
                />
                <PremiumField
                  label="Email"
                  name="email-address"
                  type="email"
                  placeholder="you@email.com"
                  value={formValues["email-address"]}
                  onChange={handleChange}
                  icon={<IconEmail />}
                  delay={0.15}
                />
                <PremiumField
                  label="Cake Flavor"
                  name="cake-flavor"
                  icon={<IconCake />}
                  delay={0.2}
                >
                  <select name="cake-flavor" value={formValues["cake-flavor"]} onChange={handleChange}>
                    {CAKE_FLAVORS.map((flavor) => (
                      <option key={flavor.value || "default"} value={flavor.value} disabled={!flavor.value}>
                        {flavor.label}
                      </option>
                    ))}
                  </select>
                </PremiumField>
                <PremiumField
                  label="Cake Size"
                  name="cake-size"
                  icon={<IconSize />}
                  delay={0.25}
                >
                  <select name="cake-size" value={formValues["cake-size"]} onChange={handleChange}>
                    {CAKE_SIZES.map((size) => (
                      <option key={size.value || "default"} value={size.value} disabled={!size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </PremiumField>
                <PremiumField
                  label="Pickup Date"
                  name="pickup-date"
                  type="date"
                  value={formValues["pickup-date"]}
                  onChange={handleChange}
                  icon={<IconCalendar />}
                  delay={0.3}
                />
                <PremiumField
                  label="Pickup Time"
                  name="pickup-time"
                  type="time"
                  value={formValues["pickup-time"]}
                  onChange={handleChange}
                  icon={<IconClock />}
                  delay={0.35}
                />

                <motion.fieldset
                  className="order-field order-field--full order-interest-field"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={0.4}
                  variants={fadeUp}
                >
                  <legend>
                    I&apos;m interested in*{" "}
                    <span className="order-interest-hint">(select one)</span>
                  </legend>
                  <InterestCarousel
                    cards={INTEREST_CARDS}
                    selectedValue={formValues["order-option"]}
                    onSelect={selectInterest}
                    error={interestError}
                  />
                  <input type="hidden" name="order-option" value={formValues["order-option"]} />
                </motion.fieldset>
              </div>
            </div>

            <div className="order-form-sidebar">
              <motion.aside
                className="order-preview-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.2}
                variants={fadeUp}
              >
                <div className="order-preview-header">
                  <img src="/images/cross.svg" alt="" aria-hidden="true" />
                  <div>
                    <p className="order-preview-eyebrow">Live Preview</p>
                    <h3>Your Order</h3>
                  </div>
                </div>

                <div className="order-preview-body">
                  <AnimatePresence mode="popLayout">
                    {!hasPreviewContent ? (
                      <motion.p
                        key="empty"
                        className="order-preview-empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Start filling out the form and your order details will appear here in real time.
                      </motion.p>
                    ) : (
                      <motion.div
                        key="filled"
                        className="order-preview-rows"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <PreviewRow label="Name" value={formValues.name} />
                        <PreviewRow label="Phone" value={formValues["phone-number"]} />
                        <PreviewRow label="Email" value={formValues["email-address"]} />
                        <PreviewRow label="Flavor" value={FLAVOR_LABELS[formValues["cake-flavor"]] || ""} />
                        <PreviewRow
                          label="Size"
                          value={SIZE_LABELS[formValues["cake-size"]] || formValues["cake-size"]}
                        />
                        <PreviewRow label="Pickup Date" value={formValues["pickup-date"]} />
                        <PreviewRow label="Pickup Time" value={formValues["pickup-time"]} />
                        <PreviewRow label="Interest" value={interestPreview} />
                        <PreviewRow label="Message" value={formValues["your-message"]} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="order-preview-note"
                  animate={{ opacity: hasPreviewContent ? 1 : 0.65 }}
                >
                  <p>Handcrafted with care at YOURS CAFE</p>
                  <span>We typically respond within 24–48 hours</span>
                </motion.div>
              </motion.aside>

              <PremiumField
                label="Message*"
                name="your-message"
                className="order-premium-field--textarea"
                icon={<IconMessage />}
                delay={0.45}
              >
                <textarea
                  name="your-message"
                  required
                  placeholder="Tell us about your occasion, dietary notes, or any special requests..."
                  value={formValues["your-message"]}
                  onChange={handleChange}
                />
              </PremiumField>

              <motion.div
                className="order-trust"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.48}
                variants={fadeUp}
              >
                <div className="order-trust-grid order-trust-grid--sidebar">
                  {TRUST_ITEMS.map((item, index) => (
                    <TrustCard key={item.title} item={item} index={index} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="order-form-footer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0.52}
                variants={fadeUp}
              >
                <div className="fake-recaptcha">I&apos;m not a robot</div>
                <ReserveCakeButton isSubmitting={isSubmitting} isSuccess={formStatus === "success"} />
              </motion.div>

              <AnimatePresence mode="wait">
                {formStatus === "error" && (
                  <motion.p
                    className="form-error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </div>
      </div>
    </section>
  );
}
