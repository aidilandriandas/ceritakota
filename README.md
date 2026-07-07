# Digital Indonesia - Dashboard Admin & Backend

Proyek ini merupakan aplikasi dashboard admin modern untuk mengelola konten "Digital Indonesia" yang mencakup data kota, sejarah, wisata, budaya, kuliner, dan teknologi di seluruh Indonesia. Aplikasi ini dibangun dengan **Laravel (Backend API)** dan **Next.js + TypeScript (Frontend)**.

---

## 🚀 Fitur Utama

### Frontend (Next.js)
- ✨ **Dashboard Admin Modern** dengan animasi smooth (Framer Motion)
- 📊 **Visualisasi Data**: Statistik kota, distribusi konten per kategori
- 🏙️ **Manajemen Kota**: CRUD lengkap untuk data kota
- 📝 **Manajemen Kategori**: Kelola konten Sejarah, Wisata, Budaya, Kuliner, Teknologi
- 🌓 **Dark/Light Mode**: Toggle tema yang responsif
- 📱 **Fully Responsive**: Optimal untuk desktop, tablet, dan mobile
- 🔔 **Notifikasi Real-time**: Dropdown notifikasi interaktif
- 🔍 **Pencarian Cepat**: Search bar untuk navigasi cepat
- 🔐 **Halaman Login**: Authentication page dengan desain modern

### Backend (Laravel)
- 🔐 **API RESTful**: Endpoints lengkap untuk Cities dan Category Items
- 🗄️ **Database SQLite/MySQL**: Struktur data teroptimasi dengan relasi
- 🛡️ **Validasi Data**: Input validation yang ketat
- 🔑 **Authentication Ready**: Siap diintegrasikan dengan Sanctum/JWT
- 📦 **Eloquent ORM**: Manajemen database yang elegan

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks

### Backend
- **Framework**: Laravel 10/11
- **Database**: SQLite (default) atau MySQL 8.0+
- **API**: RESTful API
- **ORM**: Eloquent
- **Validation**: Laravel Request Validation

---

## 📋 Prasyarat

Pastikan Anda telah menginstall:
- **Node.js** (v18 atau lebih baru)
- **PHP** (v8.1 atau lebih baru)
- **Composer** (untuk Laravel)
- **Git**

---

## 🔧 Instalasi & Konfigurasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Setup Backend (Laravel)

#### a. Masuk ke folder backend
```bash
cd backend
```

#### b. Install dependencies
```bash
composer install
```

#### c. Salin file environment
File `.env` sudah tersedia di folder backend. Jika belum ada:
```bash
cp .env.example .env
```

#### d. Generate application key
```bash
php artisan key:generate
```

#### e. Konfigurasi Database
**Opsi 1: SQLite (Recommended untuk Development)**
Default sudah dikonfigurasi menggunakan SQLite. Pastikan file `database/database.sqlite` ada:
```bash
touch database/database.sqlite
```

**Opsi 2: MySQL**
Edit file `.env` jika ingin menggunakan MySQL:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=digital_indonesia
DB_USERNAME=root
DB_PASSWORD=your_password
```

Jika menggunakan MySQL, buat database terlebih dahulu:
```bash
mysql -u root -p
CREATE DATABASE digital_indonesia;
exit;
```

#### f. Jalankan migrasi dan seeder
```bash
php artisan migrate:fresh --seed
```

Ini akan membuat:
- Tabel database yang diperlukan
- Data dummy kota dan kategori

#### g. Jalankan server Laravel
```bash
php artisan serve
```
Server akan berjalan di `http://localhost:8000`

---

### 3. Setup Frontend (Next.js)

#### a. Kembali ke root folder project
```bash
cd ..
# atau
cd /path/to/project
```

#### b. Install dependencies
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

#### c. Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

File `.env` sudah berisi konfigurasi default:
```env
NEXT_PUBLIC_APP_NAME="Digital Indonesia"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:8000/api"
NODE_ENV=development
```

#### d. Jalankan development server
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Frontend akan berjalan di `http://localhost:3000`

---

## 🔐 Login & Akses Dashboard

