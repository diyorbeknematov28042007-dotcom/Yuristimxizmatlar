# Yuristim Xizmatlar

xizmatlar.yuristim.uz uchun ro‘yxatdan o‘tishsiz ishlaydigan lightweight yuridik vositalar.

## Hozirgi sahifalar

- / — xizmatlar landing sahifasi
- /aliment — voyaga yetmagan bolalar uchun aliment kalkulyatori

## Aliment kalkulyatori huquqiy bazasi

2026-09-25 holatiga tekshirilgan:

- Oila kodeksi 99-modda: 1 bola — 1/4; 2 bola — 1/3; 3+ bola — 1/2.
- Har bir bola uchun eng kam miqdor: MHTEKMning 26,5%.
- Amaldagi MHTEKM: 1 271 000 so‘m.
- Kalkulyatordagi minimum: 336 815 so‘m / bola.
- 102-modda: o‘zgaruvchan, natura, chet el valyutasidagi yoki rasmiy daromadsiz holatda qat’iy summa belgilanishi mumkin.
- 103–105-moddalar bo‘yicha qo‘shimcha xarajatlar, daromad turlari va sud tomonidan miqdorni kamaytirish mumkin bo‘lgan holatlar UI’da izohlangan.

Manbalar:
- https://lex.uz/docs/-104720?ONDATE=12.09.2026%2002
- https://gov.uz/oz/advice/NaN/document/2099

## Stack

Zero-dependency static HTML/CSS/JS. Hech qanday backend, auth, database yoki build step kerak emas.

Vercel project root — repository root. vercel.json orqali clean URL yoqilgan, shuning uchun aliment.html productionda /aliment sifatida ochiladi.
