import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { TextInput } from '@/components/atoms/text-input';
import { useRoute } from '@react-navigation/native';
import { Button } from '@/components/atoms/button';
import { SessionRepository } from '@/repositories/session';
import { isSuccess } from '@/either';
import { useSession } from '@/contexts/session';
import { http } from '@/libs/axios';
import { KeeperProvider } from '@/providers/keeper';

const schema = z.object({
  validationCode: z.string().min(1, 'Campo obrigatório'),
});
const sessionRepository = SessionRepository();
const keeperProvider = KeeperProvider();

export function SessionStepTwoPage() {
  const route = useRoute();
  const params = route.params as { email: string };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { validationCode: '' } });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useSession((context) => context.setUser);

  async function submit(fields: z.infer<typeof schema>) {
    setIsSubmitting(true);
    setErrorMessage('');
    const result = await sessionRepository.activate(params.email, fields.validationCode);
    if (isSuccess(result)) {
      http.defaults.headers.common.Authorization = `Bearer ${result.success.token}`;
      await keeperProvider.save(KeeperProvider.KEY_TOKEN, result.success.token);
      setUser(result.success);
    } else {
      setErrorMessage(result.failure.message);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (errorMessage) Alert.alert('Atenção', errorMessage);
  }, [errorMessage]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box
        flex={1}
        justifyContent="center"
        padding="md">
        <Controller
          control={control}
          name="validationCode"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Código"
              placeholder="Digite o código"
              onChange={onChange}
              value={value}
              error={errors.validationCode?.message}
              keyboardType="numeric"
            />
          )}
        />
        <Box height="md" />
        <Button
          loading={isSubmitting}
          title="Enviar"
          color="shape.100"
          background="primary"
          onPress={handleSubmit(submit)}
        />
        <Box height="md" />
        <Box
          border={1}
          radius={5}
          padding="md"
          borderColor="text.300">
          <Text
            color="text.300"
            size="md">
            Digite o código que enviamos para o seu e-mail.
          </Text>
          <Box height="md" />
          <Text
            color="text.300"
            size="md">
            Atenção: caso não tenha recebido o código ainda, aguarde alguns minutos ou verifique se digitou
            seu e-mail corretamente.
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
}

SessionStepTwoPage.URL = 'pages/session-step-two';
