# Bampadde Terraces POS - Standalone Application Setup

This guide explains how to build and run the Bampadde Terraces POS system as a standalone desktop application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Windows (for .exe builder), macOS (for .dmg builder), or Linux (for AppImage/deb builder)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Electron dependencies:

```bash
npm install electron electron-builder electron-is-dev --save-dev
```

## Development

### Run Web Version

```bash
npm run dev
```

Opens the POS system in your browser at `http://localhost:3000`

### Run Desktop Version (Development)

```bash
npm run electron-dev
```

This will build the web app and launch it in an Electron window with developer tools.

## Building

### Build Web Files

```bash
npm run build
```

Creates optimized production build in the `build/` directory.

### Build Standalone Applications

#### Windows (.exe installer + portable)

```bash
npm run electron-build
```

Output files will be in `dist/` folder:

- `Bampadde Terraces POS Setup.exe` - Installer
- `Bampadde Terraces POS.exe` - Portable version

#### macOS (.dmg + .zip)

```bash
npm run dist
```

Output files will be in `dist/` folder

#### Linux (AppImage + .deb)

```bash
npm run electron-build
```

Output files will be in `dist/` folder

## Project Structure

```
.
├── src/                          # React source files
│   ├── components/              # React components
│   ├── utils/                   # Utility functions
│   └── App.tsx                  # Main app component
├── build/                       # Production build output
├── dist/                        # Electron build output
├── electron.js                  # Electron main process
├── preload.js                   # Electron preload script
├── electron-builder.json        # Electron builder config
├── package.json                 # Dependencies and scripts
└── vite.config.ts               # Vite configuration
```

## Features

### Reports & Analytics

- **Export Reports** - Click the "Export" button to download reports as PDF
- **Date Range Filtering** - Filter reports by Today, Week, Month, or Year
- **Visual Dashboards** - See sales trends, profit margins, and category breakdowns

### End of Day

- **End of Day Summary** - Complete financial summary with colorful metrics
- **Download Report** - Generate and download end-of-day PDF reports
- **Inventory Tracking** - See low stock and out-of-stock items

### Sales Management

- **Sales Transactions** - View and filter all completed transactions
- **Order Details** - Click on any transaction to see full order details
- **Export Sales** - Export all sales data as PDF

## Configuration

### Application Icon

Place your application icon (PNG format) at: `assets/icon.png`

### Signing & Certificates (Windows)

To sign your executable, update `electron-builder.json`:

```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "your-password"
}
```

## Troubleshooting

### "electron" is not recognized

Make sure electron is installed globally or use `npx electron`

### Port 3000 is already in use

Change the port in development or kill the process using port 3000

### Build fails with file not found

Make sure you run `npm run build` before building electron app

## Distribution

After building, distribute the installer files from the `dist/` folder:

- Windows users: Send `.exe` files
- macOS users: Send `.dmg` file
- Linux users: Send `.AppImage` or `.deb` file

## Support

For issues or feature requests, please contact the development team.

## License

This project is proprietary software for Bampadde Terraces.
