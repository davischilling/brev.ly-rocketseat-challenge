import { env } from '@/env';
import type { Config } from 'drizzle-kit';

export default {
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    dialect: 'postgresql',
    schema: 'src/infra/postgresDb/schemas/*',
    out: 'src/infra/postgresDb/migrations',
} satisfies Config;