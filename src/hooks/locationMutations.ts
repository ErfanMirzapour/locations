import { useMutation, useQueryClient } from 'react-query';

import { Location } from 'types';

type UpdateMutation = 'CREATE' | 'UPDATE';
interface UpdateVariables {
   userId?: number;
   location: Omit<Location, 'id'>;
}
interface DeleteVariables {
   userId: number;
}

export const useLocationMutation = (mutationType: UpdateMutation) => {
   const queryClient = useQueryClient();
   const fetchOptions = {
      method: mutationType === 'CREATE' ? 'POST' : 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
   };

   const mutationFunction = ({ userId, location }: UpdateVariables) =>
      fetch(`/locations/${userId ?? ''}`, {
         ...fetchOptions,
         body: JSON.stringify(location),
      }).then(res => res.json());

   return useMutation<unknown, unknown, UpdateVariables>(mutationFunction, {
      onSettled: () => queryClient.invalidateQueries('locations'),
   });
};

export const useDeleteLocation = () =>
   useMutation<unknown, unknown, DeleteVariables>(({ userId }) =>
      fetch(`/locations/${userId}`, {
         method: 'DELETE',
      })
   );
