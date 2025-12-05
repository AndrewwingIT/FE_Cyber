// Tenant Model - Mapped from Swagger Schema
export interface Tenant {
  tenantId: number;
  companyName: string;
  domain: string;
  contactPhone?: string;
  address?: string;
  createdAt: string;
  status: string;
}

export interface TenantCreateDto {
  companyName: string;
  domain: string;
  contactPhone?: string;
  address?: string;
}

export interface TenantUpdateDto {
  companyName?: string;
  domain?: string;
  contactPhone?: string;
  address?: string;
  status?: string;
}
