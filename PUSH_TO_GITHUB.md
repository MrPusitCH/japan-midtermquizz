# 🚀 Push to GitHub Guide

## วิธี Push โปรเจคไปที่ GitHub

### ขั้นตอนที่ 1: เปิด Terminal/Command Prompt

### ขั้นตอนที่ 2: รันคำสั่งทีละบรรทัด

```bash
# 1. Initialize Git (ถ้ายังไม่ได้ทำ)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Japanese Learning Game with BGM and optimized performance"

# 4. Add remote repository
git remote add origin https://github.com/MrPusitCH/japan-midtermquizz.git

# 5. Push to GitHub
git push -u origin main
```

### ถ้า Push ไม่ได้ (มี error)

ลองคำสั่งนี้แทน:

```bash
# ถ้า branch ชื่อ master แทน main
git branch -M main
git push -u origin main --force
```

### ถ้ามี error "remote origin already exists"

```bash
# ลบ remote เก่า
git remote remove origin

# เพิ่มใหม่
git remote add origin https://github.com/MrPusitCH/japan-midtermquizz.git

# Push
git push -u origin main
```

---

## 🔐 ถ้าถาม Username/Password

GitHub ไม่รองรับ password แล้ว ต้องใช้ **Personal Access Token**

### สร้าง Token:
1. ไปที่ https://github.com/settings/tokens
2. คลิก "Generate new token (classic)"
3. เลือก scope: `repo` (ทั้งหมด)
4. คลิก "Generate token"
5. **Copy token ไว้** (จะไม่เห็นอีก!)

### ใช้ Token:
- Username: `MrPusitCH`
- Password: `<paste your token here>`

---

## ✅ หลังจาก Push สำเร็จ

ไปดูที่: https://github.com/MrPusitCH/japan-midtermquizz

---

## 🎯 Quick Commands (Copy & Paste)

```bash
git init
git add .
git commit -m "Add Japanese Learning Game with music and optimization"
git branch -M main
git remote add origin https://github.com/MrPusitCH/japan-midtermquizz.git
git push -u origin main
```

---

## 📝 Update ครั้งต่อไป

หลังจาก push ครั้งแรกแล้ว ครั้งต่อไปใช้:

```bash
git add .
git commit -m "Update: your message here"
git push
```

---

Good luck! 🎌✨
