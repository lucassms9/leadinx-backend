import { Request } from 'express';
import { Tenant, User } from '@prisma/client';

export interface RequestWithTenant extends Request {
  tenant: {
    id: string;
  };
  user: User;
}
