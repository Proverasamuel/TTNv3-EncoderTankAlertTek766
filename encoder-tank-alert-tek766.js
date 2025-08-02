/* Code for downlink encode from TTNv3 to Tekelek Tek 766*/
function encodeDownlink(input) {
  // Tenta encontrar 'param' e 'value' em todos os níveis possíveis
  const paths = [
    input,
    input?.data,
    input?.data?.data,
    input?.params,
    input?.payload,
    input?.raw_input?.data?.data
  ];

  for (let i = 0; i < paths.length; i++) {
    const obj = paths[i];
    const param = obj?.param;
    const value = obj?.value;

    if (typeof param === "string" && typeof value === "number") {
      // Encontrou o formato correto
      const PARAMETERS = {
        "tx_period": 0x0E,
        "active_mode": 0x0F,
        "battery_threshold": 0x10,
        "sensor_timeout": 0x11,
        "samples_per_tx": 0x12
      };

      const parameterId = PARAMETERS[param];

      if (parameterId === undefined) {
        return {
          errors: [`Parâmetro '${param}' não reconhecido.`]
        };
      }

      const commandType = 0x10;
      const valueMSB = (value >> 8) & 0xFF;
      const valueLSB = value & 0xFF;

      return {
        bytes: [commandType, parameterId, valueMSB, valueLSB],
        fPort: 49
      };
    }
  }

  // Se não encontrou, vamos construir uma mensagem de erro mais detalhada
  const debug = {
    receivedKeys: Object.keys(input || {}),
    sampleValues: JSON.stringify(input)
  };

  return {
    errors: ["Campos obrigatórios: 'param' (string), 'value' (number).", debug]
  };
}
