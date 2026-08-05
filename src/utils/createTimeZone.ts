export const timeZones = Intl.supportedValuesOf("timeZone").filter(
  (tz) =>
    tz.startsWith("America/Sao_Paulo") ||
    tz.startsWith("America/Bahia") ||
    tz.startsWith("America/Recife") ||
    tz.startsWith("America/Fortaleza") ||
    tz.startsWith("America/Cuiaba") ||
    tz.startsWith("America/Porto_Velho") ||
    tz.startsWith("America/Manaus") ||
    tz.startsWith("America/Boa_Vista") ||
    tz.startsWith("America/Rio_Branco") ||
    tz.startsWith("America/Belem") ||
    tz.startsWith("America/Campo_Grande") ||
    tz.startsWith("America/Santarem") ||
    tz.startsWith("America/Araguaina") ||
    tz.startsWith("America/Maceio") ||
    tz.startsWith("America/Noronha") ||
    tz.startsWith("America/Atikokan") ||
    tz.startsWith("America/Blanc-Sablon") ||
    tz.startsWith("America/Cayenne") ||
    tz.startsWith("America/Paramaribo") ||
    tz.startsWith("America/Asuncion") ||
    tz.startsWith("America/Montevideo") ||
    tz.startsWith("America/Santiago") ||
    tz.startsWith("America/Buenos_Aires")
);
