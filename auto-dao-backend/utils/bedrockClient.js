const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const client = new BedrockRuntimeClient({ region: "us-east-1" });

const queryLLM = async (prompt, retries = 3, backoff = 1000) => {
  const body = {
    anthropic_version: "bedrock-2023-05-31", // 👈 REQUIRED for Claude 3
    messages: [{ role: "user", content: prompt }],
    max_tokens: 512,
    temperature: 0.7,
  };

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(body),
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await client.send(command);
      const responseBody = JSON.parse(Buffer.from(response.body).toString());
      return responseBody?.content || JSON.stringify(responseBody);
    } catch (err) {
      if (err.name === "ThrottlingException" && attempt < retries) {
        console.warn(`Throttled. Retrying in ${backoff}ms... (Attempt ${attempt})`);
        await delay(backoff);
        backoff *= 2;
      } else {
        console.error("Error from Bedrock:", err);
        throw err;
      }
    }
  }
};

module.exports = { queryLLM };
