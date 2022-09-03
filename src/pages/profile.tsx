import React from 'react';
import { useSession } from '@/contexts/session';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { assure } from '@/utils';

export function ProfilePage() {
  const user = useSession((context) => context.user);
  assure(user);

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="md"
      background="shape.100">
      <Text
        color="text.500"
        size="lg">
        {user.name}
      </Text>
      <Text
        color="text.300"
        size="md">
        {user.email}
      </Text>
    </Box>
  );
}

ProfilePage.URL = 'pages/profile';
