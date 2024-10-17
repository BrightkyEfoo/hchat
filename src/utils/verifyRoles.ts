import { Roles, TPermission } from '../constants/Roles';

const verifyRoles = (userRoles: number [], roles: TPermission[]): boolean => {
    const URoles = userRoles.map(r => {
        if (Roles[r]) return Roles[r];
    }).flatMap(el => el).map(role => {
        if (!role) return [] as any[];
        const obj = role.obj;
        return role.permissions.map(p => {
            return { obj, permission: p };
        });
    }).flatMap(el => el);

    const wRoles = roles.map(role => {
        const obj = role.obj;
        return role.permissions.map(p => {
            return { obj, permission: p };
        });
    }).flatMap(el => el);

    return wRoles.every(r => URoles.find(uRole => uRole.obj === r.obj && uRole.permission === r.permission));
};

export { verifyRoles };