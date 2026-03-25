# 🎾 Padel Scorer — Match Tracker for Friends

A clean and lightweight mobile app built with **React Native & Expo** for tracking padel matches in real time. Designed for casual players who want a simple way to score and remember their games — no accounts, no internet required, just padel.

---

## Features

- 🏓 **Real padel scoring rules** — 15 / 30 / 40 / Deuce / Advantage / Tiebreak
- ⚙️ **Customizable match setup** — Best of 3 or 5 sets, 1 / 3 / 5 games per set
- ↩️ **Undo last point** — no more accidental taps ruining your score
- 🏆 **Match summary** — winner announcement with final set scores
- 📋 **Match history** — saved locally on your device
- 🗑️ **Clear history** — reset all past matches anytime
- 🌙 **Dark themed UI** — built for outdoor readability

---

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) & [Expo Router](https://expo.github.io/router/docs/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — local data persistence
- TypeScript

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [Expo Go](https://expo.dev/client) app on your phone (iOS or Android)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/padel-scorer.git
cd padel-scorer
```

2. **Install dependencies**

```bash
npm install
```

3. **Install AsyncStorage**

```bash
npx expo install @react-native-async-storage/async-storage
```

4. **Start the development server**

```bash
npx expo start
```

5. **Run on your phone**

   - Open the **Expo Go** app on your phone
   - Scan the QR code shown in the terminal
   - Make sure your phone and PC are on the same WiFi

---

## How to Play

1. Open the app and tap **+ New Match**
2. Enter team or player names
3. Select your match format:
   - **Best of 3** or **Best of 5** sets
   - **1, 3, or 5** games per set
4. Tap the **team card** to add a point
5. Use **↩ Undo** if you tap by mistake
6. Match ends automatically — winner is announced on the summary screen
7. All matches are saved to history on the home screen

---

## Building an APK (Android)

To share the app with friends without the App Store:

1. Install EAS CLI

```bash
npm install -g eas-cli
```

2. Login to your Expo account

```bash
eas login
```

3. Configure the build

```bash
eas build:configure
```

4. Build the APK

```bash
eas build -p android --profile preview
```

5. Download the APK from the link provided and share it via WhatsApp or any messenger. Friends will need to allow **"Install from unknown sources"** on their Android device.

---

## Project Structure

```
padel-scorer/
├── app/
│   ├── _layout.tsx      # Root navigation layout
│   ├── index.tsx        # Home screen — match history
│   ├── setup.tsx        # Match setup screen
│   ├── score.tsx        # Live scoring screen
│   └── summary.tsx      # Match summary screen
├── package.json
├── eas.json
└── README.md
```

---

## Contributing

This app was built for personal use with friends, but feel free to fork it, improve it, and make it your own. Pull requests are welcome!

---

## License

MIT — free to use and modify.

---

> Built with ❤️ for padel players who just want to keep score.
