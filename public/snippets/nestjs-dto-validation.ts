import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateJobOfferDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString()
  @Length(5, 100, { message: 'El título debe tener entre 5 y 100 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  @Length(20, 2000, { message: 'La descripción debe tener entre 20 y 2000 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'La empresa es obligatoria' })
  @IsString()
  @Length(2, 100, { message: 'El nombre de la empresa debe tener entre 2 y 100 caracteres' })
  company: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  contactEmail: string;

  @Matches(/^\+?[\d\s\-\(\)]{10,20}$/, { message: 'Formato de teléfono no válido' })
  contactPhone?: string;

  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  @IsString()
  location: string;

  @IsString()
  @Length(0, 500, { message: 'Los requisitos no pueden superar los 500 caracteres' })
  requirements?: string;

  @IsString()
  @Length(0, 500, { message: 'Los beneficios no pueden superar los 500 caracteres' })
  benefits?: string;
}

export class UpdateJobOfferDto extends PartialType(CreateJobOfferDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}