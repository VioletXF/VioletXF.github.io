export default function getLang(){
    // get the language from the URL
    const lang = window.location.pathname.split('/')[1]
    // if the language is not available, use the default language
    return lang || 'en'
}