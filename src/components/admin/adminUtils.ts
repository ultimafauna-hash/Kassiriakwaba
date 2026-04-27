import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const safeFormatDateAdmin = (dateStr: any, formatStr: string = 'dd MMM yyyy') => {
  try {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '--';
    return format(date, formatStr, { locale: fr });
  } catch {
    return '--';
  }
};

export const playNotificationSound = (type: 'info' | 'urgent' | 'message' | 'payment' = 'info') => {
  const soundUrls = {
    info: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    urgent: 'https://www.soundjay.com/buttons/sounds/button-10.mp3',
    message: 'https://www.soundjay.com/communication/sounds/pda-text-1.mp3',
    payment: 'https://www.soundjay.com/misc/sounds/cash-register-05.mp3'
  };
  const audio = new Audio(soundUrls[type] || soundUrls.info);
  audio.volume = 0.3;
  audio.play().catch(e => console.warn("Audio play blocked by browser:", e));
};
