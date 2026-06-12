'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingWhatsAppProps {
  message?: string;
}

export function FloatingWhatsApp({
  message = "Hi Adruva! I'd like to discuss a project."
}: FloatingWhatsAppProps) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  if (!phoneNumber) {
    return null; // Don't render if phone number is not configured
  }

  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wa-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        .whatsapp-btn-pulse {
          animation: wa-pulse 2s infinite;
        }
      `}} />
      <div className="fixed z-50 hidden md:flex items-center gap-3 bottom-8 right-8 group">
        {/* Tooltip text */}
        <div className="opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-[#0b1f3a] dark:bg-white text-white dark:text-[#0b1f3a] text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg border border-white/10 dark:border-black/5 whitespace-nowrap font-inter">
          Chat with us! 💬
        </div>
        
        {/* Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'h-14 w-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-white whatsapp-btn-pulse bg-[#25d366]',
            'focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2'
          )}
          aria-label="Contact us on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.382 9.802-9.77.001-2.61-1.01-5.063-2.848-6.903C16.388 2.094 13.937 1.08 11.332 1.08c-5.41 0-9.806 4.383-9.809 9.773-.001 1.7.458 3.361 1.328 4.814l-.993 3.626 3.712-.973zm11.233-7.514c-.307-.154-1.82-.9-2.102-1.002-.281-.102-.486-.154-.69.154-.205.308-.795 1.002-.973 1.205-.178.203-.356.228-.663.074-.307-.154-1.3-.478-2.476-1.527-.915-.817-1.533-1.826-1.713-2.133-.18-.308-.02-.475.134-.628.14-.137.307-.359.461-.539.154-.18.205-.308.307-.513.102-.205.051-.385-.026-.539-.077-.154-.69-1.666-.945-2.28-.248-.598-.5-.517-.69-.527-.179-.01-.385-.01-.59-.01-.205 0-.539.077-.82.385-.281.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.974 1.256 3.179.154.205 2.17 3.313 5.258 4.646.734.317 1.308.506 1.755.648.737.234 1.408.201 1.938.122.59-.088 1.82-.744 2.077-1.46.256-.718.256-1.333.179-1.46-.077-.128-.281-.205-.589-.359z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default FloatingWhatsApp;
