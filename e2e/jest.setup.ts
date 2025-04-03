const isContainer = process.env.DEVCONTAINER === 'true';

process.env.PGHOST = isContainer ? 'postgres_test' : 'localhost';
process.env.PGPORT = isContainer ? '5432' : '5433';
process.env.PGDATABASE = 'items_db';
process.env.PGUSER = 'postgres';
process.env.PGPASSWORD = 'postgres'; 

process.env.NODE_ENV = 'test';