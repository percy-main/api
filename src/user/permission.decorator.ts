import { SetMetadata } from "@nestjs/common";

export const PERMISSION = Symbol("PERMISSION");

export const Permission = (permission: string) =>
  SetMetadata(PERMISSION, permission);
