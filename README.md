# WeatherForecastApp
Aplikace zobrazuje předpověď teploty na následujících pět dnů podle aktuálního města.
Město může uživatel vybrat buď pomocí inputu, nebo geolokace při spuštění aplikace, obnovení stránky nebo kliknutím na tlačítko "moje lokace",
kdy se vyhledá nejbližší město k aktuální uživatelově lokaci.
Teplotní předpověď během dne (24h) je rozdělena vždy po třech hodinách a data se načítají od aktuální denní doby,
kdy je aplikace spušťěna nebo je použito vyhledávání. 
Formát času se mění v závislosti na kultuře prohlížeče uživatele. Data teploty jsou vždy uvedeny ve stupních celsia.

Spuštění aplikace lze provést přes otevření souboru index.html v prohlížeči

Aplikace podporuje nejnovější verze prohlížečů Chrome, Mozilla Firefox, Microsoft Edge, Opera aSafari

Popis vnitřní struktury
V aplikaci je použit objektový programovací přístup.
Adresář app s javascriptovými třídami je rozdělen na tři moduly, a to:

1. Modul Autocomplete pro našeptávač
    Modul slouží jako samostatná třída, kterou lze implementovat kamkoliv, kde je potřeba našeptávač. 
    V hlavní aplikaci stačí pak vytvořit potomka této třídy a upravit si potřebné funkce.

2. Modul WeatherForecast pro předpověď počasí
    Modul je hlavní třídou aplikace implemetující v sobě i třídu Autocomplete. Obsahuje v sobě metody pro zpracování vstupního řetězce a pro vyhodnocení předpovědi v podobě tabulky. 
    Obsahuje metody pro geolokaci, která se automaticky spouští při natčtení stránky nebo při klknutí na tlačítko "moje lokace". Obsahuje i funkci pro vygenerování náhodného města, ale není využita.

3. Modul helpers s pomocnými třídami
    Modul obsahuje třídy se statickými pomocnými funkcemi pro práci s časem, řetězci a asynchronními operacemi.
