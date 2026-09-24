# Yuristim Xizmatlar

xizmatlar.yuristim.uz uchun ro‘yxatdan o‘tishsiz ishlaydigan lightweight yuridik vositalar.

## Hozirgi sahifalar

- / — xizmatlar landing sahifasi
- /aliment — voyaga yetmagan bolalar uchun aliment kalkulyatori
- /ipateka — ipoteka kreditining oylik to‘lovlari, jami foizi va umumiy qiymati kalkulyatori

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


## Ipoteka kalkulyatori

2026-09-25 holatiga tekshirilgan rasmiy ma’lumotlar asosida:

- kalkulyator bankka bog‘lanmagan va foydalanuvchi kiritgan narx, badal, foiz va muddat asosida ishlaydi;
- annuitet va differensial hisoblash usullari mavjud;
- PF-29 (24.02.2026) bo‘yicha 2026-yil ipoteka va subsidiya dasturi sahifada izohlangan;
- 2026-yil uchun 30 000 ta subsidiya va 2,7015 trln so‘mlik maqsadli ko‘rsatkich tasdiqlangan;
- subsidiya arizalari 16-martdan 1-dekabrgacha qabul qilinadi;
- subsidiya avtomatik hisoblanmaydi, chunki eligibility va real to‘lov bank/individual holatga bog‘liq.

Manbalar:
- https://lex.uz/docs/-8072219
- https://my.gov.uz/uz/service/325/
- https://gov.uz/oz/advice/59/document/2301
