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
    console.log('TenantMiddleware: Iniciando middleware');
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        console.log('TenantMiddleware: Token encontrado');
        const decoded = this.jwtService.verify(token);
        console.log('TenantMiddleware: Token decodificado', decoded);

        if (decoded.tenantId) {
          console.log('TenantMiddleware: Buscando tenant', decoded.tenantId);
          const tenant = await this.prisma.tenant.findUnique({
            where: { id: decoded.tenantId },
          });

          if (tenant) {
            console.log('TenantMiddleware: Tenant encontrado', tenant.id);
            req.tenant = tenant;
          } else {
            console.log('TenantMiddleware: Tenant não encontrado');
          }
        } else {
          console.log('TenantMiddleware: Token não contém tenantId');
        }
      } catch (error) {
        console.log('TenantMiddleware: Erro ao verificar token', error);
        // Token inválido, mas não vamos bloquear a requisição aqui
      }
    } else {
      console.log('TenantMiddleware: Token não encontrado no header');
    }
    next();
  }
}
