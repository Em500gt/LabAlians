import { SetMetadata } from "@nestjs/common";

export const CHECK_PERMISSIONS_KEY = 'check_permissions';
export const CheckPermissions = (...permisions: string[]) => SetMetadata(CHECK_PERMISSIONS_KEY, permisions)