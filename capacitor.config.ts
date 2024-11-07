import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MantenimientosApp',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
