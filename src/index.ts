import 'reflect-metadata';

import { start } from "./server";

if (process.argv.length === 2) {
    start();
}