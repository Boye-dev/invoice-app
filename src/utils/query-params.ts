export type IQueryParams = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | string[]
    | number[]
    | undefined;
};

export const queryParamsHelper = (queryParams?: IQueryParams): string => {
  const validParams: string[] = [];
  if (queryParams) {
    Object.entries(queryParams).map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => validParams.push(`${key}=${v}`));
      }
      return validParams.push(`${key}=${value}`);
    });
  }

  if (validParams.length === 0) {
    return "";
  }

  return `?${validParams.join("&")}`;
};
