import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = join(dirname(__filename) + '../../../')

export const config = {
    PORT: process.env.PORT || 8080,
    dirname: __dirname,
}

export const PORT = 8080;