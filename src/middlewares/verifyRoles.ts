import { NextFunction, Response } from 'express';
import { Roles, TPermission } from '../constants/Roles';
import { AppError } from '../utils/Errors/AppError';
import { verifyRoles } from '../utils/verifyRoles';

const verifyRolesMiddleware =
    (wantedPermissions: TPermission[]) =>
        (req: any, _res: Response, next: NextFunction) => {

            const userRoles: number[] | undefined = req.jwt.roles;
            if (!userRoles) {
                return next(
                    new AppError(
                        'NOT_AUTHORIZED',
                        'Veuillez vérifier que vous utilisez ce middleware après le middleware de validation du jeton JWT',
                        true,
                    ),
                );
            }

            for (const permission of wantedPermissions) {
                for (const roleId of userRoles) {
                    const rolePermissions = Roles[roleId];
                    if (!rolePermissions) {
                        return next(
                            new AppError(
                                'ROLE_NOT_FOUND',
                                `Le rôle avec l'ID ${roleId} n'a pas été trouvé.`,
                                true,
                            ),
                        );
                    }
                }
            }

            const res = verifyRoles(userRoles, wantedPermissions);

            if (!res) {
                return next(
                    new AppError(
                        'NOT_AUTHORIZED',
                        `Vous ne possedez pas toutes les permissions requises`,
                        true,
                    ),
                );
            }

            next();
        };

export { verifyRolesMiddleware };