### Akses Dashboard Admin
Setelah kedua server (backend dan frontend) berjalan:

1. Buka browser dan akses `http://localhost:3000/admin/login`
2. Gunakan kredensial berikut untuk login:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@ceritakota.id` | `admin123` |
| **Demo User** | `user@ceritakota.id` | `user123` |

3. Setelah login, Anda akan diarahkan ke dashboard admin di `http://localhost:3000/admin`

### Fitur Dashboard
- **Statistik**: Lihat total kota, konten, dan distribusi kategori
- **Tabel Kota**: Daftar semua kota dengan jumlah konten
- **Navigasi Sidebar**: Menu Dashboard, Kelola Kota, Kategori, Pengaturan
- **Header**: Search, notifikasi, dark mode toggle, dan user profile

---

## 📡 API Endpoints

Base URL: `http://localhost:8000/api`

### Cities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cities` | Get all cities |
| POST | `/cities` | Create new city |
| GET | `/cities/{id}` | Get city by ID |
| PUT/PATCH | `/cities/{id}` | Update city |
| DELETE | `/cities/{id}` | Delete city |

### Category Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/category-items` | Get all category items |
| POST | `/category-items` | Create new item |
| GET | `/category-items/{id}` | Get item by ID |
| PUT/PATCH | `/category-items/{id}` | Update item |
| DELETE | `/category-items/{id}` | Delete item |

---

## 🧪 Testing API

### Get All Cities
```bash
curl http://localhost:8000/api/cities
```

### Create City
```bash
curl -X POST http://localhost:8000/api/cities \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "bandung",
    "name": "Bandung",
    "province": "Jawa Barat",
    "geo_name": "Bandung",
    "tagline": "Kota Kembang",
    "description": "Deskripsi Bandung",
    "coordinates": "[107.6191,-6.9175]"
  }'
```

### Get City by ID
```bash
curl http://localhost:8000/api/cities/1
```

---

## 📁 Struktur Folder

```
project-root/
├── backend/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   ├── Models/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── .env
│   └── ...
├── src/                     # Next.js Frontend
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── DashboardContent.tsx
│   │   ├── kota/
│   │   ├── provinsi/
│   │   └── page.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminHeader.tsx
│   │   ├── map/
│   │   └── ui/
│   └── ...
├── .env                     # Frontend environment
├── .env.example             # Frontend environment example
├── package.json
├── README.md
└── ...
```

---

## 🎨 Customization

### Mengubah Warna Brand
Warna brand default adalah `#C15B3D` (primary) dan `#A43820` (secondary). Untuk mengubahnya, edit di:
- Frontend: `tailwind.config.ts` atau langsung di komponen dengan class `from-[#C15B3D]`
- Backend: Tidak ada pengaruh karena API-only

### Menambah Kategori Baru
1. Backend: Tambahkan tipe baru di migration `category_items` table
2. Frontend: Update konstanta kategori di komponen yang relevan

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Access denied for user**
- Pastikan kredensial database di `.env` benar
- Jika menggunakan SQLite, pastikan `DB_CONNECTION=sqlite` dan file `database/database.sqlite` ada

**Error: Class not found**
```bash
composer dump-autoload
```

**Migration issues**
```bash
php artisan migrate:fresh --seed
```

### Frontend Issues

**Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API connection error**
- Pastikan backend berjalan di `http://localhost:8000`
- Cek `NEXT_PUBLIC_API_URL` di file `.env`

**Build error**
```bash
npm run build
# Lihat error message dan perbaiki sesuai petunjuk
```

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👥 Contributors

Digital Indonesia Team - 2024

---

## 🏆 Tips untuk Lomba

1. **UI/UX**: Dashboard sudah dilengkapi dengan animasi smooth dan desain modern
2. **Responsiveness**: Test di berbagai ukuran layar (mobile, tablet, desktop)
3. **Performance**: Optimized dengan lazy loading dan efficient state management
4. **Documentation**: README ini sudah lengkap dengan instalasi dan troubleshooting
5. **Demo Data**: Seeder sudah menyediakan data dummy untuk demonstrasi

Selamat berlomba! 🎉
