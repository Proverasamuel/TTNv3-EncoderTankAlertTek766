function decodeDownlink(input) {
  const bytes = input.bytes;
  const port = input.fPort;

  const results = [];

  if (port >= 3 && port <= 223 && bytes.length >= 7) {
    const msgType = bytes[0];

    if (msgType !== 0x42) {
      return { data: { error: "Mensagem não reconhecida." } };
    }

    let index = 3; // começa onde os parâmetros aparecem (após 0x42 00 00)

    while (index + 5 < bytes.length) {
      const length = bytes[index];
      const paramId = (bytes[index + 1] << 8) | bytes[index + 2];
      const valueBytes = bytes.slice(index + 3, index + 3 + length);

      let value = '';
      switch (paramId) {
        case 0x0500:
          if (valueBytes.length === 4) {
            const seconds = valueBytes[0] + (valueBytes[1] << 8) + (valueBytes[2] << 16) + (valueBytes[3] << 24);
            value = `${seconds} segundos (${(seconds / 3600).toFixed(2)} horas)`;
          } else {
            value = "Tamanho inválido para TX Period.";
          }
          results.push({ parameterId: "TX Period (0x0500)", value });
          break;

        case 0x0503:
          if (valueBytes.length === 4) {
            const seconds = valueBytes[0] + (valueBytes[1] << 8) + (valueBytes[2] << 16) + (valueBytes[3] << 24);
            value = `${seconds} segundos (${(seconds / 60).toFixed(0)} minutos)`;
          } else {
            value = "Tamanho inválido para Logger Interval.";
          }
          results.push({ parameterId: "Logger Interval (0x0503)", value });
          break;

        default:
          results.push({
            parameterId: `Parâmetro não suportado: 0x${paramId.toString(16).padStart(4, '0')}`,
            value: `(${length} byte(s))`
          });
      }

      index += 3 + length; // próximo parâmetro
    }
  } else {
    return { data: { error: "Payload ou porta inválida." } };
  }

  return { data: results };
}
