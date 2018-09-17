import { promisify } from "es6-promisify";
const Remark = require("remark");
const RemarkHTML = require("remark-html");
const RemarkMath = require("remark-math");
const RemarkHTMLKatex = require("remark-html-katex");
const RemarkHighlightJs = require("remark-highlight.js");
export default promisify(
  Remark()
    .use(RemarkMath)
    .use(RemarkHTMLKatex)
    .use(RemarkHighlightJs)
    .use(RemarkHTML).process
) as (_: string) => Promise<string>;