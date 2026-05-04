# POS System - Build and Deployment Guide

## Quick Start

### For Web Development

```bash
npm install
npm run dev
```

Access the application at `http://localhost:3000`

### For Desktop Application (Electron)

```bash
npm install
npm run electron-dev
```

## Installation Steps

### 1. Install Node.js and Dependencies

```bash
# Check Node.js installation
node --version
npm --version

# Install all project dependencies
npm install
```

### 2. Build the Application

#### Option A: Web Version

```bash
npm run build
```

The build artifacts will be in the `build/` directory, ready to be deployed to any web server.

#### Option B: Standalone Desktop App

```bash
# Install Electron dependencies if not already installed
npm install electron electron-builder electron-is-dev --save-dev

# Build for your platform
npm run electron-build

# Or build and test locally
npm run electron-dev
```

## Build Outputs

### Web Build (`npm run build`)

- Location: `build/` directory
- Files: `index.html`, CSS, JavaScript bundles
- Deploy to: Web server, Netlify, Vercel, etc.

### Desktop Build (`npm run electron-build`)

- Location: `dist/` directory
- Windows: `.exe` installer and portable version
- macOS: `.dmg` and `.zip` files
- Linux: `.AppImage` and `.deb` files

## Platform-Specific Instructions

### Windows Build

```bash
npm run electron-build
# Creates in dist/:
#   - Bampadde Terraces POS Setup.exe (Installer)
#   - Bampadde Terraces POS.exe (Portable)
```

**Distribution:**

- Send the `.exe` file to users
- Users can run it directly (portable) or install it (installer)

### macOS Build

```bash
npm run dist
# Creates in dist/:
#   - Bampadde Terraces POS.dmg (Installer)
#   - Bampadde Terraces POS.zip (Direct)
```

### Linux Build

```bash
npm run electron-build
# Creates in dist/:
#   - Bampadde Terraces POS.AppImage
#   - bampadde-terraces-pos_0.1.0_amd64.deb
```

## Feature Walkthrough

### Reports & Export

1. Navigate to Reports & Analytics
2. Select date range (Today, Week, Month, Year)
3. Click "Export" button
4. PDF file downloads with all metrics and charts

### End of Day

1. Click "End Day Session" from admin dashboard
2. Review financial summary with colorful metric cards
3. Click "Download Report" to get PDF summary
4. Click "End Session" to complete the day

### Sales Management

1. View all transactions in Sales page
2. Filter by date, payment method, or order status
3. Click on any transaction to see order details
4. Export all sales as PDF

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules build dist
npm install
npm run build
```

### Electron Won't Start

```bash
# Make sure web build exists
npm run build

# Try development mode with debug output
npm run electron-dev
```

### Port Already in Use

```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration values.

## Deployment

### Deploy Web Version

```bash
# Build for production
npm run build

# Upload the build/ folder to your web server
# Examples:
# - Netlify: Drag and drop build/ folder
# - Vercel: Connect GitHub repo
# - Traditional server: FTP upload build/ contents
```

### Distribute Desktop Version

1. Build the application: `npm run electron-build`
2. Find installers in `dist/` folder
3. Create a release on GitHub or similar service
4. Share the `.exe`, `.dmg`, or `.AppImage` files with users
5. Users download and run the installer

## Performance Optimization

### For Web Version

- Gzip compression enabled in build
- CSS and JavaScript minified
- Images optimized
- Code splitting for faster loads

### For Desktop Version

- Electron automatically caches application files
- First run takes longer (downloads Electron)
- Subsequent launches are much faster

## Security Considerations

1. **API Communication**: Ensure HTTPS for production
2. **Data Storage**: User data stored locally in browser/app
3. **Credentials**: Store securely, never hardcode
4. **Updates**: Use electron-updater for automatic updates (can be added)

## Support & Maintenance

- Check logs in console during development
- Use browser DevTools (F12) in web version
- Use Electron DevTools in desktop version
- Monitor build size and optimize if needed

## Next Steps

1. Customize the app icon: Replace `assets/icon.png`
2. Update branding in components as needed
3. Test thoroughly on all target platforms
4. Set up auto-updates (optional, requires additional configuration)
5. Create installer branding/logo
