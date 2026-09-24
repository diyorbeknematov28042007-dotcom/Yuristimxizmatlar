(() => {
  "use strict";

  const form = document.getElementById("ipateka-form");
  const homePrice = document.getElementById("home-price");
  const downPayment = document.getElementById("down-payment");
  const interestRate = document.getElementById("interest-rate");
  const term = document.getElementById("term");

  const formatUzs = (value) => {
    if (!Number.isFinite(value)) return "—";
    return Math.round(value).toLocaleString("uz-UZ") + " so‘m";
  };

  const parseMoney = (value) => Number(String(value).replace(/\D/g, "")) || 0;
  const parseDecimal = (value) => Number(String(value).replace(",", ".")) || 0;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function formatHomePrice() {
    const amount = parseMoney(homePrice.value);
    homePrice.value = amount ? amount.toLocaleString("uz-UZ") : "";
  }

  function syncTerm() {
    const years = clamp(Number(term.value) || 1, 1, 30);
    document.getElementById("term-label").textContent = years + " yil";
    document.getElementById("term-months").textContent = (years * 12) + " oy";
  }

  function syncMethodCards() {
    const method = document.querySelector('input[name="payment-method"]:checked')?.value || "annuity";
    document.getElementById("annuity-card").classList.toggle("selected", method === "annuity");
    document.getElementById("differentiated-card").classList.toggle("selected", method === "differentiated");
  }

  function calculate() {
    const price = parseMoney(homePrice.value);
    const downPercent = clamp(parseDecimal(downPayment.value), 0, 99);
    const annualRate = clamp(parseDecimal(interestRate.value), 0, 100);
    const years = clamp(Number(term.value) || 1, 1, 30);
    const months = years * 12;
    const method = document.querySelector('input[name="payment-method"]:checked')?.value || "annuity";

    downPayment.value = String(downPercent).replace(".", ",");
    interestRate.value = String(annualRate).replace(".", ",");

    const downAmount = price * (downPercent / 100);
    const principal = Math.max(price - downAmount, 0);
    const monthlyRate = annualRate / 100 / 12;

    let headline = 0;
    let totalPayment = principal;
    let totalInterest = 0;
    let caption = years + " yil • " + annualRate.toLocaleString("uz-UZ") + "% yillik";

    if (principal > 0 && months > 0) {
      if (method === "annuity") {
        if (monthlyRate === 0) {
          headline = principal / months;
        } else {
          const factor = Math.pow(1 + monthlyRate, months);
          headline = principal * monthlyRate * factor / (factor - 1);
        }
        totalPayment = headline * months;
        totalInterest = totalPayment - principal;
        document.getElementById("main-result-label").textContent = "Taxminiy oylik to‘lov";
        document.getElementById("method-title").textContent = "Annuitet usuli";
        document.getElementById("method-text").textContent = "Oylik to‘lov deyarli bir xil saqlanadi. Dastlabki davrda to‘lovning kattaroq qismi foizga, keyinroq esa asosiy qarzga yo‘naltiriladi.";
      } else {
        const principalPart = principal / months;
        const firstPayment = principalPart + principal * monthlyRate;
        const lastBalance = principalPart;
        const lastPayment = principalPart + lastBalance * monthlyRate;
        totalInterest = monthlyRate === 0 ? 0 : monthlyRate * principal * (months + 1) / 2;
        totalPayment = principal + totalInterest;
        headline = firstPayment;
        caption += " • oxirgi oy " + formatUzs(lastPayment);
        document.getElementById("main-result-label").textContent = "Birinchi oydagi to‘lov";
        document.getElementById("method-title").textContent = "Differensial usul";
        document.getElementById("method-text").textContent = "Asosiy qarz har oy teng qismda kamayadi. Shu sabab dastlabki to‘lov yuqori bo‘ladi va har oy pasayib boradi.";
      }
    }

    document.getElementById("down-payment-sum").textContent = "≈ " + formatUzs(downAmount);
    document.getElementById("monthly-payment").textContent = formatUzs(headline);
    document.getElementById("payment-caption").textContent = caption;
    document.getElementById("loan-amount").textContent = formatUzs(principal);
    document.getElementById("down-payment-result").textContent = formatUzs(downAmount);
    document.getElementById("total-interest").textContent = formatUzs(totalInterest);
    document.getElementById("total-payment").textContent = formatUzs(totalPayment);
    document.getElementById("overall-cost").textContent = formatUzs(downAmount + totalPayment);
  }

  homePrice.addEventListener("input", () => { formatHomePrice(); calculate(); });
  downPayment.addEventListener("input", calculate);
  interestRate.addEventListener("input", calculate);
  term.addEventListener("input", () => { syncTerm(); calculate(); });
  document.querySelectorAll('input[name="payment-method"]').forEach((radio) => {
    radio.addEventListener("change", () => { syncMethodCards(); calculate(); });
  });
  document.querySelectorAll("[data-price]").forEach((button) => {
    button.addEventListener("click", () => {
      homePrice.value = Number(button.dataset.price).toLocaleString("uz-UZ");
      calculate();
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    syncMethodCards();
    calculate();
  });

  formatHomePrice();
  syncTerm();
  syncMethodCards();
  calculate();
})();
