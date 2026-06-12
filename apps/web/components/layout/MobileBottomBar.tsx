'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileBottomBar() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  const whatsappMessage = "Hi Adruva! I'd like to discuss a project.";
  const encodedText = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 w-full md:hidden border-t border-border/40 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] transition-all duration-300',
        'bg-background/90 backdrop-blur-lg dark:bg-black/90',
        'px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,16px))] flex items-center gap-3'
      )}
    >
      {/* WhatsApp Button - 40% Width */}
      {whatsappNumber && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-1 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-transform active:scale-95 text-white bg-[#25d366]',
            'shadow-[0_4px_14px_rgba(37,211,102,0.3)]'
          )}
          style={{ flexGrow: 4 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.382 9.802-9.77.001-2.61-1.01-5.063-2.848-6.903C16.388 2.094 13.937 1.08 11.332 1.08c-5.41 0-9.806 4.383-9.809 9.773-.001 1.7.458 3.361 1.328 4.814l-.993 3.626 3.712-.973zm11.233-7.514c-.307-.154-1.82-.9-2.102-1.002-.281-.102-.486-.154-.69.154-.205.308-.795 1.002-.973 1.205-.178.203-.356.228-.663.074-.307-.154-1.3-.478-2.476-1.527-.915-.817-1.533-1.826-1.713-2.133-.18-.308-.02-.475.134-.628.14-.137.307-.359.461-.539.154-.18.205-.308.307-.513.102-.205.051-.385-.026-.539-.077-.154-.69-1.666-.945-2.28-.248-.598-.5-.517-.69-.527-.179-.01-.385-.01-.59-.01-.205 0-.539.077-.82.385-.281.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.974 1.256 3.179.154.205 2.17 3.313 5.258 4.646.734.317 1.308.506 1.755.648.737.234 1.408.201 1.938.122.59-.088 1.82-.744 2.077-1.46.256-.718.256-1.333.179-1.46-.077-.128-.281-.205-.589-.359z" />
          </svg>
          WhatsApp
        </a>
      )}

      {/* Book Call Button - 60% Width */}
      <a
        href={calendlyUrl}
        target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
        rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={cn(
          'flex-1 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-transform active:scale-95 text-white bg-brand-orange hover:bg-brand-orange/90',
          'shadow-[0_4px_14px_rgba(255,107,0,0.3)]'
        )}
        style={{ flexGrow: 6 }}
      >
        <Calendar className="h-4 w-4" />
        Book a Free Call
      </a>
    </div>
  );
}

export default MobileBottomBar;
