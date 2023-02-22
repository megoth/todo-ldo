export function ensureSingleQueryParam(param: string | string[] | undefined): string | undefined {
    return Array.isArray(param) ? param[0] : param;
}