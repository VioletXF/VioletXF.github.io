import { Link } from "gatsby";

export function LanguageSwitcher({translations = ["en", "ko"]}: {translations?: string[]}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const LangMap: Record<string, string> = {
    "en": "English",
    "ko": "한국어",
  };
  const pathWithoutLang = pathname.replace(/^\/.*?\//, ``);
  if(translations.length === 1) {
    return <></>;
  }
  return (
    <div>
      {translations.map((lang, index) => (<>
        <Link to={`/${lang}/${pathWithoutLang}`}
        activeStyle={{
          color: "var(--color-primary)",
          // bold if current language
          fontWeight: "bold",
          // pointer if not current language
          cursor: "default",
        }}>{LangMap[lang]}</Link>
        {index != translations.length-1 && <>&bull;</>}
      </>
      ))}
    </div>
  );
}
