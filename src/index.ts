import 'reflect-metadata';
import jszip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

import { start } from "./server";

if (process.argv.length === 2) {
    start();
}
