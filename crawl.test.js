const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/">
        Boot.dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
        Boot.dev Blog Relative Path
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path1/">
        Boot.dev Blog Path 1
      </a>
      <a href="/path2/">
        Boot.dev Blog Path 2
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">
        Invalid URL
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});