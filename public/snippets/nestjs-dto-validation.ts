/**
 * SHOWCASE: NestJS DTO Validation Schema
 * ================================
 * Conceptual type definitions for Portfolio showcase.
 * 
 * In a production NestJS project:
 * 1. npm install class-validator class-transformer
 * 2. Apply decorators to validate incoming data
 * 3. Use ValidationPipe in controller
 */

type ValidationRule = {
  message: string;
  // Additional rule options (e.g., { min: 5, max: 100 })
  [key: string]: unknown;
};

// ============================================================
// CreateJobOfferDto Schema
// ============================================================
/**
 * title: Required, string, 5-100 chars
 * - @IsNotEmpty()
 * - @IsString()
 * - @Length(5, 100)
 */
interface CreateJobOfferDto {
  title: string;
  description: string;
  company: string;
  contactEmail: string;
  contactPhone?: string;
  location: string;
  requirements?: string;
  benefits?: string;
}

// ============================================================
// UpdateJobOfferDto Schema
// ============================================================
/**
 * Partial of CreateJobOfferDto + isActive flag
 */
interface UpdateJobOfferDto extends Partial<CreateJobOfferDto> {
  isActive?: boolean;
}

// ============================================================
// NestJS Controller Usage
// ============================================================
/*
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateJobOfferDto) {
    return this.jobOffersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJobOfferDto) {
    return this.jobOffersService.update(id, dto);
  }
*/