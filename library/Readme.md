# (BACKEND DEVELOPER) TECHNICAL TEST PT. EIGEN TRI MATHEMA

# TECHNICAL TEST Meliputi Pembuatan API dan Test Algoritma

## Use Case APis

- Members can borrow books with conditions
  - [ ] Members may not borrow more than 2 books
  - [ ] Borrowed books are not borrowed by other members
  - [ ] Member is currently not being penalized
- Member returns the book with conditions
  - [ ] The returned book is a book that the member has borrowed
  - [ ] If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
- Check the book
  - [ ] Shows all existing books and quantities
  - [ ] Books that are being borrowed are not counted
- Member check
  - [ ] Shows all existing members
  - [ ] The number of books being borrowed by each member

# API

### Clone github.

```
git clone https://github.com/Syaiful-Maulana/TestBackend-EIGEN.git
```

### cp .env.example env yang di dalam folder library

```
cp .env.example .env
```

### run di folder library

```
npm run dev
```

### dokumentasi

```
http://localhost:3000/docs/
```

# ALGORITMA

Kerjakan dengan menggunakan bahasa pemograman yg anda kuasai, buat folder terpisah untuk soal ini

1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:

### run file di folder algoritma

```
node task1.js
```

```
node task2.js
```

```
node task3.js
```

```
node task4.js
```
