declare module '*.png' {
  const value: string;
  export default value;
}

// Заодно можна додати й інші розширення, щоб помилка не вилізала на них потім:
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.webp';