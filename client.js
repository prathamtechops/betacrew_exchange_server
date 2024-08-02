const net = require("net");
const fs = require("fs");

// Configuration
const HOST = "localhost";
const PORT = 3000;

// Helper function to create payload
function createPayload(callType, resendSeq) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt8(callType, 0);
  if (callType === 2) {
    buffer.writeUInt8(resendSeq, 1);
  }
  return buffer;
}

function handleData(data, packets) {
  let offset = 0;
  while (offset < data.length) {
    const symbol = data.toString("ascii", offset, offset + 4).trim();
    const buySellIndicator = data.toString("ascii", offset + 4, offset + 5);
    const quantity = data.readInt32BE(offset + 5);
    const price = data.readInt32BE(offset + 9);
    const packetSequence = data.readInt32BE(offset + 13);

    packets[packetSequence] = {
      symbol,
      buySellIndicator,
      quantity,
      price,
      packetSequence,
    };

    offset += 17;
  }
}

// Main function
function main() {
  const packets = {};
  const client = new net.Socket();

  client.connect(PORT, HOST, () => {
    console.log("Connected to server");
    client.write(createPayload(1));
  });

  client.on("data", (data) => {
    handleData(data, packets);
  });

  client.on("end", () => {
    console.log("Disconnected from server");

    const sortedPackets = Object.values(packets).sort(
      (a, b) => a.packetSequence - b.packetSequence
    );
    fs.writeFileSync("output.json", JSON.stringify(sortedPackets, null, 2));
    console.log("Data saved to output.json");
  });

  client.on("error", (err) => {
    console.error("Error:", err.message);
  });
}

main();
