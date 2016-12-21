-- DB name: inventory

-- Tables:
CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
    size_id INTEGER REFERENCES sizes(id) ON DELETE SET NULL
);