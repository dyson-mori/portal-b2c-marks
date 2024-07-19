"use client"

import { Montserrat } from "next/font/google";

import { ThemeProvider } from "styled-components";

import { themes } from "@/global/theme";
import Global from "@/global/styles";

import Notification from "@/hooks/notification";
import CartProvider from '@/contexts/cart';

const font = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={font.variable}>
      <ThemeProvider theme={themes}>
          <body>
            <Notification>
              <CartProvider>
                {children}
              </CartProvider>
            </Notification>
          </body>
        <Global />
      </ThemeProvider>
    </html>
  );
}
