
// Модель для доступных временных слотов

export interface TimeSlot {
  id: number;
  stylistId: number;
  date: string; // формат: YYYY-MM-DD
  time: string; // формат: HH:MM
  duration: number; // в минутах
  available: boolean;
}

// Функция генерации слотов на неделю для всех мастеров
export function generateTimeSlotsForWeek(startDate: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let slotId = 1;
  
  // Генерация для 5 мастеров
  for (let stylistId = 1; stylistId <= 5; stylistId++) {
    // Генерация на 7 дней вперед
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);
      
      // Пропускаем выходной (воскресенье)
      if (currentDate.getDay() === 0) continue;
      
      // Форматируем дату в YYYY-MM-DD
      const dateString = currentDate.toISOString().split('T')[0];
      
      // Рабочие часы с 9:00 до 21:00 с интервалом 30 минут
      for (let hour = 9; hour < 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          // Форматируем время в HH:MM
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          // Случайная доступность (для демонстрации)
          const available = Math.random() > 0.3;
          
          // Создание слота
          slots.push({
            id: slotId++,
            stylistId,
            date: dateString,
            time: timeString,
            duration: 30,
            available
          });
        }
      }
    }
  }
  
  return slots;
}

// Создаем слоты на текущую неделю
const today = new Date();
export const timeSlots = generateTimeSlotsForWeek(today);

// Получить доступные слоты для конкретного мастера на конкретную дату
export function getAvailableSlotsForStylist(stylistId: number, date: string): TimeSlot[] {
  return timeSlots.filter(slot => 
    slot.stylistId === stylistId && 
    slot.date === date && 
    slot.available
  );
}

// Получить все доступные даты
export function getAvailableDates(): string[] {
  const uniqueDates = new Set<string>();
  timeSlots.forEach(slot => {
    if (slot.available) {
      uniqueDates.add(slot.date);
    }
  });
  return Array.from(uniqueDates).sort();
}
