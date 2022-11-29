import trace from "dd-trace";

trace.init({
  version: process.env.VERSION,
});
