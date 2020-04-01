import fetch from "node-fetch";

global.FormData = class {};
global.fetch =  fetch;