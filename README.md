# MediLens - Modern React Frontend

A sleek, modern React application for decoding prescriptions using AI. Features smooth animations, dark theme UI, and voice playback capabilities.

## 🎨 Features

- **Modern UI**: Dark theme with blue accents, glass-morphism effects, and smooth transitions
- **Smooth Animations**: Framer Motion animations throughout the app
- **Image Upload**: Drag-and-drop support for prescription images
- **AI Analysis**: Integrates with backend API to decode prescriptions
- **Voice Playback**: Text-to-speech with English and Hindi support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional UX**: Loading states, error handling, confidence scores, and editable OCR text

## 🛠️ Tech Stack

- **React 18** - UI framework
- **React Router** - Page navigation
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Axios** - HTTP client (optional)

## 📁 Project Structure

```
medi-lens-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── UploadBox.jsx      # Image upload component
│   │   ├── ResultCard.jsx     # Results display
│   │   └── VoiceButton.jsx    # Voice playback control
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   └── Analyze.jsx        # Analysis page
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── postcss.config.js          # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🔌 API Integration

The app expects a backend API at `http://localhost:5000` with an `/analyze` endpoint that accepts:

**Request:**
```
POST /analyze
Content-Type: multipart/form-data

image: <image file>
```

**Response:**
```json
{
  "medicine": "Medicine name",
  "dosage": "Dosage information",
  "purpose": "Why this medicine",
  "precautions": "Safety precautions",
  "fullExplanation": "Complete explanation",
  "confidence": 95,
  "ocr_text": "Extracted text from prescription"
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:
- Primary colors: `primary-*` (cyan/blue palette)
- Dark colors: `dark-*` (dark slate palette)

### Animations
Framer Motion animations are used throughout:
- Page transitions
- Component hover effects
- Loading indicators
- Result card reveals

### Voice Settings
In `VoiceButton.jsx`, customize:
- `utterance.rate` - Speech speed (0.5-2)
- `utterance.pitch` - Speech pitch (0.5-2)
- Language codes: `en-IN`, `hi-IN`, etc.

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_URL=http://localhost:5000
```

## 🐛 Common Issues

**Port already in use:**
```bash
npm run dev -- --port 3000
```

**Module not found:**
```bash
rm -rf node_modules
npm install
```

**Build fails:**
```bash
npm run build -- --force
```

## 📄 License

MIT License - feel free to use this project for your purposes.

---

Built with ❤️ for healthcare accessibility
