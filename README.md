# Peluquero Hermano - Barbershop Appointment Booking System

An elegant and modern web application for booking appointments at a barbershop. Built with **React** and designed with a sophisticated warm theme featuring cream, dusty rose, and golden brass accents.

## ✨ Key Features

### Modern and Elegant Interface
- Sophisticated warm color palette with gradients and visual effects
- Fully responsive and mobile-friendly design
- Smooth animations and fluid transitions
- Elegant typography with Georgia serif font

### 🎯 Intuitive 6-Step Booking Flow
1. **Select Service** - Choose from 6 different services
2. **Choose Barber** - Select your preferred barber
3. **Select Date & Time** - Interactive calendar + time slot selector
4. **Enter Details** - Complete your contact information
5. **Review Summary** - Verify all information before confirming
6. **Confirmation** - Receive unique booking code

### 💈 Available Services
- Classic Haircut (€18, 30 min)
- Haircut + Beard (€28, 50 min)
- Straight Razor Shave (€22, 40 min)
- Modern Fade (€20, 35 min)
- Hair Treatment (€35, 60 min)
- Gentleman's Package (€65, 90 min)

### 👨 Available Barbers
- Carlos Hermano - Specialist in Fades & Fade Cuts
- Miguel Ángel - Expert in Beard Grooming & Shaving
- Diego Ruiz - Master of Classic & Vintage Styles
- No Preference - Any available barber

## 🛠️ Technologies Used

- **React 19** - Modern UI framework
- **JavaScript ES6+** - Programming language
- **CSS-in-JS (inline styles)** - Dynamic styling
- **React Hooks** - useState for state management

## 📋 Prerequisites

- Node.js v14 or higher
- npm or yarn
- A terminal/CMD

## 🚀 Installation & Running

### 1. Navigate to project folder
```bash
cd "e:\JS projects\hairsalon"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

The application will automatically open at http://localhost:3000

### 4. Stop the server
Press `Ctrl+C` in the terminal

## 📦 Build for Production

```bash
npm run build
```

Generates an optimized version in the `build/` folder.

## 📁 Project Structure

```
hairsalon/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.js              # Main component (everything is here)
│   ├── App.css             # Minimal global styles
│   ├── index.js            # React entry point
│   ├── index.css           # Base styles
│   └── ...other files
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🎨 Color Palette

```
Color Theme: Warm Cream + Dusty Rose + Golden Brass

- Main Background: #ede8e0 (warm cream)
- Secondary Background: #f5f1ea (light cream)
- Cards: #faf8f5 (off-white)
- Primary Accent (Dusty Rose): #9d6b5c
- Light Accent: #b8907e
- Dark Accent: #6d4a41
- Golden Brass: #c9a661
- Light Golden: #ddb876
- Text: #5a4a38 (warm brown)
- Text Medium: rgba(90,74,56,0.75)
- Text Dim: rgba(90,74,56,0.55)
```

## 🔧 Main Components & Hooks

### Hook: `useCalendar`
Manages all calendar logic:
- Navigation between months
- Calculation of available days
- Current day detection
- Prevention of past dates

```javascript
const cal = useCalendar(date, setDate);
// cal.label, cal.cells, cal.changeMonth(), cal.isSel(), etc.
```

### Hook: `useToast`
Display temporary notifications to the user:

```javascript
const { msg, show, showToast } = useToast();
showToast("✅ Booking confirmed!");
```

### Main Component: `PeluqueroHermano`
- Manages 6 steps of the booking flow
- Validates data before advancing
- Generates unique confirmation code
- Handles all application state

## ✅ Validation & UX Features

- ✅ Required selection validation with toast notifications
- ✅ Form field validation (name, phone, email)
- ✅ Unique booking code generation (format: PH-XXXX)
- ✅ Smooth navigation between steps with auto-scroll
- ✅ Option to edit information before confirming
- ✅ Ability to create new reservation (complete reset)
- ✅ Visual indicator of completed steps
- ✅ Clearly marked occupied time slots

## 📊 Predefined Data

### Occupied Time Slots
- 09:00, 10:30, 12:00, 16:30, 18:00
- (Displayed with strikethrough in the UI)

### Available Time Slots
- 09:00 to 20:00 in 30-minute intervals
- Total: 18 time slots

### Available Dates
- All future dates from today onwards
- Interactive calendar with month navigation

## 🎯 How to Customize

### Change Services
Edit the `SERVICES` array in `src/App.js`:
```javascript
const SERVICES = [
  { icon: "💈", name: "My Service", price: 25, dur: "45 min" },
  // ...
];
```

### Change Barbers
Edit the `BARBERS` array in `src/App.js`:
```javascript
const BARBERS = [
  { emoji: "🧑‍🦱", name: "Barber Name", spec: "Specialty" },
  // ...
];
```

### Change Occupied Time Slots
Edit the `TIMES_OCCUPIED` Set in `src/App.js`:
```javascript
const TIMES_OCCUPIED = new Set(["09:00","10:30","12:00"]);
```

### Change Available Time Slots
Edit the `ALL_TIMES` array in `src/App.js`:
```javascript
const ALL_TIMES = ["09:00","09:30","10:00",...];
```

## 📝 Barbershop Information

**Peluquero Hermano**
- 📍 Calle Mayor 42, Madrid
- 📞 +34 91 000 00 00
- 🕐 Mon–Sat: 9:00 – 20:00

## ⚠️ Important Notes

1. **No Data Persistence**: Booking data is stored only in application memory. For production, you would need to connect a database.

2. **Static Time Slots**: Occupied time slots are predefined and do not update in real-time.

3. **Unique Codes**: Booking codes are generated randomly without uniqueness validation.

4. **Client-Side Validation**: All validation occurs in the browser. For production, add server-side validation.

## 🔄 Data Flow

```
User selects service
        ↓
User selects barber
        ↓
User selects date & time
        ↓
User enters contact details
        ↓
User reviews summary
        ↓
User confirms booking
        ↓
Confirmation code is generated
        ↓
Success screen is displayed
        ↓
User can create new reservation
```

## 🐛 Troubleshooting

### Application fails to start
```bash
# Delete node_modules and install again
rm -r node_modules
npm install
npm start
```

### Port 3000 is already in use
```bash
npm start -- --port 3001
```

### Styles are not applied
- Clear browser cache (Ctrl+Shift+Del)
- Reload the page (Ctrl+R)

## 📚 Useful Resources

- [React Documentation](https://react.dev/)
- [React Hooks](https://react.dev/reference/react/hooks)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📄 License

This project is open source under the MIT license.

## 👨‍💻 Future Development

Possible improvements:
- [ ] Connect to backend/database
- [ ] User authentication system
- [ ] Email/SMS notifications
- [ ] Admin dashboard
- [ ] Dynamic availability management
- [ ] Payment system
- [ ] User booking history
- [ ] Reservation cancellation
- [ ] Automatic reminders

---

**Thank you for using Peluquero Hermano!** ✂️
