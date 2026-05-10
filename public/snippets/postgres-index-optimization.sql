-- Índices optimizados para alta concurrencia en tabla de ofertas de empleo
-- Índice compuesto para búsquedas frecuentes por ubicación y estado activo
CREATE INDEX idx_job_offers_location_active ON job_offers (location, is_active) WHERE is_active = true;

-- Índice para búsqueda full-text en título y descripción
CREATE INDEX idx_job_offers_search ON job_offers USING gin(to_tsvector('spanish', title || ' ' || description));

-- Índice para ordenación por fecha de creación (más recientes primero)
CREATE INDEX idx_job_offers_created_at ON job_offers (created_at DESC);

-- Índice para evitar duplicados en empresa + título (dependiendo de requisitos de negocio)
CREATE UNIQUE INDEX idx_job_offers_company_title_unique ON job_offers (company, title) WHERE is_active = true;