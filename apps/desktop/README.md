# APP ALBA Desktop

Aplicación Electron para coordinar la interfaz gráfica y los bridges locales de APP ALBA.

```powershell
cd C:\Users\rolando\Downloads\APP-ALBA
npm install
npm run dev
```

El renderer React sólo accede a funciones locales mediante el contrato tipado de `preload`.
