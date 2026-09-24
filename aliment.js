(() => {
  "use strict";

  const MINIMUM_WAGE = 1_271_000;
  const MINIMUM_PER_CHILD = Math.round(MINIMUM_WAGE * 0.265);
  let childCount = 1;

  const form = document.getElementById("aliment-form");
  const incomeInput = document.getElementById("income");
  const childCountEl = document.getElementById("child-count");
  const childMinus = document.getElementById("child-minus");
  const childPlus = document.getElementById("child-plus");
  const resultGrid = document.getElementById("result-grid");
  const minimumNotice = document.getElementById("minimum-notice");
  const irregularNotice = document.getElementById("irregular-notice");

  const formatUzs = (value) => `${Math.round(value).toLocaleString("uz-UZ")} so‘m`;
  const parseMoney = (value) => Number(String(value).replace(/\D/g, "")) || 0;
  const shareRate = (count) => (count === 1 ? 0.25 : count === 2 ? 1 / 3 : 0.5);
  const rateLabel = (count) => (count === 1 ? "1/4 (25%)" : count === 2 ? "1/3 (33,3%)" : "1/2 (50%)");

  function formatInput() {
    const amount = parseMoney(incomeInput.value);
    incomeInput.value = amount ? amount.toLocaleString("uz-UZ") : "";
  }

  function syncChildControls() {
    childCountEl.textContent = String(childCount);
    childMinus.disabled = childCount <= 1;
    childPlus.disabled = childCount >= 20;
  }

  function syncStabilityCards() {
    const selected = document.querySelector('input[name="stability"]:checked')?.value || "stable";
    document.getElementById("stable-card").classList.toggle("selected", selected === "stable");
    document.getElementById("irregular-card").classList.toggle("selected", selected === "irregular");
    irregularNotice.hidden = selected !== "irregular";
  }

  function calculate() {
    const income = parseMoney(incomeInput.value);
    const rate = shareRate(childCount);
    const shareAmount = income * rate;
    const minimumTotal = MINIMUM_PER_CHILD * childCount;
    const estimatedAmount = Math.max(shareAmount, minimumTotal);
    const perChild = estimatedAmount / childCount;
    const minimumApplied = minimumTotal > shareAmount;

    document.getElementById("result-amount").textContent = formatUzs(estimatedAmount);
    document.getElementById("result-caption").textContent = `${childCount} bola uchun`;
    document.getElementById("rate-label").textContent = rateLabel(childCount);
    document.getElementById("share-amount").textContent = formatUzs(shareAmount);
    document.getElementById("minimum-child").textContent = formatUzs(MINIMUM_PER_CHILD);
    document.getElementById("per-child").textContent = formatUzs(perChild);
    resultGrid.hidden = false;

    minimumNotice.hidden = !minimumApplied;
    document.getElementById("minimum-notice-text").textContent = minimumApplied
      ? `Ulush bo‘yicha hisob qonundagi eng kam miqdordan past chiqdi. Shu sabab har bir bola uchun ${formatUzs(MINIMUM_PER_CHILD)} minimum hisobga olindi.`
      : "";

    syncStabilityCards();
  }

  incomeInput.addEventListener("input", formatInput);
  childMinus.addEventListener("click", () => { childCount = Math.max(1, childCount - 1); syncChildControls(); });
  childPlus.addEventListener("click", () => { childCount = Math.min(20, childCount + 1); syncChildControls(); });
  document.querySelectorAll("[data-income]").forEach((button) => {
    button.addEventListener("click", () => {
      incomeInput.value = Number(button.dataset.income).toLocaleString("uz-UZ");
    });
  });
  document.querySelectorAll('input[name="stability"]').forEach((radio) => radio.addEventListener("change", syncStabilityCards));
  form.addEventListener("submit", (event) => { event.preventDefault(); calculate(); });

  syncChildControls();
  syncStabilityCards();
  calculate();
})();
