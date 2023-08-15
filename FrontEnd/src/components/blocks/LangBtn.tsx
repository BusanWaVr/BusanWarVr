import { useEffect, useState } from "react"
import i18n from "../../utils/locale"
import { useI18n } from "../../hooks/useI18n"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";


const storedLang = localStorage.getItem("wantedLanguage") || "KO"

const LangeBtn = () => {
    const t = useI18n();
  const [lang, setLang] = useState(storedLang)

  useEffect(() => {
    localStorage.setItem("wantedLanguage", lang)
  }, [lang])

const handleLanguageChange = (lang) => {
    setLang(lang);
    localStorage.setItem('wanted.language', lang);
    i18n.changeLanguage(lang.toLowerCase())
  };

  return (
    // <button type="button" onClick={handleLangClick} className={styles.languageBtn}>
    //   {lang}
    // </button>
    <div>

    <Dropdown>
                <DropdownTrigger>
                <p className="font-semibold text-sm">{t(`다국어 지원`)}</p>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="EN" color="primary" onClick={() => handleLanguageChange('EN')}>
                  English
                  </DropdownItem>
                  <DropdownItem key="ZH" color="primary" onClick={() => handleLanguageChange('ZH')}>
                  中文
                  </DropdownItem>
                  <DropdownItem key="JA" color="primary" onClick={() => handleLanguageChange('JA')}>
                  日本語
                  </DropdownItem>
                  <DropdownItem key="KO" color="primary" onClick={() => handleLanguageChange('KO')}>
                  한국어
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
    </div>

    
    




  )
}

export default LangeBtn  