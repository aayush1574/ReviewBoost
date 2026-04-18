# ReviewBoost - AI-Powered Google Review Generator

## Problem Statement
Build a website where admin can list places (hotels, restaurants) and generate QR codes. When someone scans a QR code, they see AI-generated reviews for that place. Clicking a review copies it and redirects to the Google Business review page.

## Architecture
- **Backend**: FastAPI + MongoDB (Motor async)
- **Frontend**: React + Tailwind + Shadcn UI
- **Auth**: JWT + bcrypt admin authentication
- **AI Reviews**: MOCKED (template-based, ready for real AI API)

## User Personas
1. **Admin**: Manages places, views analytics, generates QR codes
2. **Customer**: Scans QR code, copies review, posts on Google

## Core Requirements
- Admin CRUD for places (hotels, restaurants)
- Auto QR code generation per place
- AI-generated review display on scan
- Copy-to-clipboard + Google redirect flow
- QR scan & copy analytics

## What's Been Implemented (April 2026)
- Full admin auth (JWT + bcrypt, admin seeding)
- Places CRUD with category (hotel/restaurant)
- Mock AI review generation (5 reviews per place, 4-5 star ratings)
- QR code generation (qrcode.react)
- Public review page (/r/:slug) with mobile-first design
- Copy review + auto-redirect to Google
- Analytics dashboard (scans, copies, top places)
- Neo-brutalist UI (Outfit + Work Sans fonts)

## Testing
- 18/18 backend tests passing
- All frontend flows verified (login, CRUD, QR, review page)

## Prioritized Backlog
### P0 (Critical)
- None remaining

### P1 (Important)
- Real AI integration (OpenAI/Gemini) for review generation
- Brute-force login protection

### P2 (Nice to have)
- Multi-admin support
- Place image upload
- Review customization (tone, length)
- Email notifications on milestones
- Bulk place import (CSV)
