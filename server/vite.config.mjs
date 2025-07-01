import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const env = dotenv.config({ path: path.resolve(__dirname, '.env.test') });
dotenvExpand.expand(env);

export default defineConfig({
    plugins: [
        tsconfigPaths(),
    ],
    test: {
        environment: 'node',
    },
});