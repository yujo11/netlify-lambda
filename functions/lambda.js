const fetch = require("node-fetch");
const urlencode = require("urlencode");
const ENDPOINT = "https://rms-api.dev.woowa.in/";

exports.handler = async (event) => {
  try {
    const { queryStringParameters } = event;
    const parameters = Object.entries(queryStringParameters)
      .map(([key, value]) => `${key}=${urlencode.encode(value)}`) // *** 인코딩 문제해결
      .join("&")
      .concat(`&key=${process.env.API_KEY}`);
    const URI = `${ENDPOINT}?${parameters}`;
    const response = await fetch(URI);
    const { statusCode, statusText, ok, headers } = response;
    const body = JSON.stringify(await response.json());

    headers["Access-Control-Allow-Origin"] = process.env.HOST; // *** 동일출처정책 문제해결
    return {
      statusCode,
      statusText,
      ok,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 404,
      statusText: error.message,
      ok: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
