export const isActiveRoute = (location: string, pathName: string) => {
    return location?.includes(pathName);
}