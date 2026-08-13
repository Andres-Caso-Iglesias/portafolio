// @ts-nocheck - Display-only code example
// Entidades TypeORM del proyecto Bolsa de Empleo - Mapeo relacional
// Patron: 1:1 herencia de perfiles (User -> AspirantProfile / CompanyProfile)

// import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

export enum UserRole {
  ASPIRANTE = 'aspirante',
  EMPRESA = 'empresa',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ASPIRANTE })
  role: UserRole;

  @OneToOne(() => AspirantProfile, profile => profile.user)
  aspirantProfile: AspirantProfile;

  @OneToOne(() => CompanyProfile, profile => profile.user)
  companyProfile: CompanyProfile;
}

@Entity('company_profiles')
export class CompanyProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  companyName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ unique: true })
  userId: number;

  @OneToOne(() => User, user => user.companyProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => JobOffer, offer => offer.company)
  offers: JobOffer[];
}

@Entity('job_offers')
export class JobOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', nullable: true })
  salary: number;

  @ManyToOne(() => CompanyProfile, company => company.offers)
  company: CompanyProfile;
}
