# WeatherForecastApp
Aplikace zobrazuje předpověď teploty na následujících pět dnů podle aktuálního města
Město může uživatel vybrat buď pomocí inputu, nebo geolokace při spuštění aplikace, obnovení stránky nebo kliknutím na tlačítko "moje lokace",
kdy se vyhledá nejbližší město k aktuální uživatelově lokaci.
Teplotní předpověď během dne (24h) je rozdělena vždy po třech hodinách a data se načítají od aktuální denní doby,
kdy je aplikace spušťěna nebo je použito vyhledávání. 
Formát času se mění v závislosti na kultuře prohlížeče uživatele. Data teploty jsou vždy uvedeny ve stupních celsia.

Spuštění aplikace lze provést přes otevření souboru index.html v prohlížeči

Prohlížeče:

Popis vnitřní struktury
V aplikaci je použit objektový programovací přístup.
Adresář app s javascriptovými třídami je rozdělen na tři moduly, a to:
1. modul Autocomplete pro našeptávač
2. modul WeatherForecast pro předpověď počasí
3. modul helpers s pomocnými třídami

