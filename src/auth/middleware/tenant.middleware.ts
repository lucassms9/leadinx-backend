import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestWithTenant } from '../interfaces/request.interface';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async use(req: RequestWithTenant, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        if (decoded.tenantId) {
          const tenant = await this.prisma.tenant.findUnique({
            where: { id: decoded.tenantId },
          });
          if (tenant) {
            req.tenant = tenant;
          }
        }
      } catch (error) {
        // Token inválido, mas não vamos bloquear a requisição aqui
      }
    }
    next();
  }
}
