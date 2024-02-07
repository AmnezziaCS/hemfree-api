#!/bin/bash

echo "Resetting the database..."

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Run the pg_reset.sql script on the database
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f scripts/sql/pg_reset.sql

echo "Database reset complete."