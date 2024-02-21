#!/bin/bash

echo "Resetting the database..."

# Load environment variables from .env file
source ../.env

# Run the pg_reset.sql script on the database

PGPASSWORD=$DATABASE_PASSWORD psql -h "$DATABASE_HOST" -p "$DATABASE_PORT" -U "$DATABASE_USER" -d "$DATABASE_NAME" -f ./sql/pg_reset.sql

echo "Database reset complete."