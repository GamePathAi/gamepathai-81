
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languageFlags = {
  'en-US': '🇺🇸',
  'es-ES': '🇪🇸',
  'pt-BR': '🇧🇷',
  'fr-FR': '🇫🇷',
  'de-DE': '🇩🇪',
  'ru-RU': '🇷🇺',
  'ja-JP': '🇯🇵',
  'ko-KR': '🇰🇷',
  'zh-CN': '🇨🇳',
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('i18nextLng') || 'en-US'
  );

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem('i18nextLng', currentLanguage);
  }, [currentLanguage, i18n]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {languageFlags[currentLanguage as keyof typeof languageFlags] || '🌐'} <Languages className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(languageFlags).map(([langCode, flag]) => (
          <DropdownMenuItem 
            key={langCode} 
            onClick={() => setCurrentLanguage(langCode)}
          >
            {flag} {langCode}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
