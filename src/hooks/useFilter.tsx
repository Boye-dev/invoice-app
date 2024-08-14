// import { useDebouncedValue } from '@mantine/hooks';
// import React, { useEffect, useState } from 'react';
// import { IFilter } from '@/interfaces/helperInterface';

// interface IUseFilterProps<T> {
//   defaultParams: T;
// }
// const useFilter = <T,>({
//   defaultParams,
// }: IUseFilterProps<T>): {
//   filterValues: IFilter[];
//   setFilterValues: React.Dispatch<React.SetStateAction<IFilter[]>>;
//   params: T;
//   setParams: React.Dispatch<React.SetStateAction<T>>;
//   search: string;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
// } => {
//   const [params, setParams] = useState<T>(defaultParams);
//   const [filterValues, setFilterValues] = useState<IFilter[]>([]);
//   const [search, setSearch] = useState('');
//   const [debounced] = useDebouncedValue(search, 400);

//   useEffect(() => {
//     setParams((prevParams) => ({
//       ...prevParams,
//       search: debounced.length > 0 ? debounced : '',
//     }));
//   }, [debounced]);

//   useEffect(() => {
//     if (filterValues.length === 0) {
//       setParams(defaultParams);
//     } else {
//       setParams((prevParams) => {
//         let updatedParams = { ...prevParams };

//         filterValues.forEach((item) => {
//           updatedParams = {
//             ...updatedParams,
//             [item.key]: item.values,
//           };
//         });

//         return updatedParams;
//       });
//     }
//   }, [filterValues]);

//   return { filterValues, setFilterValues, params, setParams, search, setSearch };
// };

// export default useFilter;
